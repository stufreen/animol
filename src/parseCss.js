function parseRGB(inputString) {
  const regex = /rgb\( *(\d{1,3}), *(\d{1,3}), *(\d{1,3}) *\)/;
  const result = inputString.match(regex);
  if (!result) {
    return false;
  }
  return {
    r: parseInt(result[1], 10),
    g: parseInt(result[2], 10),
    b: parseInt(result[3], 10),
    a: 1,
  };
}

function parseRGBA(inputString) {
  const regex = /rgba\( *(\d{1,3}), *(\d{1,3}), *(\d{1,3}), *(\d+[.\d]?\d*) *\)/;
  const result = inputString.match(regex);
  if (!result) {
    return false;
  }
  return {
    r: parseInt(result[1], 10),
    g: parseInt(result[2], 10),
    b: parseInt(result[3], 10),
    a: parseFloat(result[4], 10),
  };
}

function parseHexColor(inputString) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(inputString);
  if (!result) {
    return false;
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: 1,
  };
}

export const getUnit = (input) => {
  if (typeof input !== 'string') {
    return false;
  }
  const result = input.match(/([a-zA-Z]+|%)/);
  if (!result) {
    return false;
  }
  return result[0];
};

export const getVal = (input) => {
  if (typeof input !== 'string') {
    return false;
  }
  const result = input.match(/^-?\d+(\.\d)?\d*/);
  if (!result) {
    return false;
  }
  return parseFloat(result[0]);
};

export const parseColor = (styleString) => {
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

export const parseMatrix = (matrixString) => {
  if (typeof matrixString !== 'string') {
    return false;
  }

  const match = matrixString.match(/(matrix|matrix3d)\((.*)\)/);
  if (!match) {
    return false;
  }

  return match[2].split(',').map(item => parseFloat(item));
};
