import {
  parseColor,
  getUnit,
  getVal,
  parseMatrix,
} from './parseCss.js';
import { decomposeTransformMatrix2D } from './matrix.js';

// TO DO: support 3d transforms
function inferTransforms(el) {
  const computedStyles = window.getComputedStyle(el);
  const matrixString = computedStyles.transform === 'none' ? 'matrix(1, 0, 0, 1, 0, 0)' : computedStyles.transform;
  const matrix = parseMatrix(matrixString);
  return decomposeTransformMatrix2D(matrix);
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
  return {
    unit: typeof styleObj[key] === 'number' ? '' : getUnit(styleObj[key]),
    val: typeof styleObj[key] === 'number' ? styleObj[key] : getVal(styleObj[key]),
  };
}

function getTransformKey(transformObj) {
  const keys = Object.keys(transformObj);
  if (keys.length !== 1) {
    throw new Error('Each transform object must have exactly one key with a string property.');
  }
  return keys[0];
}

function buildTransformFromToList(el, from = [], to = []) {
  const inferredTransforms = inferTransforms(el);

  const transformFrom = inferredTransforms.map((item) => {
    const match = from.find(a => item.key === getTransformKey(a));
    if (!match) {
      return item;
    }
    const { unit, val } = getUnitVal(item.key, match, el);
    return {
      key: item.key,
      unit,
      val,
    };
  });

  const transformTo = inferredTransforms.map((item) => {
    const match = to.find(a => item.key === getTransformKey(a));
    if (!match) {
      return item;
    }
    const { unit, val } = getUnitVal(item.key, match, el);
    return {
      key: item.key,
      unit,
      val,
    };
  });

  return { transformFrom, transformTo };
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
