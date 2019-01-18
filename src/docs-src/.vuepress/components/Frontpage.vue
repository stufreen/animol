<template>
  <Artboard :inView="play">
    <div id="my-element" ref="foobar" />
    <PlayButton class="play-button" :onClick="play">Replay</PlayButton>
  </Artboard>
</template>

<script>
module.exports = {
  data: () => ({}),
  mounted () {
    // this.methods.play();
  },
  methods: {
    play: () => {
      import('../../../../dist/animol.min.js').then(() => {
        const myElement = document.getElementById('my-element');

        animol.css(
          myElement,
          2000,
          { transform: { scaleX: 1, scaleY: 1, rotate: '0rad' } },
          { transform: { scaleX: 2.5, scaleY: 2.5, rotate: '375deg' } },
          animol.Easing.easeInOutBack(1),
          200,
        );
      })
    }
  }
}
</script>

<style scoped>
#my-element {
  width: 3em;
  height: 3em;
  border-radius: 0.2em;
  background-color: rgb(10, 160, 120);
  margin: 0 auto;
}
</style>