<template>
  <div class="artboard">
    <slot></slot>
  </div>
</template>

<script>
module.exports = {}
</script>

<style scoped>
.artboard {
  background-color: #eaeef1;
  padding: 5em;
  position: relative;
  perspective: 300px;
}
</style>