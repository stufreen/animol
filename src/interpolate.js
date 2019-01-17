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
  return startVal + (progress * distance);
};

export var calculateColor = function (startVal, endVal, progress) {
  return [
    Math.round(calculateVal(startVal[0], endVal[0], progress)),
    Math.round(calculateVal(startVal[1], endVal[1], progress)),
    Math.round(calculateVal(startVal[2], endVal[2], progress)),
    calculateVal(startVal[3], endVal[3], progress)
  ];
};

// Interpolate two transform lists and build up a "transform" string
export var calculateTransform = function (startTransformList, endTransformList, progress) {
  var transforms = startTransformList.reduce(
    // { key, val: startVal, unit }
    function (accumulator, item, index) {
      var endVal = endTransformList[index].val;
      var newVal = calculateVal(item.val, endVal, progress);
      var transformString = item.key + '(' + newVal + item.unit + ')';
      return [...accumulator, transformString];
    }, []
  );
  return transforms.join(' ');
};
