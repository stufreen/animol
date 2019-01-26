<img src="https://raw.githubusercontent.com/stufreen/animol/master/src/docs-src/wordmark.svg?sanitize=true" style="width: 250px; margin-bottom: 2em;" width="250" />

A minimal, super lightweight (<3KB minimized and gzipped), zero dependency, JavaScript animation library.

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
  animol.Easing.easeInOutCubic, // Easing function
  1000 // Delay
);
```

## Documentation

[Go to Documentation](https://stufreen.github.io/animol/documentation.html)

## Motivation
Animol is intended to be **super lightweight**, **ease to use** and **performant**. It abstracts the repetitive logic for calling `requestAnimationFrame`, easing, and parsing CSS strings.

It's ideal for small projects where you want to do some JavaScript animations without reinventing the wheel, and you don't want to import a large library.

For advanced use cases involving timelines, svg, etc. check out Greensock or Anime.js.

## Browser Compatibility
Compatible with all modern browsers and IE 10+.
