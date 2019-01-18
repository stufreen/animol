<template>
  <Artboard>
    <svg viewBox="0 0 830 150" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <path d="M15,75 C41.4453125,35 74.7786458,15 115,15 C155.221354,15 188.554687,35 215,75 C241.260417,115 274.59375,135 315,135 C355.40625,135 388.739583,115 415,75 C441.140625,35 474.473958,15 515,15 C555.526042,15 588.859375,35 615,75 C642.713542,115 676.046875,135 715,135 C753.953125,135 787.286458,115 815,75" stroke="#AAAAAA" stroke-width="30" fill-rule="nonzero" fill="none" stroke-dasharray="1000"></path>
      <path id="ease-svg-path" d="M15,75 C41.4453125,35 74.7786458,15 115,15 C155.221354,15 188.554687,35 215,75 C241.260417,115 274.59375,135 315,135 C355.40625,135 388.739583,115 415,75 C441.140625,35 474.473958,15 515,15 C555.526042,15 588.859375,35 615,75 C642.713542,115 676.046875,135 715,135 C753.953125,135 787.286458,115 815,75" stroke="#333333" stroke-width="30" fill-rule="nonzero" fill="none" stroke-dasharray="1000"></path>
    </svg>
    <PlayButton class="play-button" :onClick="play">Replay</PlayButton>
  </Artboard>
</template>

<script>
module.exports = {
  methods: {
    play: () => {
      import('../../../../dist/animol.min.js').then(() => {
        const myElement = document.getElementById('ease-svg-path');

        animol.ease(
          (progress) => {
            myElement.setAttribute('stroke-dashoffset', `${1000 - (progress * 1000)}`)
          },
          2000
        );
      })
    }
  }
}
</script>

<style scoped>
svg {
  width: 75%;
  margin: 0 auto;
  display: block;
}
</style>