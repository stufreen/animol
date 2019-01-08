import {
  interpolate,
  calculateVal,
  calculateColor,
  calculateTransform,
} from './interpolate';
import { buildFromToList } from './transformList';
import { Easing } from './easing';

export { Easing } from './easing';

export const ease = (
  callback = () => {},
  duration = 0,
  easingFunc = Easing.linear,
  delay = 0,
) => new Promise((resolve) => {
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
    window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
});

export const css = (
  element,
  duration,
  from = {},
  to = {},
  easingFunc = Easing.linear,
  delay = 0,
) => {
  const fromToList = buildFromToList(element, from, to);
  const callback = (progress) => {
    fromToList.forEach((item) => {
      if (item.unit === 'color') {
        const newColor = calculateColor(item.fromVal, item.toVal, progress);
        element.style[item.key] = `rgba(${newColor.red}, ${newColor.green}, ${newColor.blue}, ${newColor.alpha})`;
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
