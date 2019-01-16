/* eslint no-plusplus: 0 */
/* eslint max-len: 0 */

const pow = Math.pow;
const sin = Math.sin;
const PI = Math.PI;

const easeOutBounce = (t) => {
  if (t < 1 / 2.75) {
    return 7.5625 * t * t;
  }
  if (t < 2 / 2.75) {
    const t2 = t - 1.5 / 2.75;
    return 7.5625 * t2 * t2 + 0.75;
  }
  if (t < 2.5 / 2.75) {
    const t2 = t - 2.25 / 2.75;
    return 7.5625 * t2 * t2 + 0.9375;
  }
  {
    const t2 = t - 2.625 / 2.75;
    return 7.5625 * t2 * t2 + 0.984375;
  }
};
const easeInBounce = t => 1 - easeOutBounce(1 - t);
const easeInElastic = (p = 1) => t => -pow(2, 10 * (t - 1)) * sin(((t - 1) - (0.4 * p) / 4) * (2 * PI) / (0.4 * p));
const easeOutElastic = (p = 1) => t => pow(2, -10 * t) * sin((t - (0.4 * p) / 4) * (2 * PI) / (0.4 * p)) + 1;
const easeInBack = (p = 1) => t => t * t * ((p * 1.70158 + 1.0) * t - (p * 1.70158));
const easeOutBack = (p = 1) => t => (t - 1) * (t - 1) * ((p * 1.70158 + 1.0) * (t - 1) + (p * 1.70158)) + 1.0;

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
  easeInElastic,
  easeOutElastic,
  easeInOutElastic: (p = 1) => t => t < 0.5 ? 0.5 * easeInElastic(p)(2 * t) : 0.5 * easeOutElastic(p)(2 * t - 1) + 0.5,
  easeInBack,
  easeOutBack,
  easeInOutBack: (p = 1) => t => t < 0.5 ? 0.5 * easeInBack(p)(t * 2) : 0.5 * easeOutBack(p)(t * 2 - 1.0) + 0.5,
  easeInBounce,
  easeOutBounce,
  easeInOutBounce: t => t < 0.5 ? 0.5 * easeInBounce(t * 2) : 0.5 * easeOutBounce(t * 2 - 1.0) + 0.5
};
