# Demos

## Staggering Animations

<Dots />

```javascript
// Parameters
const easing = animol.Easing.easeInOutBack(1);
const animationTime = 2000;
const numElements = 30;
const interval = 30;
const dots = document.getElementsByClassName('dot');

for(let i = 0; i < dots.length; i++){
  animol.css(
    dots[i],
    animationTime,
    {},
    { transform: { translateY: '19em' }, backgroundColor: 'rgb(90, 90, 230)' },
    easing,
    i * interval
  );
  animol.css(
    dots[i],
    animationTime,
    {},
    { transform: { translateY: '0em' }, backgroundColor: 'rgb(230, 90, 90)' },
    easing,
    animationTime + 100 + (i * interval)
  );
};
```

## Hover

<HoverCard />

```javascript
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
  const pctLeft = ((evt.x - bb.x) / bb.width) - 0.5;
  const pctTop = (((evt.y - bb.y) / bb.height) - 0.5) * -1;
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
```

## Smooth scroll

<SmoothScroll />