import {
  parseColor,
  getUnit,
  getVal,
  parseMatrix
} from './parseCss.js';
import { transformsFromMatrix3D, matrix2DTo3D } from './matrix.js';
import { convenience } from './convenience.js';

export var IDENTITY = {
  translateX: { unit: 'px', val: 0 },
  translateY: { unit: 'px', val: 0 },
  translateZ: { unit: 'px', val: 0 },
  scaleX: { unit: '', val: 1 },
  scaleY: { unit: '', val: 1 },
  scaleZ: { unit: '', val: 1 },
  rotateX: { unit: 'rad', val: 0 },
  rotateY: { unit: 'rad', val: 0 },
  rotateZ: { unit: 'rad', val: 0 },
  skewX: { unit: 'rad', val: 0 },
  skewY: { unit: 'rad', val: 0 }
};

export var inferTransforms = function (el) {
  if (!window) return [];
  var computedStyles = window.getComputedStyle(el);
  if (computedStyles.transform === 'none') {
    return IDENTITY;
  }
  var matrix = parseMatrix(computedStyles.transform);
  var matrix3D = matrix.length === 6 ? matrix2DTo3D(matrix) : matrix;
  return transformsFromMatrix3D(matrix3D);
};

function inferUnitVal(key, element) {
  if (!window) return {unit: '', val: ''};
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
  from = convenience(from);
  to = convenience(to);

  var inferredTransforms = inferTransforms(el);
  var transformFrom = {};
  var transformTo = {};

  // Iterate through the "from" keys, adding matching "to" values if possible
  Object.keys(from).forEach(function (key) {
    var transform = typeof to[key] === 'undefined' ? inferredTransforms[key] : getUnitVal(key, to);
    transform = reconcileUnits(getUnitVal(key, from), transform);
    transformFrom[key] = { unit: transform.from.unit, val: transform.from.val };
    transformTo[key] = { unit: transform.to.unit, val: transform.to.val };
  });

  // Iterate through the "to" keys which did not have "from" values, inferring the "from" vals
  Object.keys(to).forEach(function (key) {
    if (typeof from[key] === 'undefined') {
      var transform = reconcileUnits(inferredTransforms[key], getUnitVal(key, to));
      transformFrom[key] = { unit: transform.from.unit, val: transform.from.val };
      transformTo[key] = { unit: transform.to.unit, val: transform.to.val };
    }
  });

  return {
    from: transformFrom,
    to: transformTo
  };
}

export const buildFromToList = function (el, from, to) {
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
