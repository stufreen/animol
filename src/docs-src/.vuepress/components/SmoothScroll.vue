<template>
  <div id="scroll-container">
    <div id="scroll-inner">
      <button class="scroll-demo-button" id="scroll-to-bottom">Scroll to bottom</button>
      <button class="scroll-demo-button" id="scroll-to-top">Scroll to top</button>
    </div>
  </div>
</template>

<script>
module.exports = {
  mounted: () => {
    import('../../../../dist/animol.min.js').then(() => {
      const scrollToBottom = document.getElementById('scroll-to-bottom');
      const scrollToTop = document.getElementById('scroll-to-top');
      const scrollContainer = document.getElementById('scroll-container');
      const scrollInner = document.getElementById('scroll-inner');

      scrollToBottom.addEventListener('click', function () {
        // Get the current scroll position
        var startScrollY = scrollContainer.scrollTop;
        // Calculate the scroll position at the end of the page
        var endScrollY = scrollInner.clientHeight - scrollContainer.offsetHeight;
        // Calculate the total distance to scroll
        var distance = endScrollY - startScrollY;

        // Smooth scroll to the bottom using animol.ease
        animol.ease(
          (progress) => {
            var scrollY = startScrollY + (progress * distance);
            scrollContainer.scrollTop = scrollY;
          },
          2000,
          animol.Easing.easeInOutQuint
        );
      });

      scrollToTop.addEventListener('click', function () {
        var startScrollY = scrollContainer.scrollTop;
        var endScrollY = 0;
        var distance = endScrollY - startScrollY;
        animol.ease(
          (progress) => {
            var scrollY = startScrollY + (progress * distance);
            scrollContainer.scrollTop = scrollY;
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
  position: relative;
  overflow-y: scroll;
  height: 20em;
  -webkit-overflow-scrolling: touch;
}

#scroll-inner {
  padding: 3em;
  width: 100%;
  height: 40em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(#eaeef1, #abbac5);
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