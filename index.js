import { animate, Easing } from './animo.js';

animate(
  document.getElementById('blocky'),
  1000,
  {backgroundColor: '#FF0000'},
  {backgroundColor: '#0000FF'},
  Easing.easeInOutCubic,
  500,
);