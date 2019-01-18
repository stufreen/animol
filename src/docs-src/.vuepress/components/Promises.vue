<template>
  <Artboard>
    <div id="my-element-promises" />
    <PlayButton class="play-button" :onClick="play">Replay</PlayButton>
  </Artboard>
</template>

<script>
module.exports = {
  methods: {
    play: () => {
      import('../../../../dist/animol.min.js').then(() => {
        const myElement = document.getElementById('my-element-promises')

        const myAnimation = animol.css(
          myElement,
          2000,
          { transform: { translateX: '0px' } },
          { transform: { translateX: '200px' } },
          animol.Easing.easeInOutCubic,
        );

        myAnimation.promise.then(() => {
          // Start a new animation after the initial one finishes
          animol.css(
            myElement,
            2000,
            { transform: { translateX: '200px' } },
            { transform: { translateX: '100px' } },
            animol.Easing.easeInOutCubic,
          );
        });
      })
    }
  }
}
</script>

<style scoped>
#my-element-promises {
  width: 100px;
  height: 100px;
  border-radius: 0.2em;
  background-color: rgb(10, 160, 120);
}

#my-artboard {
  height: 200px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px;
}
</style>