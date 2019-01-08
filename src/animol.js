import { interpolate, interpolateColor, interpolateTransform } from './interpolate';
import { buildFromToList } from './transformList';
import { Easing } from './easing';

export { Easing } from './easing';

export const css = (
  element,
  duration,
  from = {},
  to = {},
  easingFunc = Easing.linear,
  delay = 0,
) => new Promise((resolve) => {
  let startTime;
  let endTime;
  const fromToList = buildFromToList(element, from, to);

  console.log(fromToList);

  const step = (timestamp) => {
    if (typeof startTime === 'undefined') {
      startTime = timestamp + delay;
      endTime = timestamp + duration + delay;
    } else if (timestamp >= endTime) {
      resolve(); // Done the animation
    } else if (timestamp >= startTime) {
      fromToList.forEach((item) => {
        if (item.unit === 'color') {
          const interpolated = interpolateColor(
            startTime,
            endTime,
            timestamp,
            item.fromVal,
            item.toVal,
            easingFunc,
          );
          element.style[item.key] = `rgba(${interpolated.red}, ${interpolated.green}, ${interpolated.blue}, ${interpolated.alpha})`;
        } else if (item.key === 'transform') {
          const interpolated = interpolateTransform(
            startTime,
            endTime,
            timestamp,
            item.fromVal,
            item.toVal,
            easingFunc,
          );
          element.style.transform = interpolated;
        } else {
          const interpolated = interpolate(
            startTime,
            endTime,
            timestamp,
            item.fromVal,
            item.toVal,
            easingFunc,
          );
          element.style[item.key] = `${interpolated}${item.unit}`;
        }
      });
    }
    window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
});
