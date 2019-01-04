import { animate, Easing } from './animo.js';

animate(
  document.getElementById('blocky'),
  1000,
  { transform: [{ translateX: 0 }] },
  { transform: [{ translateX: 200 }] },
  Easing.easeInOutCubic,
  0,
);