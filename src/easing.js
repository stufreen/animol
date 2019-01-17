/* eslint no-plusplus: 0 */
/* eslint max-len: 0 */

var pow = Math.pow;
var sin = Math.sin;
var PI = Math.PI;

function easeOutBounce(t) {
  if (t < 1 / 2.75) {
    return 7.5625 * t * t;
  }
  if (t < 2 / 2.75) {
    var t2 = t - 1.5 / 2.75;
    return 7.5625 * t2 * t2 + 0.75;
  }
  if (t < 2.5 / 2.75) {
    var t3 = t - 2.25 / 2.75;
    return 7.5625 * t3 * t3 + 0.9375;
  }
  var t4 = t - 2.625 / 2.75;
  return 7.5625 * t4 * t4 + 0.984375;
}

function easeInBounce(t) {
  return 1 - easeOutBounce(1 - t);
}

function easeInElastic(p) {
  p = p || 1;
  return function (t) {
    return -pow(2, 10 * (t - 1)) * sin(((t - 1) - (0.4 * p) / 4) * (2 * PI) / (0.4 * p));
  };
}

function easeOutElastic(p) {
  p = p || 1;
  return function (t) {
    return pow(2, -10 * t) * sin((t - (0.4 * p) / 4) * (2 * PI) / (0.4 * p)) + 1;
  };
}

function easeInBack(p) {
  p = p || 1;
  return function (t) {
    return t * t * ((p * 1.70158 + 1.0) * t - (p * 1.70158));
  };
}

function easeOutBack(p) {
  p = p || 1;
  return function (t) {
    return (t - 1) * (t - 1) * ((p * 1.70158 + 1.0) * (t - 1) + (p * 1.70158)) + 1.0;
  };
}

export var Easing = {
  linear: function (t) { return t; },
  easeInQuad: function (t) { return t * t; },
  easeOutQuad: function (t) { return t * (2 - t); },
  easeInOutQuad: function (t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
  easeInCubic: function (t) { return t * t * t; },
  easeOutCubic: function (t) { return (--t) * t * t + 1; },
  easeInOutCubic: function (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
  easeInQuart: function (t) { return t * t * t * t; },
  easeOutQuart: function (t) { return 1 - (--t) * t * t * t; },
  easeInOutQuart: function (t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
  easeInQuint: function (t) { return t * t * t * t * t; },
  easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t; },
  easeInOutQuint: function (t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; },
  easeInElastic,
  easeOutElastic,
  easeInOutElastic: function (p) {
    p = p || 1;
    return function (t) {
      return t < 0.5 ? 0.5 * easeInElastic(p)(2 * t) : 0.5 * easeOutElastic(p)(2 * t - 1) + 0.5;
    };
  },
  easeInBack,
  easeOutBack,
  easeInOutBack: function (p) {
    p = p || 1;
    return function (t) {
      return t < 0.5 ? 0.5 * easeInBack(p)(t * 2) : 0.5 * easeOutBack(p)(t * 2 - 1.0) + 0.5;
    };
  },
  easeInBounce,
  easeOutBounce,
  easeInOutBounce: function (t) {
    return t < 0.5 ? 0.5 * easeInBounce(t * 2) : 0.5 * easeOutBounce(t * 2 - 1.0) + 0.5;
  }
};
