export var roundTo = function (val, decimalPoints) {
  var multiplier = Math.pow(10, decimalPoints);
  return Math.round(val * multiplier) / multiplier;
};
