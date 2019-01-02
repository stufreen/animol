import { animate } from './animo.js';

const blocky = document.getElementById('blocky');
animate(blocky, 1000, null, null)
  .then(() => {
    console.log('done');
  });