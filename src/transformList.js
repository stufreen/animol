import {
  parseColor,
  getUnit,
  getVal,
  parseMatrix
} from './parseCss.js';
import { decomposeTransformMatrix3D, matrix2DTo3D } from './matrix.js';
import { convenience } from './convenience.js';
import { roundTo } from './math.js';

export var IDENTITY = {
  translateX: { unit: 'px', val: 0 },
  translateY: { unit: 'px', val: 0 },
  translateZ: { unit: 'px', val: 0 },
  scaleX: { unit: '', val: 1 },
  scaleY: { unit: '', val: 1 },
  scaleZ: { unit: '', val: 1 },
  rotateX: { unit: 'rad', val: 0 },
  rotateY: { unit: 'rad', val: 0 },
  rotateZ: { unit: 'rad', val: 0 }
};

export var inferTransforms = function (el) {
  var computedStyles = window.getComputedStyle(el);
  if (computedStyles.transform === 'none') {
    return IDENTITY;
  }
  var matrix = parseMatrix(computedStyles.transform);
  var matrix3D = matrix.length === 6 ? matrix2DTo3D(matrix) : matrix;
  return decomposeTransformMatrix3D(matrix3D);
};

function inferUnitVal(key, element) {
  var computedStyle = window.getComputedStyle(element);
  var styleString = computedStyle[key];

  var colorVal = parseColor(styleString);
  if (colorVal) {
    return {
      unit: 'color',
      val: colorVal
    };
  }

  return {
    unit: getUnit(styleString),
    val: getVal(styleString)
  };
}

function defaultToInferred(inferredTransforms, transformList) {
  return Object.keys(inferredTransforms).reduce((accumulator, tKey) => {
    if (typeof transformList[tKey] === 'undefined') {
      accumulator[tKey] = {
        unit: inferredTransforms[tKey].unit,
        val: inferredTransforms[tKey].val
      };
    } else {
      var transform = getUnitVal(tKey, transformList);
      accumulator[tKey] = {
        unit: transform.unit,
        val: transform.val
      };
    }
    return accumulator;
  }, {});
}

function getUnitVal(key, styleObj) {
  styleObj = styleObj || {};

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

  return { unit: unit, val: val };
}

function simplifyTransformLists(tFrom, tTo) {
  var fromFixed = {};
  var toFixed = {};

  Object.keys(IDENTITY).forEach((tKey) => {
    if (IDENTITY[tKey].val !== roundTo(tFrom[tKey].val, 3)
      || IDENTITY[tKey].unit !== tFrom[tKey].unit
      || IDENTITY[tKey].val !== roundTo(tTo[tKey].val, 3)
      || IDENTITY[tKey].unit !== tTo[tKey].unit) {
      var reconciled = reconcileUnits(tFrom[tKey], tTo[tKey]);
      fromFixed[tKey] = reconciled.from;
      toFixed[tKey] = reconciled.to;
    }
  });

  return {
    from: fromFixed,
    to: toFixed
  };
}

function reconcileUnits(fromStyle, toStyle) {
  if (fromStyle.unit !== toStyle.unit) {
    if (fromStyle.val === 0) {
      fromStyle.unit = toStyle.unit;
    } else if (toStyle.val === 0) {
      toStyle.unit = fromStyle.unit;
    } else {
      throw new Error('"from" and "to" unit mismatch: ' + fromStyle.unit + ' and ' + toStyle.unit + ')');
    }
  }
  return {
    from: fromStyle,
    to: toStyle
  };
}

function buildTransformFromToList(el, from, to) {
  var inferredTransforms = inferTransforms(el);
  var transformFrom = defaultToInferred(inferredTransforms, convenience(from));
  var transformTo = defaultToInferred(inferredTransforms, convenience(to));
  return simplifyTransformLists(transformFrom, transformTo);
}

export const buildFromToList = (el, from, to) => {
  from = from || {};
  to = to || {};
  var fromToList = [];

  // Iterate through the "from" keys, adding matching "to" values if possible
  Object.keys(from).forEach(function (key) {
    if (key === 'transform') {
      return;
    }
    const toStyle = typeof to[key] === 'undefined' ? inferUnitVal(key, el) : getUnitVal(key, to);
    var styles = reconcileUnits(getUnitVal(key, from), toStyle);
    fromToList.push({
      key: key,
      unit: styles.from.unit,
      fromVal: styles.from.val,
      toVal: styles.to.val
    });
  });

  // Iterate through the "to" keys which did not have "from" values, inferring the "from" vals
  Object.keys(to).forEach(function (key) {
    if (typeof from[key] === 'undefined' && key !== 'transform') {
      var styles = reconcileUnits(inferUnitVal(key, el), getUnitVal(key, to));
      fromToList.push({
        key: key,
        unit: styles.from.unit,
        fromVal: styles.from.val,
        toVal: styles.to.val
      });
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
