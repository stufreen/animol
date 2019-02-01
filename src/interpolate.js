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
  var applyOrder = ['translateX', 'translateY', 'translateZ', 'rotateZ', 'rotateY', 'rotateX', 'scaleX', 'scaleY', 'scaleZ', 'skewY', 'skewX'];

  // Parse the transform string into a transform list
  var currentTransformsAr = currentTransformsString.split(' ');
  var currentTransforms = {};
  for (var i = 0; i < currentTransformsAr.length; i++) {
    if (currentTransformsAr[i] !== '') {
      var parts = currentTransformsAr[i].split('(');
      var key = parts[0];
      var val = parts[1].substring(0, parts[1].length - 1);
      currentTransforms[key] = val;
    }
  }

  // Apply the new transforms to the old transforms
  var transformsList = '';
  for (var j = 0; j < applyOrder.length; j++) {
    var tKey = applyOrder[j];
    if (typeof newTransforms[tKey] !== 'undefined') {
      transformsList += tKey + '(' + newTransforms[tKey] + ') ';
    } else if (typeof currentTransforms[tKey] !== 'undefined') {
      transformsList += tKey + '(' + currentTransforms[tKey] + ') ';
    }
  }
  return transformsList;
};
