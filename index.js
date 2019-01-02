import { animate, Easing } from './animo.js';

animate(
  document.getElementById('blocky'),
  1000,
  {height: 0, borderRadius: 0},
  {height: 500, borderRadius: 100},
  Easing.easeInOutCubic
);
