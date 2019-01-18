<template>
  <Artboard id="my-artboard">
    <div id="my-element" />
    <PlayButton class="play-button" :onClick="play">Replay</PlayButton>
  </Artboard>
</template>

<script>
module.exports = {
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
  background-color: #da5a47;
}

#my-artboard {
  height: 200px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px;
}
</style>