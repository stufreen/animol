<template>
  <button class="play-button" @click="onClick">Play</button>
</template>

<script>
module.exports = {
  props: {
    onClick: {
      type: Function,
      required: true
    }
  }
}
</script>


<style scoped>
.play-button {
  appearance: none;
  background: rgb(50, 50, 50);
  color: white;
  border-radius: 0.3em;
  position: absolute;
  right: 1em;
  top: 1em;
  z-index: 1;
  border: none;
  font-size: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: bold;
  padding: 0.5em 1em;
  transition: opacity 0.1s;
  outline: none;
  opacity: 0.5;
}

.play-button:hover {
  opacity: 1;
}
</style>