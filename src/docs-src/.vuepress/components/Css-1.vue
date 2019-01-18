<template>
  <div class="artboard">
    <div id="my-element" ref="foobar" />
    <PlayButton class="play-button" :onClick="play">Replay</PlayButton>
  </div>
</template>

<script>
module.exports = {
  data: () => ({}),
  mounted () {  },
  methods: {
    play: () => {
      import('../../../../dist/animol.min.js').then(() => {
        const myElement = document.getElementById('my-element');

        animol.css(
          myElement,
          1000,
          { height: '100px' },
          { height: '200px' }
        );
      })
    }
  }
}
</script>

<style scoped>
#my-element {
  width: 100px;
  height: 100px;
  border-radius: 0.2em;
  background-color: rgb(10, 160, 120);
}

.artboard {
  background-color: rgb(245, 245, 245);
  height: 200px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px;
  position: relative;
}
</style>