export const interpolate = (
  startTime,
  endTime,
  currentTime,
  easingFunction
) => {
  const pctElapsed = Math.max(0, (currentTime - startTime) / (endTime - startTime));
  return easingFunction(pctElapsed);
};

export const calculateVal = (startVal, endVal, progress) => {
  const distance = endVal - startVal;
  return startVal + (progress * distance);
};

export const calculateColor = (startVal, endVal, progress) => ([
  Math.round(calculateVal(startVal[0], endVal[0], progress)),
  Math.round(calculateVal(startVal[1], endVal[1], progress)),
  Math.round(calculateVal(startVal[2], endVal[2], progress)),
  calculateVal(startVal[3], endVal[3], progress)
]);

// Interpolate two transform lists and build up a "transform" string
export const calculateTransform = (startTransformList, endTransformList, progress) => {
  const transforms = startTransformList.reduce(
    (accumulator, { key, val: startVal, unit }, index) => {
      const endVal = endTransformList[index].val;
      const newVal = calculateVal(startVal, endVal, progress);
      const transformString = key + '(' + newVal + unit + ')';
      return [...accumulator, transformString];
    }, []
  );
  return transforms.join(' ');
};
