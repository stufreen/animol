export const interpolate = (
  startTime,
  endTime,
  currentTime,
  easingFunction,
) => {
  const pctElapsed = Math.max(0, (currentTime - startTime) / (endTime - startTime));
  return easingFunction(pctElapsed);
};

export const calculateVal = (startVal, endVal, progress) => {
  const distance = endVal - startVal;
  return startVal + (progress * distance);
};

export const calculateColor = (startVal, endVal, progress) => ({
  r: calculateVal(startVal.r, endVal.r, progress),
  g: calculateVal(startVal.g, endVal.g, progress),
  b: calculateVal(startVal.b, endVal.b, progress),
  a: calculateVal(startVal.a, endVal.a, progress),
});

// Interpolate two transform lists and build up a "transform" string
// TO DO: Allow transforms with commas, e.g. translate(20px, 30px)
export const calculateTransform = (startTransformList, endTransformList, progress) => {
  const transforms = startTransformList.reduce(
    (accumulator, { key, val: startVal, unit }, index) => {
      const endVal = endTransformList[index].val;
      const newVal = calculateVal(startVal, endVal, progress);
      return [...accumulator, `${key}(${newVal}${unit})`];
    }, [],
  );
  return transforms.join(' ');
};
