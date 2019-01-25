<template>
  <div id="scroll-container">
    <div id="scroll-inner">
      <button class="scroll-demo-button" id="scroll-to-bottom">Scroll to bottom</button>
    </div>
  </div>
</template>

<script>
module.exports = {
  mounted: () => {
    import('../../../../dist/animol.min.js').then(() => {
      const scrollToBottom = document.getElementById('scroll-to-bottom');
      const scrollContainer = document.getElementById('scroll-container');
      const scrollInner = document.getElementById('scroll-inner');

      scrollToBottom.addEventListener('click', function () {
        // Get the current scroll position
        var startScrollY = scrollContainer.scrollTop;
        // Calculate the scroll position at the end of the page
        var endScrollY = scrollInner.clientHeight - scrollContainer.clientHeight;
        // Calculate the total distance to scroll
        var distance = endScrollY - startScrollY;

        // Smooth scroll to the bottom using animol.ease
        animol.ease(
          function (progress) {
            var scrollY = startScrollY + (progress * distance);
            scrollContainer.scrollTo(0, scrollY);
          },
          2000,
          animol.Easing.easeInOutQuint
        );
      });
    })
  }
}
</script>

<style scoped>
#scroll-container {
  background-color: #eaeef1;
  padding: 3em;
  position: relative;
  overflow: scroll;
  height: 20em; 
  box-sizing: border-box;
}

#scroll-inner {
  width: 100%;
  height: 40em;
}

.scroll-demo-button {
  appearance: none;
  background: rgb(50, 50, 50);
  color: white;
  border-radius: 0.3em;
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
  display: block;
  margin: 0 auto;
}

.scroll-demo-button:hover {
  opacity: 1;
}
</style>