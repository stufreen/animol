import { animate, Easing } from './animo.js';

animate(
  document.getElementById('blocky'),
  1000,
  { backgroundColor: '#000000', marginLeft: '0px' },
  { backgroundColor: '#0000FF', marginLeft: '300px', borderRadius: '100px' },
  Easing.easeInOutCubic,
  0,
);