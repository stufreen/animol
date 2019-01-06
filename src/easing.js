/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
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
};
