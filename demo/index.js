import { animate, Easing } from '../animo.js';

const blocks = document.getElementsByClassName('block');

for(let i = 0; i < blocks.length; i++) {
  animate(
    blocks[i],
    5000,
    { transform: [{ scaleX: 1 }, { scaleY: 1 }, { translateX: '0px' }, { rotate: '0deg' }], backgroundColor: 'rgba(255, 0, 0, 1)' },
    { transform: [{ scaleX: 2 }, { scaleY: 2 }, { translateX: '500px' }, { rotate: '-765deg' }], backgroundColor: 'rgba(0, 0, 100, 0.1)' },
    Easing.easeInOutCubic,
    i * 8
  );
}
