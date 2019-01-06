export const interpolate = (
  startTime,
  endTime,
  currentTime,
  startVal,
  endVal,
  easingFunction,
) => {
  const distance = endVal - startVal;
  const pctElapsed = Math.max(0, (currentTime - startTime) / (endTime - startTime));
  return startVal + easingFunction(pctElapsed) * distance;
};

export const interpolateColor = (
  startTime,
  endTime,
  currentTime,
  startVal,
  endVal,
  easingFunction,
) => ({
  red: interpolate(startTime, endTime, currentTime, startVal.red, endVal.red, easingFunction),
  blue: interpolate(startTime, endTime, currentTime, startVal.blue, endVal.blue, easingFunction),
  green: interpolate(
    startTime,
    endTime,
    currentTime,
    startVal.green,
    endVal.green,
    easingFunction,
  ),
  alpha: interpolate(
    startTime,
    endTime,
    currentTime,
    startVal.alpha,
    endVal.alpha,
    easingFunction,
  ),
});

// Interpolate two transform lists and build up a "transform" string
// TO DO: Allow transforms with commas, e.g. translate(20px, 30px)
export const interpolateTransform = (
  startTime,
  endTime,
  currentTime,
  startTransformList,
  endTransformList,
  easingFunction,
) => {
  const transforms = startTransformList.reduce(
    (accumulator, { key, val: startVal, unit }, index) => {
      const endVal = endTransformList[index].val;
      const interpolatedVal = interpolate(
        startTime,
        endTime,
        currentTime,
        startVal,
        endVal,
        easingFunction,
      );
      return [...accumulator, `${key}(${interpolatedVal}${unit})`];
    }, [],
  );
  return transforms.join(' ');
};
