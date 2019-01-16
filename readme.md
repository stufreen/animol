# Animol

A very lightweight (~5KB minimized and gzipped) JavaScript animation library with a Greensock-like API.

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
  animol.Easing.easeInOutCubic, // Easing function (defaults to Easing.linear)
  1000, // Delay (defaults to 0)
);
```

### CSS transforms
CSS transforms are passed as an object where the keys are transform functions.

```javascript
animol.css(
  myElement,
  2000,
  { transform: { scaleX: 1, translateX: '0px', rotate: '0deg' } },
  { transform: { scaleX: 2, translateX: '500px', rotate: '-765deg' } },
);
```

### Ease
A low-level `ease` function is exposed which allows you to animate values other than CSS. The callback will be called each animation frame and receives a "progress" parameter which is a number between 0 and 1.

```javascript
animol.ease(
  (progress) => {
    const percent = Math.round(progress * 100);
    document.title = `${percent}% complete`;
  }, // Callback
  2000, // Duration
  animol.Easing.easeInOutQuint, // Easing function (defaults to Easing.linear)
  1000, // Delay (defaults to 0)
);
```

### Attributes
You can use Animol's `ease` function and the standard `Element.setAttribute` function to animate attributes.
```javascript
const myShape = document.getElementById('my-shape');

animol.ease(
  (progress) => {
    myShape.setAttribute('cx', `${progress * 300}`);
  },
  2000,
  animol.Easing.easeOutQuart,
  1000,
);
```

### Complex CSS
For complex CSS animations, or properties not supported by `css`, you can also use the `ease` function.
```javascript
animol.ease(
  (progress) => {
    myElement.style.backgroundColor = progress > 0.5 ? 'PapayaWhip' : 'Crimson';
  },
  2000,
  animol.Easing.easeInOutCubic
);
```

For interpolating bewteen colors, you can use the helper functions `parseColor` and `blend`.
```javascript
const turquoise = animol.parseColor('#40F090');
const blue = animol.parseColor('rgb(15, 60, 100)');
const myElement = document.getElementById('block');
animol.ease(
  (progress) => {
    colorA = animol.blend(turquoise, blue, progress);
    colorB = animol.blend(blue, turquoise, progress);
    myElement.style.background = `linear-gradient(${colorA}, ${colorB})`;
  },
  2000,
  animol.Easing.easeInOutCubic
);
```

### Chaining animations
Each call to `css` and `ease` returns an object with a property `promise`, which resolves when the animation is complete.
```javascript
const myAnimation = animol.css(
  myElement,
  2000,
  { marginLeft: '0px'},
  { marginLeft: '200px'},
  animol.Easing.easeInOutCubic,
);

myAnimation.promise.then(() => {
  animol.css(
    myElement,
    2000,
    { marginLeft: '200px'},
    { marginLeft: '100px'},
    animol.Easing.easeInOutCubic,
  )});
```

Animation objects returned by `css` and `ease` can also be **cancelled**.
```javascript
const myAnimation = animol.css(
  myElement,
  2000,
  { marginLeft: '0px' },
  { marginLeft: '200px' },
  animol.Easing.easeInOutCubic,
);

myAnimation.cancel();
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
easeInElastic
easeOutElastic
easeInOutElastic
easeInBack
easeOutBack
easeInOutBack
easeInBounce
easeOutBounce
easeInOutBounce
```

For `elastic` and `back` easing functions you must pass in the power of the animation, e.g.
```javascript
animol.Easing.easeInOutElastic(1.5) // Power of 1 is the default
```

You can also provide a custom easing function where the parameter and return value are each numbers between 0-1.

## Gotchas

**Convenience properties and functions** such as `background`, `border`, `padding` and `translate` are not supported. Use the individual values like `backgroundColor`, `borderWidth`, `paddingLeft` and `translateX` instead. Similarly, you can't use color shorthands like `black` or `IndianRed`.

Animol **cannot convert between units**. For example, the following will throw an error:
```javascript
animol.css(
  myElement,
  2000,
  { height: '100px' },
  { height: '50em' },
);
```

## Running demos and development
```
npm install
npm run start
```

## Browser Compatibility
Compatible with all modern browsers and IE 10+.

## To do
 * Increase test coverage
 * Improve demos

## Motivation
Animol is intended to be **very lightweight**, **ease to use** and **relatively performant**. It abstracts the repetitive logic for calling `requestAnimationFrame`, easing, and parsing CSS strings. It's ideal for small projects where you want to do some simple animations without reinventing the wheel, and you don't want to import a large library.

Check out [Greensock](https://greensock.com/) instead if file size is not an issue and you need any of the following:
 * SVG transformations
 * Very high performance
 * Conversion between units and all CSS values
 * jQuery-like selectors
 * Timeline control
