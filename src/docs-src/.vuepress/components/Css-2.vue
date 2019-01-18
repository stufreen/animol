<template>
  <Artboard id="my-artboard">
    <div id="my-element-2" />
    <PlayButton class="play-button" :onClick="play">Replay</PlayButton>
  </Artboard>
</template>

<script>
module.exports = {
  methods: {
    play: () => {
      import('../../../../dist/animol.min.js').then(() => {
        const myElement = document.getElementById('my-element-2');

        animol.css(
          myElement,
          1000,
          { transform: { translateX: '-100%', rotate: '0deg' } },
          { transform: { translateX: '100%', rotate: '50deg' } },
        );
      })
    }
  }
}
</script>

<style scoped>
#my-element-2 {
  width: 100px;
  height: 100px;
  border-radius: 0.2em;
  background-color: #da5a47;
  transform: translateX(-100%);
}

#my-artboard {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px;
}
</style>