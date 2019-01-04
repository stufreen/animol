import { animate, Easing } from '../animol.js';

const blocks = [];

for (let i = 0; i < 25; i += 1) {
  const block = document.createElement('div');
  block.classList.add('block');
  document.body.appendChild(block);
  blocks.push(block);
}

for (let i = 0; i < blocks.length; i++) {
  animate(
    blocks[i],
    2000,
    { transform: [{ translateX: '0vw' }, { scaleX: 1 }, { scaleY: 1 }, { rotate: '0deg' }], backgroundColor: 'rgba(255, 0, 0, 1)' },
    { transform: [{ translateX: '90vw' }, { scaleX: 2 }, { scaleY: 2 }, { rotate: '-765deg' }], backgroundColor: 'rgba(0, 0, 100, 0.1)' },
    Easing.easeInOutCubic,
    i * 100,
  ).then(() => {
    animate(
      blocks[i],
      2000,
      { transform: [{ translateX: '90vw' }, { scaleX: 2 }, { scaleY: 2 }, { rotate: '-765deg' }], backgroundColor: 'rgba(0, 0, 100, 0.1)' },
      { transform: [{ translateX: '0vw' }, { scaleX: 1 }, { scaleY: 1 }, { rotate: '0deg' }], backgroundColor: 'rgba(255, 0, 0, 1)' },
      Easing.easeInOutCubic,
    );
  });
}
