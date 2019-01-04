# Animol

A very lightweight (~2KB minimized and gzipped) JavaScript animation library with a Greensock-like API.

## API

### Basic usage
```javascript
import { animate, Easing } from '../animol';

const myElement = document.getElementById('my-element');

animate(
  myElement, // DOM element
  2000, // Duration
  { marginLeft: '0px', backgroundColor: '#FF0000' }, // From
  { marginLeft: '200px', backgroundColor: '#00FF00' }, // To
  Easing.easeInOutCubic, // Easing function (optional)
  1000, // Delay (optional)
);
```

### CSS transforms
CSS transforms are passed as an array where each item in the array is an object with a single key.

```javascript
animate(
  myElement,
  2000,
  { transform: [{ scaleX: 1 }, { translateX: '0px' }, { rotate: '0deg' }] },
  { transform: [{ scaleX: 2 }, { translateX: '500px' }, { rotate: '-765deg' }] },
);
```

### Chaining animations
Each animation returns a promise which resolves when the animation is complete.
```javascript
animate(
  myElement,
  2000,
  { marginLeft: '0px'},
  { marginLeft: '200px'},
  Easing.easeInOutCubic,
).then(() => {
  animate(
    myElement,
    2000,
    { marginLeft: '200px'},
    { marginLeft: '100px'},
    Easing.easeInOutCubic,
  )});
```

### Easing functions
Some common easing functions are attached to the `Easing` import:
```
linear
easeInQuad
easeOutQuad
easeInOutQuad
easeInCubic
easeOutCubic
easeInOutCubic
easeInQuart
easeOutQuart
easeInOutQuart
easeInQuint
easeOutQuint
easeInOutQuint
```

You can also provide a custom easing function where the parameter and return value are each numbers between 0-1.

## Why?
Animol is intended to be **lightweight**, **ease to use** and **relatively performant**. It is ideal for small projects where you want to keep the bundle size down without coding animations from scratch.

Check out Greensock instead if file size is not an issue and you need any of the following:
 * SVG transformations
 * Very high performance
 * Conversion between units and all CSS values
 * jQuery-like selectors
 * Timeline control
