import {
  parseColor,
  getUnit,
  getVal,
  parseMatrix,
} from './parseCss.js';
import { decomposeTransformMatrix3D, matrix2DTo3D } from './matrix.js';
import { convenience } from './convenience.js';

const IDENTITY = [
  { key: 'translateX', unit: 'px', val: 0 },
  { key: 'translateY', unit: 'px', val: 0 },
  { key: 'translateZ', unit: 'px', val: 0 },
  { key: 'scaleX', unit: '', val: 1 },
  { key: 'scaleY', unit: '', val: 1 },
  { key: 'scaleZ', unit: '', val: 1 },
  { key: 'rotateX', unit: 'rad', val: 0 },
  { key: 'rotateY', unit: 'rad', val: 0 },
  { key: 'rotateZ', unit: 'rad', val: 0 },
];

function inferTransforms(el) {
  const computedStyles = window.getComputedStyle(el);
  if (computedStyles.transform === 'none') {
    return IDENTITY;
  }
  const matrix = parseMatrix(computedStyles.transform);
  const matrix3D = matrix.length === 6 ? matrix2DTo3D(matrix) : matrix;
  return decomposeTransformMatrix3D(matrix3D);
}

function inferUnitVal(key, element, castToUnit = 'px') {
  const computedStyle = window.getComputedStyle(element);
  const styleString = computedStyle[key];

  const colorVal = parseColor(styleString);
  if (colorVal) {
    return {
      unit: 'color',
      val: colorVal,
    };
  }

  const val = getVal(styleString);
  if (val === 0) {
    return { unit: castToUnit, val: 0 };
  }
  return {
    unit: getUnit(styleString),
    val,
  };
}

function getUnitVal(key, styleObj = {}, element) {
  if (typeof styleObj[key] === 'undefined') {
    return inferUnitVal(key, element);
  }
  const colorVal = parseColor(styleObj[key]);
  if (colorVal) {
    return {
      unit: 'color',
      val: colorVal,
    };
  }
  const unit = typeof styleObj[key] === 'number' ? '' : getUnit(styleObj[key]);
  const val = typeof styleObj[key] === 'number' ? styleObj[key] : getVal(styleObj[key]);

  // Convert degrees to radians
  if (unit === 'deg') {
    return {
      unit: 'rad',
      val: val * (Math.PI / 180),
    };
  }

  return { unit, val };
}

const simplifyTransformLists = (transformFrom, transformTo) => {
  const fromFixed = [];
  const toFixed = [];
  IDENTITY.forEach((identityTransform, index) => {
    if (identityTransform.val !== transformFrom[index].val
      || identityTransform.unit !== transformFrom[index].unit
      || identityTransform.val !== transformTo[index].val
      || identityTransform.unit !== transformTo[index].unit) {
      fromFixed.push(transformFrom[index]);
      toFixed.push(transformTo[index]);
    }
  });

  return {
    transformFrom: fromFixed,
    transformTo: toFixed,
  };
};

function buildTransformFromToList(el, from = {}, to = {}) {
  const inferredTransforms = inferTransforms(el);
  const fromFixed = convenience(from);
  const toFixed = convenience(to);

  const transformFrom = inferredTransforms.map((item) => {
    const match = fromFixed[item.key];
    if (!match) {
      return item;
    }
    const { unit, val } = getUnitVal(item.key, fromFixed, el);
    return {
      key: item.key,
      unit,
      val,
    };
  });

  const transformTo = inferredTransforms.map((item) => {
    const match = toFixed[item.key];
    if (!match) {
      return item;
    }
    const { unit, val } = getUnitVal(item.key, toFixed, el);
    return {
      key: item.key,
      unit,
      val,
    };
  });

  return simplifyTransformLists(transformFrom, transformTo);
}

export const buildFromToList = (el, from, to) => {
  const fromToList = [];

  // Iterate through the "from" keys, adding matching "to" values if possible
  Object.keys(from).forEach((key) => {
    if (key === 'transform') {
      return;
    }
    const { unit: fromUnit, val: fromVal } = getUnitVal(key, from, el);
    const { unit: toUnit, val: toVal } = getUnitVal(key, to, el);
    if (fromUnit === toUnit) {
      fromToList.push({
        key,
        unit: fromUnit,
        fromVal,
        toVal,
      });
    } else {
      throw new Error(`"from" and "to" unit mismatch: ${fromUnit} and ${toUnit} (at element ${el.outerHTML})`);
    }
  });

  // Iterate through the "to" keys which did not have "from" values, inferring the "from" vals
  Object.keys(to).forEach((key) => {
    if (typeof from[key] === 'undefined' && key !== 'transform') {
      const { unit: toUnit, val: toVal } = getUnitVal(key, to, el);
      const { unit: fromUnit, val: fromVal } = inferUnitVal(key, el, toUnit);
      if (fromUnit === toUnit) {
        fromToList.push({
          key,
          unit: fromUnit,
          fromVal,
          toVal,
        });
      } else {
        throw new Error(`"from" and "to" unit mismatch: ${fromUnit} and ${toUnit} (at element ${el.outerHTML})`);
      }
    }
  });

  // If transform is defined on either "from" or "to", add a transform item
  if (from.transform || to.transform) {
    const { transformFrom, transformTo } = buildTransformFromToList(
      el,
      from.transform,
      to.transform,
    );
    fromToList.push({
      key: 'transform',
      unit: 'transformList',
      fromVal: transformFrom,
      toVal: transformTo,
    });
  }

  return fromToList;
};
