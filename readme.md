# Animol

A very lightweight (~2KB minimized and gzipped) JavaScript animation library with a Greensock-like API.

## API

### Basic usage
```javascript
import * as animol from 'animol';

const myElement = document.getElementById('my-element');

animol.css(
  myElement, // DOM element
  2000, // Duration
  { marginLeft: '0px', backgroundColor: '#FF0000' }, // From
  { marginLeft: '200px', backgroundColor: '#00FF00' }, // To
  animol.Easing.easeInOutCubic, // Easing function (optional)
  1000, // Delay (optional)
);
```

### CSS transforms
CSS transforms are passed as an array where each item in the array is an object with a single key.

```javascript
animol.css(
  myElement,
  2000,
  { transform: [{ scaleX: 1 }, { translateX: '0px' }, { rotate: '0deg' }] },
  { transform: [{ scaleX: 2 }, { translateX: '500px' }, { rotate: '-765deg' }] },
);
```

### Chaining animations
Each animation returns a promise which resolves when the animation is complete.
```javascript
animol.css(
  myElement,
  2000,
  { marginLeft: '0px'},
  { marginLeft: '200px'},
  animol.Easing.easeInOutCubic,
).then(() => {
  animol.css(
    myElement,
    2000,
    { marginLeft: '200px'},
    { marginLeft: '100px'},
    animol.Easing.easeInOutCubic,
  )});
```

### Easing functions
Some common easing functions are attached to the `Easing` property:
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

## Motivation
Animol is intended to be **very lightweight**, **ease to use** and **relatively performant**. It abstracts the repetetive logic for calling `requestAnimationFrame`, easing, and parsing CSS strings. It's ideal for small projects where you want to do some simple animations without reinventing the wheel, and you don't want to import a large library.

Check out [Greensock](https://greensock.com/) instead if file size is not an issue and you need any of the following:
 * SVG transformations
 * Very high performance
 * Conversion between units and all CSS values
 * jQuery-like selectors
 * Timeline control
