import { animate, Easing } from './animo.js';

animate(
  document.getElementById('blocky'),
  1000,
  { rotate: 0, backgroundColor: 'rgba(0, 0, 0, 0)' },
  { rotate: 90, backgroundColor: 'rgba(0, 0, 0, 1)' },
  Easing.easeInOutCubic,
  0,
);