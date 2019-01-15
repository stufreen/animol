import {
  interpolate,
  calculateVal,
  calculateColor,
  calculateTransform,
} from './interpolate';
import { buildFromToList } from './transformList';
import { Easing } from './easing';

export { Easing } from './easing';
export { parseColor } from './parseCss';

export const ease = (
  callback = () => {},
  duration = 0,
  easingFunc = Easing.linear,
  delay = 0
) => {
  let animationFrameRequest;
  let rej;
  const promise = new Promise((resolve, reject) => {
    rej = reject;
    let startTime;
    let endTime;
    const step = (timestamp) => {
      if (typeof startTime === 'undefined') {
        startTime = timestamp + delay;
        endTime = timestamp + duration + delay;
      } else if (timestamp >= endTime) {
        resolve(); // Done the animation
      } else if (timestamp >= startTime) {
        callback(interpolate(startTime, endTime, timestamp, easingFunc));
      }
      animationFrameRequest = window.requestAnimationFrame(step);
    };
    animationFrameRequest = window.requestAnimationFrame(step);
  });

  const cancel = () => {
    window.cancelAnimationFrame(animationFrameRequest);
    rej();
  };

  return { promise, cancel };
};

export const blend = (colorA, colorB, progress) => {
  const newColor = calculateColor(colorA, colorB, progress);
  const r = Math.round;
  return `rgba(${r(newColor.r)}, ${r(newColor.g)}, ${r(newColor.b)}, ${newColor.a})`;
};

export const css = (
  element,
  duration,
  from = {},
  to = {},
  easingFunc = Easing.linear,
  delay = 0
) => {
  const fromToList = buildFromToList(element, from, to);
  const callback = (progress) => {
    fromToList.forEach((item) => {
      if (item.unit === 'color') {
        element.style[item.key] = blend(item.fromVal, item.toVal, progress);
      } else if (item.key === 'transform') {
        const newTransform = calculateTransform(item.fromVal, item.toVal, progress);
        element.style.transform = newTransform;
      } else {
        const newVal = calculateVal(item.fromVal, item.toVal, progress);
        element.style[item.key] = `${newVal}${item.unit}`;
      }
    });
  };

  return ease(callback, duration, easingFunc, delay);
};
