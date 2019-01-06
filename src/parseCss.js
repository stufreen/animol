function parseRGB(inputString) {
  const regex = /rgb\((\d{1,3}), *(\d{1,3}), *(\d{1,3})\)/;
  const result = inputString.match(regex);
  return {
    red: parseInt(result[1], 10),
    green: parseInt(result[2], 10),
    blue: parseInt(result[3], 10),
    alpha: 1,
  };
}

function parseRGBA(inputString) {
  const regex = /rgba\((\d{1,3}), *(\d{1,3}), *(\d{1,3}), *(\d+[.\d]?\d*)\)/;
  const result = inputString.match(regex);
  return {
    red: parseInt(result[1], 10),
    green: parseInt(result[2], 10),
    blue: parseInt(result[3], 10),
    alpha: parseFloat(result[4], 10),
  };
}

function parseHexColor(inputString) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(inputString);
  return {
    red: parseInt(result[1], 16),
    green: parseInt(result[2], 16),
    blue: parseInt(result[3], 16),
    alpha: 1,
  };
}

export const getUnit = input => input.match(/([a-zA-Z]+|%)/)[0];

export const getVal = input => parseFloat(input.match(/^-?\d+(\.\d)?\d*/)[0]);

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
