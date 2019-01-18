<template>
  <div ref="artboard" class="artboard">
    <slot></slot>
  </div>
</template>

<script>
module.exports = {
  data: () => ({
    isInView: false
  }),
  props: {
    inView: {
      type: Function,
      required: true
    }
  },
  mounted () {
    function calcCoverage(windowHeight, bb) {
      const elHeight = bb.bottom - bb.top;
      if (bb.top > 0 && bb.bottom < windowHeight) {
        return 1;
      } else if (bb.top > 0 && bb.top < windowHeight) {
        const visiblePart = windowHeight - bb.top;
        return visiblePart / elHeight;
      } else if (bb.bottom > 0 & bb.bottom < windowHeight) {
        const visiblePart = bb.bottom;
        return visiblePart / elHeight;
      }
      return 0;
    }

    function checkElementInView(el, inViewCallback) {
      const windowHeight = window.innerHeight;
      const bb = el.getBoundingClientRect();
      const coverage = calcCoverage(windowHeight, bb);
      if (coverage > 0.9 && !this.isInView) {
        this.isInView = true;
        inViewCallback(el);
      }
    }

    const artboardEl = this.$refs.artboard;
    checkElementInView(artboardEl, this.inView);
    window.addEventListener('scroll', () => {
      checkElementInView(artboardEl, this.inView);
    });
  },
}
</script>

<style scoped>
.artboard {
  background-color: rgb(245, 245, 245);
  padding: 5em;
  position: relative;
}
</style>