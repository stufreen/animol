# Demos

## Staggering Animations
It's easy to stagger animations with the delay parameter and a loop. Use the standard browser selectors like [getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) and [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) to select a group of DOM Elements and loop through them.

<Dots />

```javascript {14,22}
// Parameters
const easing = animol.Easing.easeInOutBack(1);
const animationTime = 2000;
const interval = 30;
const dots = document.getElementsByClassName('dot');

for(let i = 0; i < dots.length; i++){
  animol.css(
    dots[i],
    animationTime,
    {},
    { transform: { translateY: '19em' }, backgroundColor: 'rgb(90, 90, 230)' },
    easing,
    i * interval // delay
  );
  animol.css(
    dots[i],
    animationTime,
    {},
    { transform: { translateY: '0em' }, backgroundColor: 'rgb(230, 90, 90)' },
    easing,
    animationTime + 100 + (i * interval) // delay
  );
};
```

## Hover
You can apply multiple CSS transform functions on top of each other and Animol will merge them.

In this example, the `mouseover` and `mouseleave` events trigger a `translateZ` transform. Then, as the user moves their cursor to different parts of the card, it will trigger `rotateY` and `rotateX` events.

The shine on the card is created with a `linear-gradient`. We can animate gradients and other non-linear values using the `ease` function.

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
The `ease` function can be used to animate anything! Here we're using it to create a smooth scroll-to effect.

<SmoothScroll />

```javascript
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
      scrollContainer.scrollTo(0, scrollY);
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
      scrollContainer.scrollTo(0, scrollY);
    },
    2000,
    animol.Easing.easeInOutQuint
  );
});
```