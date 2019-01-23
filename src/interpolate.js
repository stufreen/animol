import { roundTo } from './math.js';

export var interpolate = function (
  startTime,
  endTime,
  currentTime,
  easingFunction
) {
  var pctElapsed = Math.max(0, (currentTime - startTime) / (endTime - startTime));
  return easingFunction(pctElapsed);
};

export var calculateVal = function (startVal, endVal, progress) {
  var distance = endVal - startVal;
  return roundTo(startVal + (progress * distance), 4);
};

export var calculateColor = function (startVal, endVal, progress) {
  return [
    Math.round(calculateVal(startVal[0], endVal[0], progress)),
    Math.round(calculateVal(startVal[1], endVal[1], progress)),
    Math.round(calculateVal(startVal[2], endVal[2], progress)),
    calculateVal(startVal[3], endVal[3], progress)
  ];
};

// Interpolate two transform lists and build up a "transform" object
export var calculateTransform = function (startTransformList, endTransformList, progress) {
  var transforms = {};
  Object.keys(startTransformList).forEach(
    // { key, val: startVal, unit }
    function (tKey) {
      var item = startTransformList[tKey];
      var endVal = endTransformList[tKey].val;
      var newVal = calculateVal(item.val, endVal, progress);
      transforms[tKey] = newVal + startTransformList[tKey].unit;
    }
  );
  return transforms;
};

export var prepareTransformString = function (currentTransformsString, newTransforms) {
  var applyOrder = ['translateX', 'translateY', 'translateZ', 'scaleX', 'scaleY', 'scaleZ', 'rotateX', 'rotateY', 'rotateZ'];

  // Parse the transform string into a transform list
  var currentTransformsAr = currentTransformsString.split(' ');
  var currentTransforms = {};
  currentTransformsAr.forEach(function (transformString) {
    if (transformString !== '') {
      var match = transformString.match(/(.*)\((.*)\)/);
      currentTransforms[match[1]] = match[2];
    }
  });

  // Apply the new transforms to the old transforms
  var transformsList = [];
  applyOrder.forEach((tKey) => {
    if (typeof newTransforms[tKey] !== 'undefined') {
      transformsList.push(`${tKey}(${newTransforms[tKey]})`);
    } else if (typeof currentTransforms[tKey] !== 'undefined') {
      transformsList.push(`${tKey}(${currentTransforms[tKey]})`);
    }
  });
  return transformsList.join(' ');
};
