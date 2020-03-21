<template>
  <Artboard>
    <div id="hover-card-container">
      <div id="hover-card">
        <div id="hover-card-shine" />
      </div>
    </div>
  </Artboard>
</template>

<script>
module.exports = {
  mounted: () => {
    import('../../../../dist/animol.min.js').then(() => {
      const myCard = document.getElementById('hover-card');
      const shine = document.getElementById('hover-card-shine');

      myCard.addEventListener('mouseover', (evt) => {
        animol.css(
          myCard,
          300,
          {},
          { transform: { translateZ: '100px' } }
        );
        animol.css(
          shine,
          300,
          { opacity: 0 },
          { opacity: 1 }
        );
      });

      myCard.addEventListener('mouseleave', (evt) => {
        animol.css(
          myCard,
          300,
          {},
          { transform: { translateZ: '0px', rotateY: '0deg', rotateX: '0deg' } }
        );
        animol.css(
          shine,
          300,
          { opacity: 1 },
          { opacity: 0 }
        );
      });

      myCard.addEventListener('mousemove', (evt) => {
        const bb = myCard.getBoundingClientRect();
        const pctLeft = ((evt.x - (bb.x || bb.left)) / bb.width) - 0.5;
        const pctTop = (((evt.y - (bb.y || bb.top)) / bb.height) - 0.5) * -1;
        const rotateAmount = 15;
        animol.css(
          myCard,
          300,
          {},
          { transform: {
            rotateY: `${rotateAmount * pctLeft}deg`,
            rotateX: `${rotateAmount * pctTop}deg`,
            rotateZ: '0deg'
          } },
          animol.Easing.easeOutCubic
        );
        shine.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, ${(pctTop + 0.5) * 0.4}), rgba(255, 255, 255, 0))`;
      });
    })
  }
}
</script>

<style>
#hover-card {
  height: 10em;
  width: 10em;
  border-radius: 0.2em;
  background-color: rgb(50, 90, 120);
  border: none;
  box-shadow: 0 0 rgba(0, 0, 0, 0);
}

#hover-card-shine {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
}

#hover-card-container {
  width: 100%;
  height: 10em;
  perspective: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>