import { parseColor, getUnit, getVal } from './parseCss.js';

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

function getUnitVal(key, transformsObj, element) {
  if (typeof transformsObj[key] === 'undefined') {
    return inferUnitVal(key, element);
  }
  const colorVal = parseColor(transformsObj[key]);
  if (colorVal) {
    return {
      unit: 'color',
      val: colorVal,
    };
  }
  return {
    unit: typeof transformsObj[key] === 'number' ? '' : getUnit(transformsObj[key]),
    val: typeof transformsObj[key] === 'number' ? transformsObj[key] : getVal(transformsObj[key]),
  };
}

function getTransformKey(transformObj) {
  const keys = Object.keys(transformObj);
  if (keys.length !== 1) {
    throw new Error('Each transform object must have exactly one key with a string property.');
  }
  return keys[0];
}

// TO DO: iterate through "to" as well, and infer values
function buildTransformFromToList(el, from, to) {
  const transformFrom = [];
  const transformTo = [];

  // Iterate through the "from" keys, adding matching "to" values if possible
  from.forEach((transform) => {
    const key = getTransformKey(transform);
    const { unit: fromUnit, val: fromVal } = getUnitVal(key, transform, el);

    // Search the "to" object to find a matching transform
    const toTransform = to.find((item) => {
      const itemKey = getTransformKey(item);
      return itemKey === key;
    });
    const { unit: toUnit, val: toVal } = getUnitVal(key, toTransform, el);

    if (fromUnit === toUnit) {
      transformFrom.push({ key, val: fromVal, unit: fromUnit });
      transformTo.push({ key, val: toVal, unit: toUnit });
    } else {
      throw new Error(`"from" and "to" unit mismatch: ${fromUnit} and ${toUnit} (at element ${el.outerHTML})`);
    }
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
