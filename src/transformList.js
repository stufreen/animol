import {
  parseColor,
  getUnit,
  getVal,
  parseMatrix
} from './parseCss.js';
import { decomposeTransformMatrix3D, matrix2DTo3D } from './matrix.js';
import { convenience } from './convenience.js';

export var IDENTITY = [
  { key: 'translateX', unit: 'px', val: 0 },
  { key: 'translateY', unit: 'px', val: 0 },
  { key: 'translateZ', unit: 'px', val: 0 },
  { key: 'scaleX', unit: '', val: 1 },
  { key: 'scaleY', unit: '', val: 1 },
  { key: 'scaleZ', unit: '', val: 1 },
  { key: 'rotateX', unit: 'rad', val: 0 },
  { key: 'rotateY', unit: 'rad', val: 0 },
  { key: 'rotateZ', unit: 'rad', val: 0 }
];

export var inferTransforms = function (el) {
  var computedStyles = window.getComputedStyle(el);
  if (computedStyles.transform === 'none') {
    return IDENTITY;
  }
  var matrix = parseMatrix(computedStyles.transform);
  var matrix3D = matrix.length === 6 ? matrix2DTo3D(matrix) : matrix;
  return decomposeTransformMatrix3D(matrix3D);
};

function inferUnitVal(key, element, castToUnit) {
  castToUnit = castToUnit || 'px';
  var computedStyle = window.getComputedStyle(element);
  var styleString = computedStyle[key];

  var colorVal = parseColor(styleString);
  if (colorVal) {
    return {
      unit: 'color',
      val: colorVal
    };
  }

  var val = getVal(styleString);
  if (val === 0) {
    return { unit: castToUnit, val: 0 };
  }
  return {
    unit: getUnit(styleString),
    val: val
  };
}

function getUnitVal(key, styleObj, element, castToUnit) {
  styleObj = styleObj || {};
  if (typeof styleObj[key] === 'undefined') {
    return inferUnitVal(key, element, castToUnit);
  }

  var colorVal = parseColor(styleObj[key]);
  if (colorVal) {
    return {
      unit: 'color',
      val: colorVal
    };
  }
  var unit = typeof styleObj[key] === 'number' ? '' : getUnit(styleObj[key]);
  var val = typeof styleObj[key] === 'number' ? styleObj[key] : getVal(styleObj[key]);

  // Convert degrees to radians
  if (unit === 'deg') {
    return {
      unit: 'rad',
      val: val * (Math.PI / 180)
    };
  }

  return { unit, val };
}

function simplifyTransformLists(transformFrom, transformTo) {
  var fromFixed = [];
  var toFixed = [];
  IDENTITY.forEach(function (identityTransform, index) {
    if (identityTransform.val !== transformFrom[index].val
      || identityTransform.unit !== transformFrom[index].unit
      || identityTransform.val !== transformTo[index].val
      || identityTransform.unit !== transformTo[index].unit) {
      fromFixed.push(transformFrom[index]);
      toFixed.push(transformTo[index]);
    }
  });

  return {
    from: fromFixed,
    to: toFixed
  };
}

function buildTransformFromToList(el, from, to) {
  from = from || {};
  to = to || {};
  var inferredTransforms = inferTransforms(el);
  var fromFixed = convenience(from);
  var toFixed = convenience(to);

  var transformFrom = inferredTransforms.map(function (item) {
    var match = fromFixed[item.key];
    if (!match) {
      return item;
    }
    var transform = getUnitVal(item.key, fromFixed, el);
    return {
      key: item.key,
      unit: transform.unit,
      val: transform.val
    };
  });

  var transformTo = inferredTransforms.map(function (item) {
    var match = toFixed[item.key];
    if (!match) {
      return item;
    }
    var transform = getUnitVal(item.key, toFixed, el);
    return {
      key: item.key,
      unit: transform.unit,
      val: transform.val
    };
  });

  return simplifyTransformLists(transformFrom, transformTo);
}

export const buildFromToList = (el, from, to) => {
  var fromToList = [];

  // Iterate through the "from" keys, adding matching "to" values if possible
  Object.keys(from).forEach(function (key) {
    if (key === 'transform') {
      return;
    }
    var fromStyle = getUnitVal(key, from, el);
    var toStyle = getUnitVal(key, to, el, fromStyle.unit);
    if (fromStyle.unit === toStyle.unit) {
      fromToList.push({
        key: key,
        unit: fromStyle.unit,
        fromVal: fromStyle.val,
        toVal: toStyle.val
      });
    } else {
      throw new Error('"from" and "to" unit mismatch: ' + fromStyle.unit + ' and ' + toStyle.unit + ' (at element ' + el.outerHTML + ')');
    }
  });

  // Iterate through the "to" keys which did not have "from" values, inferring the "from" vals
  Object.keys(to).forEach(function (key) {
    if (typeof from[key] === 'undefined' && key !== 'transform') {
      var toStyle = getUnitVal(key, to, el);
      var fromStyle = inferUnitVal(key, el, toStyle.unit);
      if (fromStyle.unit === toStyle.unit) {
        fromToList.push({
          key: key,
          unit: fromStyle.unit,
          fromVal: fromStyle.val,
          toVal: toStyle.val
        });
      } else {
        throw new Error('"from" and "to" unit mismatch: ' + fromStyle.unit + ' and ' + toStyle.unit + ' (at element ' + el.outerHTML + ')');
      }
    }
  });

  // If transform is defined on either "from" or "to", add a transform item
  if (from.transform || to.transform) {
    var transform = buildTransformFromToList(el, from.transform, to.transform);
    fromToList.push({
      key: 'transform',
      unit: 'transformList',
      fromVal: transform.from,
      toVal: transform.to
    });
  }

  return fromToList;
};
