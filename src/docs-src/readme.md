# Animol

A very lightweight (less than 3KB minimized and gzipped) JavaScript animation library with a Greensock-like API.

<ClientOnly>
  <Frontpage/>
</ClientOnly>

## Installation
```
npm install stufreen/animol --save
```

## Basic usage
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

## Documentation

[Go to the documentation](/documentation.html)

## Motivation
Animol is intended to be **very lightweight**, **ease to use** and **relatively performant**. It abstracts the repetitive logic for calling `requestAnimationFrame`, easing, and parsing CSS strings.

It's ideal for small projects where you want to do some simple animations without reinventing the wheel, and you don't want to import a large library.

For advanced use cases involving timelines, svg, etc. check out Greensock or Anime.js.

## Browser Compatibility
Compatible with all modern browsers and IE 10+.