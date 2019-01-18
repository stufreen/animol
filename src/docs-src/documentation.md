# Documentation

[[toc]]

## css

Animate the CSS values of a DOM element.

```javascript
animol.css(
  element: Element,
  duration: number, // milliseconds
  from: Object, // Default: {}
  to: Object, // Default: {}
  easing: (number) => number, // Default: animol.Easing.easeInOutQuad
  delay: number // milliseconds, default: 0
);
```

The `from` and `to` parameters are objects where the keys are CSS properties.

```javascript
import * as animol from 'animol';

const myElement = document.getElementById('my-element');

animol.css(
  myElement,
  1000,
  { height: '100px' },
  { height: '200px' }
);
```

CSS transforms are also supported. The `transform` value should be an object where the keys are CSS transform functions. The functions will always be applied in this order: `translate`, `scale`, `rotate`.

```javascript
animol.css(
  myElement,
  1000,
  { transform: { translateX: '0px' } },
  { transform: { translateX: '100px' } }
);
```

The `css` function will try to infer the value of a style if you don't explicitly provide it, based on the computed style of the element. Accordingly, it's ok to do things like this:

```javascript{4}
animol.css(
  myElement,
  1000,
  {},
  { transform: { translateX: '100px' } }
);
```

## ease

Animate any value with an easing function. The callback will be called each animation frame and receives a "progress" parameter which is a number between 0 and 1.

```javascript
animol.ease(
  callback: (number) => void,
  duration: number, //milliseconds
  easing: (number) => number,
  delay: number // milliseconds
): Promise;
```

The `ease` function can be used to animate DOM element attributes (among other things).

```javascript
animol.ease(
  (progress) => {
    myElement.setAttribute('cx', `${progress * 300}`);
  },
  2000
): Promise;
```

## Easing

Animol exposes a number of standard easing functions that you can pass into `css` and `ease`.

```javascript{8}
import * as animol from 'animol';

animol.css(
  myElement,
  1000,
  { height: '100px' },
  { height: '200px' },
  animol.Easing.easeInOutBack
);
```

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

## parseColor

Parses a color string (`hex`, `rgb`, or `rgba`) into an array `[red, green, blue, alpha]`.

```javascript
animol.parseColor(
  color: string // rgb, rgba, or hex
): Array<number>;
```

## blend

Blends two color arrays linearly and returns a color string in `rgba` form;

```javascript
animol.blend(
  fromColor: Array<number>,
  toColor: Array<number>,
  ratio: number
): string;
```

You can use `parseColor` and `blend` together to interpolate between colors.

```javascript
const red = animol.parseColor('#FF0000');
const blue = animol.parseColor('#0000FF');
const purple = animol.blend(red, blue, 0.5); // 'rgba(128, 0, 128, 1)'
```

## Promises

The `css` and `ease` functions return return an object with a `promise` property which (surprise!) a `Promise`. This allows you to do something after the animation completes. For example: 

```javascript{9}
const myAnimation = animol.css(
  myElement,
  2000,
  { marginLeft: '0px'},
  { marginLeft: '200px'},
  animol.Easing.easeInOutCubic,
);

myAnimation.promise.then(() => {
  // Start a new animation after the initial one finishes
  animol.css(
    myElement,
    2000,
    { marginLeft: '200px'},
    { marginLeft: '100px'},
    animol.Easing.easeInOutCubic,
  )});
```

## Cancelling animations

You can also cancel animations by calling the `cancel` function. This will stop the animation and cause the `promise` to reject.

Animation objects returned by `css` and `ease` can also be **cancelled**.
```javascript{9}
const myAnimation = animol.css(
  myElement,
  2000,
  { marginLeft: '0px' },
  { marginLeft: '200px' },
  animol.Easing.easeInOutCubic,
);

myAnimation.cancel();
```

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