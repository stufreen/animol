import { animate, Easing } from './animo.js';

animate(
  document.getElementById('blocky'),
  1000,
  { scaleX: 1, scaleY: 1, x: 0, y: 0},
  { scaleX: 2, scaleY: 2, x: 200, y: 100},
  Easing.easeInOutCubic,
  500,
);