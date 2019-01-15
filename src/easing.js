/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
var pow = Math.pow,
  sqrt = Math.sqrt,
  sin = Math.sin,
  cos = Math.cos,
  PI = Math.PI,
  c1 = 1.70158,
  c2 = c1 * 1.525,
  c3 = c1 + 1,
  c4 = (2 * PI) / 3,
  c5 = (2 * PI) / 4.5;

function bounceOut(x) {
  var n1 = 7.5625,
    d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= (1.5 / d1)) * x + .75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= (2.25 / d1)) * x + .9375;
  } else {
    return n1 * (x -= (2.625 / d1)) * x + .984375;
  }
}

export const Easing = {
  linear: t => t,
  easeInQuad: t => (t * t),
  easeOutQuad: t => (t * (2 - t)),
  easeInOutQuad: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: t => (t * t * t),
  easeOutCubic: t => ((--t) * t * t + 1),
  easeInOutCubic: t => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeInQuart: t => (t * t * t * t),
  easeOutQuart: t => (1 - (--t) * t * t * t),
  easeInOutQuart: t => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t),
  easeInQuint: t => (t * t * t * t * t),
  easeOutQuint: t => (1 + (--t) * t * t * t * t),
  easeInOutQuint: t => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t),
  easeInElastic: function (x) {
    return x === 0 ? 0 : x === 1 ? 1 :
      -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
  },
  easeOutElastic: function (x) {
    return x === 0 ? 0 : x === 1 ? 1 :
      pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
  },
  easeInOutElastic: function (x) {
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
      -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 :
      pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
  },
  easeInBack: function (x) {
    return c3 * x * x * x - c1 * x * x;
  },
  easeOutBack: function (x) {
    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
  },
  easeInOutBack: function (x) {
    return x < 0.5 ?
      (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 :
      (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  },
  easeInBounce: function (x) {
    return 1 - bounceOut(1 - x);
  },
  easeOutBounce: bounceOut,
  easeInOutBounce: function (x) {
    return x < 0.5 ?
      (1 - bounceOut(1 - 2 * x)) / 2 :
      (1 + bounceOut(2 * x - 1)) / 2;
  }
};
