import {
  interpolate,
  calculateVal,
  calculateColor,
  calculateTransform
} from '../interpolate';

const linear = t => t;

describe('interpolate', () => {
  test('it should return 0 when currentTime is same as startTime', () => {
    expect(interpolate(0, 1, 0, linear)).toEqual(0);
    expect(interpolate(10, 20, 10, linear)).toEqual(0);
  });

  test('it should return 1 when currentTime is same as endTime', () => {
    expect(interpolate(0, 1, 1, linear)).toEqual(1);
    expect(interpolate(10, 20, 20, linear)).toEqual(1);
  });

  test('it should return 0.5 when currentTime is halfway between', () => {
    expect(interpolate(0, 1, 0.5, linear)).toEqual(0.5);
    expect(interpolate(10, 20, 15, linear)).toEqual(0.5);
  });

  test('it should return 0 if currentTime is before startTime', () => {
    expect(interpolate(1, 2, 0, linear)).toEqual(0);
  });
});

describe('calculateVal', () => {
  test('it should return startVal if progress is 0', () => {
    expect(calculateVal(100, 200, 0)).toEqual(100);
  });

  test('it should return endVal if progress is 1', () => {
    expect(calculateVal(100, 200, 1)).toEqual(200);
  });

  test('it should return halfway between if progress is 0.5', () => {
    expect(calculateVal(100, 200, 0.5)).toEqual(150);
  });
});

describe('calculateColor', () => {
  const red = [255, 0, 0, 0.4];
  const blue = [0, 255, 0, 0.6];
  test('it should return startVal if progress is 0', () => {
    expect(calculateColor(red, blue, 0)).toEqual(red);
  });

  test('it should return endVal if progress is 1', () => {
    expect(calculateColor(red, blue, 1)).toEqual(blue);
  });

  test('it should return halfway between if progress is 0.5', () => {
    expect(calculateColor(red, blue, 0.5)).toEqual([128, 128, 0, 0.5]);
  });
});

describe('calculateTransform', () => {
  const startList = { translateX: { unit: 'px', val: 100 }, translateY: { unit: 'px', val: 300 } };
  const endList = { translateX: { unit: 'px', val: 200 }, translateY: { unit: 'px', val: 400 } };
  test('it should return startVal if progress is 0', () => {
    expect(calculateTransform(startList, endList, 0)).toEqual({ translateX: '100px', translateY: '300px' });
  });

  test('it should return endVal if progress is 1', () => {
    expect(calculateTransform(startList, endList, 1)).toEqual({ translateX: '200px', translateY: '400px' });
  });

  test('it should return halfway between if progress is 0.5', () => {
    expect(calculateTransform(startList, endList, 0.5)).toEqual({ translateX: '150px', translateY: '350px' });
  });
});
