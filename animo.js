/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
export const Easing = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t * t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t * (2 - t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
  // accelerating from zero velocity 
  easeInCubic: function (t) { return t * t * t },
  // decelerating to zero velocity 
  easeOutCubic: function (t) { return (--t) * t * t + 1 },
  // acceleration until halfway, then deceleration 
  easeInOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
  // accelerating from zero velocity 
  easeInQuart: function (t) { return t * t * t * t },
  // decelerating to zero velocity 
  easeOutQuart: function (t) { return 1 - (--t) * t * t * t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t * t * t * t * t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t },
  // acceleration until halfway, then deceleration 
  easeInOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t }
}

function parseRGB(inputString) {
  const regex = /rgb\((\d{1,3}), *(\d{1,3}), *(\d{1,3})\)/;
  const result = inputString.match(regex);
  return {
    red: parseInt(result[1]),
    green: parseInt(result[2]),
    blue: parseInt(result[3]),
    alpha: 1,
  };
}

function parseRGBA(inputString) {
  const regex = /rgba\((\d{1,3}), *(\d{1,3}), *(\d{1,3}), *(\d+[\.\d]?\d*)\)/;
  const result = inputString.match(regex);
  return {
    red: parseInt(result[1]),
    green: parseInt(result[2]),
    blue: parseInt(result[3]),
    alpha: parseFloat(result[4]),
  };
}

function parseHexColor(inputString) {
  if (inputString.length === 7) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(inputString);
    return {
      red: parseInt(result[1], 16),
      green: parseInt(result[2], 16),
      blue: parseInt(result[3], 16),
      alpha: 1
    };
  }
}

function parseColor(styleString) {
  if (typeof styleString !== 'string') {
    return false;
  }
  if (styleString.charAt(0) === '#') {
    return parseHexColor(styleString);
  } 
  else if (styleString.substring(0, 4) === 'rgba') {
    return parseRGBA(styleString);
  }
  else if (styleString.substring(0, 3) === 'rgb') {
    return parseRGB(styleString);
  }
  else {
    return false;
  }
}

function interpolate(startTime, endTime, currentTime, startVal, endVal, easingFunction) {
  const distance = endVal - startVal;
  const pctElapsed = Math.max(0, (currentTime - startTime) / (endTime - startTime));
  return startVal + easingFunction(pctElapsed) * distance;
};

function interpolateColor(startTime, endTime, currentTime, startVal, endVal, easingFunction) {
  return {
    red: interpolate(startTime, endTime, currentTime, startVal.red, endVal.red, easingFunction),
    blue: interpolate(startTime, endTime, currentTime, startVal.blue, endVal.blue, easingFunction),
    green: interpolate(startTime, endTime, currentTime, startVal.green, endVal.green, easingFunction),
    alpha: interpolate(startTime, endTime, currentTime, startVal.alpha, endVal.alpha, easingFunction),
  };
}

// Interpolate two transform lists and build up a "transform" string
function interpolateTransform(startTime, endTime, currentTime, startTransformList, endTransformList, easingFunction) {
  const transforms = startTransformList.reduce((accumulator, { key, val: startVal, unit }, index) => {
    const endVal = endTransformList[index].val;
    const interpolatedVal = interpolate(startTime, endTime, currentTime, startVal, endVal, easingFunction);
    return [...accumulator, `${key}(${interpolatedVal}${unit})`]
  }, []);
  return transforms.join(' ');
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
  } else {
    const val = getVal(styleString);
    if (val === 0) {
      return { unit: castToUnit, val: 0 };
    } else {
      return {
        unit: getUnit(styleString),
        val: val,
      };
    }
  }
};

function getUnit(input) {
  return input.match(/([a-zA-Z]+|%)/)[0];
}

function getVal(input) {
  return parseFloat(input.match(/^\d+(\.\d)?\d*/)[0]);
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
    unit: typeof transformsObj[key] === 'number' ? 'px' : getUnit(transformsObj[key]),
    val: typeof transformsObj[key] === 'number' ? transformsObj[key] : getVal(transformsObj[key]),
  }
};

function getTransformKey(transformObj) {
  const keys = Object.keys(transformObj);
  if (keys.length !== 1) {
    throw new Error('Each transform object must have exactly one key with a string property.');
  }
  return keys[0];
}

function buildFromToList(el, from, to) {
  const fromToList = [];

  // Iterate through the "from" keys, adding matching "to" values if possible
  Object.keys(from).forEach((key) => {
    if (key === 'transform') {
      return;
    } else {
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
    }
  });

  // Iterate through the "to" keys which did not have "from" values, inferring the "from" vals
  Object.keys(to).forEach((key) => {
    if (typeof from[key] !== 'undefined' || key === 'transform') {
      return; // Don't do anything if the key was already handled in the "from" step
    } else {
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
    const { transformFrom, transformTo } = buildTransformFromToList(el, from.transform, to.transform);
    fromToList.push({
      key: 'transform',
      unit: 'transformList',
      fromVal: transformFrom,
      toVal: transformTo, 
    });
  }

  return fromToList;
}

function buildTransformFromToList(el, from, to) {
  const transformFrom = [];
  const transformTo = [];

  // Iterate through the "from" keys, adding matching "to" values if possible
  from.forEach((transform) => {
    const key = getTransformKey(transform);
    const { unit: fromUnit, val: fromVal } = getUnitVal(key, transform, el);

    // Search the "to" object to find a matching transform
    const toTransform = to.find((toTransform) => {
      const itemKey = getTransformKey(toTransform);
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

export const animate = (
  element,
  duration,
  from = {},
  to = {},
  easingFunc = Easing.linear,
  delay = 0,
) => new Promise((resolve) => {
  let startTime;
  let endTime;
  const fromToList = buildFromToList(element, from, to);
  console.log(fromToList);

  const step = (timestamp) => {
    if (typeof startTime === 'undefined') {
      startTime = timestamp + delay;
      endTime = timestamp + duration + delay;
    } else if (timestamp >= endTime) {
      return resolve(); // Done the animation
    } else if (timestamp >= startTime) {
      fromToList.forEach((item) => {
        if (item.unit === 'color') {
          const interpolated = interpolateColor(startTime, endTime, timestamp, item.fromVal, item.toVal, easingFunc);
          element.style[item.key] = `rgba(${interpolated.red}, ${interpolated.green}, ${interpolated.blue}, ${interpolated.alpha})`;
        }
        else if (item.key === 'transform') {
          const interpolated = interpolateTransform(startTime, endTime, timestamp, item.fromVal, item.toVal, easingFunc);
          element.style.transform = interpolated;
        }
        else {
          const interpolated = interpolate(startTime, endTime, timestamp, item.fromVal, item.toVal, easingFunc);
          element.style[item.key] = `${interpolated}${item.unit}`;
        }
      });
    }
    window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
});
