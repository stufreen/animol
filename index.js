import { animate, Easing } from './animo.js';

animate(
  document.getElementById('blocky'),
  1000,
  {marginTop: 0, marginLeft: 50},
  {marginTop: 200, marginLeft: 100},
  Easing.easeInOutCubic
);
