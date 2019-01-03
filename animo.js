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

function isColor(styleString) {
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

function inferUnitVal(key, element, castToUnit = 'px') {
  const computedStyle = window.getComputedStyle(element);
  const styleString = computedStyle[key];

  const colorVal = isColor(styleString);
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

function getUnitVal(key, cssKeyAr, element) {
  if (typeof cssKeyAr[key] === 'undefined') {
    return inferUnitVal(key, element);
  }
  const colorVal = isColor(cssKeyAr[key]);
  if (colorVal) {
    return {
      unit: 'color',
      val: colorVal,
    };
  }
  return {
    unit: typeof cssKeyAr[key] === 'number' ? 'px' : getUnit(cssKeyAr[key]),
    val: typeof cssKeyAr[key] === 'number' ? cssKeyAr[key] : getVal(cssKeyAr[key]),
  }
};

/*
For each FROM item:
 - Figure out the value
 - Figure out the unit
 - Check if there's a corresponding TO value
    - If YES:
      - Use the TO value if the unit is the same, otherwise go to NO
    - If NO:
      - Use the element's current computed value as the TO value

For each TO item:
 - Check if there's already a key for it. If there is: break
 - Figure out the value
 - Figure out the unit
 - Use the element's initial computed value as the TO value
*/
function buildFromToList(el, from, to) {
  const fromToList = [];
  Object.keys(from).forEach((key) => {
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
  Object.keys(to).forEach((key) => {
    if (typeof from[key] !== 'undefined') {
      return;
    }
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
  });
  return fromToList;
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
      return resolve(); // Done the animateion
    } else if (timestamp >= startTime) {
      fromToList.forEach((item) => {
        if (item.unit === 'color') {
          const interpolated = interpolateColor(startTime, endTime, timestamp, item.fromVal, item.toVal, easingFunc);
          element.style[item.key] = `rgba(${interpolated.red}, ${interpolated.green}, ${interpolated.blue}, ${interpolated.alpha})`;
        } else {
          const interpolated = interpolate(startTime, endTime, timestamp, item.fromVal, item.toVal, easingFunc);
          element.style[item.key] = `${interpolated}${item.unit}`;
        }
      });
    }
    window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
});
