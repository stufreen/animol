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

const interpolate = (startTime, endTime, currentTime, startVal, endVal, easingFunction) => {
  const distance = endVal - startVal;
  const pctElapsed = Math.max(0, (currentTime - startTime) / (endTime - startTime));
  return easingFunction(pctElapsed) * distance;
};

const getKeys = (from, to) => {
  const fromKeys = Object.keys(from);
  return Object.keys(to).reduce((accumulator, key) => {
    if (accumulator.indexOf(key) === -1) {
      return [...accumulator, key];
    }
    return accumulator;
  }, fromKeys);
};

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
  const cssKeys = getKeys(from, to);

  const step = (timestamp) => {
    if (typeof startTime === 'undefined') {
      startTime = timestamp + delay;
      endTime = timestamp + duration + delay;
    } else if (timestamp >= endTime) {
      return resolve();
    }

    cssKeys.forEach((key) => {
      const myVal = interpolate(startTime, endTime, timestamp, from[key], to[key], easingFunc);
      element.style[key] = `${myVal}px`; // Only css and px for now
    });
    
    window.requestAnimationFrame(step);
  };
  
  window.requestAnimationFrame(step);
});
