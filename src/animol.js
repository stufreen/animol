import {
  interpolate,
  calculateVal,
  calculateColor,
  calculateTransform
} from './interpolate';
import { buildFromToList } from './transformList';
import { Easing } from './easing';

export { Easing } from './easing';
export { parseColor } from './parseCss';

export var ease = function (callback, duration, easingFunc, delay) {
  duration = duration || 0;
  delay = delay || 0;
  callback = callback || function () {};
  easingFunc = easingFunc || Easing.easeInOutQuad;

  var animationFrameRequest;
  var rej;

  // If Promise is unsupported we treat it as void
  var PromiseSafe = (typeof Promise !== 'undefined' && Promise.toString().indexOf('[native code]') !== -1)
    ? Promise
    : function (exec) { exec(); };

  var promise = new PromiseSafe(function (resolve, reject) {
    rej = reject;
    var startTime;
    var endTime;
    var step = function (timestamp) {
      if (typeof startTime === 'undefined') {
        startTime = timestamp + delay;
        endTime = timestamp + duration + delay;
      } else if (timestamp >= endTime) {
        callback(interpolate(startTime, endTime, endTime, easingFunc));
        if (typeof resolve !== 'undefined') {
          resolve(); // Done the animation
          return;
        }
      } else if (timestamp >= startTime) {
        callback(interpolate(startTime, endTime, timestamp, easingFunc));
      }
      animationFrameRequest = window.requestAnimationFrame(step);
    };
    animationFrameRequest = window.requestAnimationFrame(step);
  });

  var cancel = function () {
    window.cancelAnimationFrame(animationFrameRequest);
    if (typeof rej !== 'undefined') rej();
  };

  return { promise: promise, cancel: cancel };
};

export var blend = function (colorA, colorB, progress) {
  var newColor = calculateColor(colorA, colorB, progress);
  return 'rgba(' + newColor.join(', ') + ')';
};

export var css = function (element, duration, from, to, easingFunc, delay) {
  from = from || {};
  to = to || {};

  var fromToList = buildFromToList(element, from, to);
  var callback = function (progress) {
    fromToList.forEach(function (item) {
      if (item.unit === 'color') {
        element.style[item.key] = blend(item.fromVal, item.toVal, progress);
      } else if (item.key === 'transform') {
        var newTransform = calculateTransform(item.fromVal, item.toVal, progress);
        element.style.transform = newTransform;
      } else {
        var newVal = calculateVal(item.fromVal, item.toVal, progress);
        element.style[item.key] = newVal.toString() + item.unit;
      }
    });
  };

  return ease(callback, duration, easingFunc, delay);
};
