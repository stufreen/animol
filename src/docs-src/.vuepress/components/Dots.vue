<template>
  <Artboard>
    <div ref="container" id="dots-container">
      <div v-for="index in 30" :key="index" class="dot" />
    </div>
    <PlayButton class="play-button" :onClick="play">Play</PlayButton>
  </Artboard>
</template>

<script>
module.exports = {
  methods: {
    play: () => {
      import('../../../../dist/animol.min.js').then(() => {
        // Parameters
        const easing = animol.Easing.easeInOutBack(1);
        const animationTime = 2000;
        const numElements = 30;
        const interval = 30;
        const dots = document.getElementsByClassName('dot');

        for(let i = 0; i < dots.length; i++){
          animol.css(
            dots[i],
            animationTime,
            {},
            { transform: { translateY: '19em' }, backgroundColor: 'rgb(50, 90, 120)' },
            easing,
            i * interval
          );
          animol.css(
            dots[i],
            animationTime,
            {},
            { transform: { translateY: '0em' }, backgroundColor: 'rgb(230, 90, 90)' },
            easing,
            animationTime + 100 + (i * interval)
          );
        };
      })
    }
  }
}
</script>

<style>
#dots-container {
  width: 100%;
  height: 20em;
  position: relative;
  display: flex;
  justify-content: space-between;
}

.dot {
  width: 3%;
  height: 0;
  padding-bottom: 3%;
  background-color: rgb(230, 90, 90);
  border-radius: 100%;
}
</style>