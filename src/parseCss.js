function parseRGB(inputString) {
  var regex = /rgb\( *(\d{1,3}), *(\d{1,3}), *(\d{1,3}) *\)/;
  var result = inputString.match(regex);
  if (!result) {
    return false;
  }
  return [
    parseInt(result[1], 10),
    parseInt(result[2], 10),
    parseInt(result[3], 10),
    1
  ];
}

function parseRGBA(inputString) {
  var regex = /rgba\( *(\d{1,3}), *(\d{1,3}), *(\d{1,3}), *(\d+[.\d]?\d*) *\)/;
  var result = inputString.match(regex);
  if (!result) {
    return false;
  }
  return [
    parseInt(result[1], 10),
    parseInt(result[2], 10),
    parseInt(result[3], 10),
    parseFloat(result[4], 10)
  ];
}

function parseHexColor(inputString) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(inputString);
  if (!result) {
    return false;
  }
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
    1
  ];
}

export var getUnit = function(input) {
  if (typeof input !== 'string') {
    return false;
  }
  var result = input.match(/([a-zA-Z]+|%)/);
  if (!result) {
    return false;
  }
  return result[0];
};

export var getVal = function(input) {
  if (typeof input !== 'string') {
    return false;
  }
  var result = input.match(/^-?\d+(\.\d)?\d*/);
  if (!result) {
    return false;
  }
  return parseFloat(result[0]);
};

export var parseColor = function(styleString) {
  if (typeof styleString !== 'string') {
    return false;
  }
  if (styleString.charAt(0) === '#') {
    return parseHexColor(styleString);
  }
  if (styleString.substring(0, 4) === 'rgba') {
    return parseRGBA(styleString);
  }
  if (styleString.substring(0, 3) === 'rgb') {
    return parseRGB(styleString);
  }
  return false;
};

export var parseMatrix = function(matrixString) {
  if (typeof matrixString !== 'string') {
    return false;
  }

  var match = matrixString.match(/(matrix|matrix3d)\((.*)\)/);
  if (!match) {
    return false;
  }

  return match[2].split(',').map(item => parseFloat(item));
};
