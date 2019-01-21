<template>
  <Artboard id="my-artboard">
    <div id="my-element-3" />
    <PlayButton class="play-button" :onClick="play">Replay</PlayButton>
  </Artboard>
</template>

<script>
module.exports = {
  methods: {
    play: () => {
      import('../../../../dist/animol.min.js').then(() => {
        const myElement = document.getElementById('my-element-3');

        animol.css(
          myElement,
          3000,
          { transform: { rotateX: '0deg', rotateY: '0deg', rotateZ: '0deg' } },
          { transform: { rotateX: '0deg', rotateY: '360deg', rotateZ: '90deg' } },
          animol.Easing.easeInOutElastic(1.5),
        );
      })
    }
  }
}
</script>

<style scoped>
#my-element-3 {
  width: 100px;
  height: 100px;
  border-radius: 0.2em;
  background-color: #da5a47;
}

#my-artboard {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px;
}
</style>