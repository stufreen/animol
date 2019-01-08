import {
  parseColor,
  getUnit,
  getVal,
  parseMatrix,
} from '../parseCss';

describe('parseColor', () => {
  test('it can parse a proper rgb string', () => {
    const expected = {
      red: 1,
      green: 2,
      blue: 3,
      alpha: 1,
    };
    expect(parseColor('rgb(1, 2, 3)')).toEqual(expected);
    expect(parseColor('rgb(1,2,3)')).toEqual(expected);
    expect(parseColor('rgb(  1, 2,    3) ')).toEqual(expected);
  });

  test('it returns false if passed a malformed rgb string', () => {
    expect(parseColor('rgb(foobar)')).toBeFalsy();
    expect(parseColor('rgb')).toBeFalsy();
    expect(parseColor('rgbfoobar')).toBeFalsy();
    expect(parseColor('rgb(1.1,2, 3)')).toBeFalsy();
  });

  test('it can parse a proper rgba string', () => {
    const expected = {
      red: 1,
      green: 2,
      blue: 3,
      alpha: 0.5,
    };
    expect(parseColor('rgba(1, 2, 3, 0.5)')).toEqual(expected);
    expect(parseColor('rgba(1,2,3,0.5)')).toEqual(expected);
    expect(parseColor('rgba(  1, 2,    3, 0.5  ) ')).toEqual(expected);
    expect(parseColor('rgba(1, 2, 3, 1)')).toEqual({
      red: 1,
      green: 2,
      blue: 3,
      alpha: 1,
    });
  });

  test('it returns false if passed a malformed rgba string', () => {
    expect(parseColor('rgba(foobar)')).toBeFalsy();
    expect(parseColor('rgba')).toBeFalsy();
    expect(parseColor('rgbafoobar')).toBeFalsy();
    expect(parseColor('rgba(1.1,2, 3,2)')).toBeFalsy();
  });

  test('it can parse a proper hex value', () => {
    expect(parseColor('#001020')).toEqual({
      red: 0,
      green: 16,
      blue: 32,
      alpha: 1,
    });
    expect(parseColor('#000000')).toEqual({
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    });
    expect(parseColor('#FFFFFF')).toEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 1,
    });
    expect(parseColor('#ffffff')).toEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 1,
    });
  });

  test('it returns false if passed a malformed hex string', () => {
    expect(parseColor('#gggggg')).toBeFalsy();
    expect(parseColor('#')).toBeFalsy();
    expect(parseColor('#00000')).toBeFalsy();
    expect(parseColor('#0000000')).toBeFalsy();
  });
});

describe('getUnit', () => {
  test('it can parse the unit for proper css values', () => {
    expect(getUnit('10px')).toEqual('px');
    expect(getUnit('0.1px')).toEqual('px');
    expect(getUnit('10deg')).toEqual('deg');
    expect(getUnit('0deg')).toEqual('deg');
    expect(getUnit('0%')).toEqual('%');
  });

  test('it returns false if passed a malformed value', () => {
    expect(getUnit('')).toBeFalsy();
    expect(getUnit('10 10')).toBeFalsy();
    expect(getUnit('10')).toBeFalsy();
    expect(getUnit(10)).toBeFalsy();
  });
});

describe('getValue', () => {
  test('it can parse the value for proper css values', () => {
    expect(getVal('10px')).toEqual(10);
    expect(getVal('-10px')).toEqual(-10);
    expect(getVal('0.1px')).toEqual(0.1);
    expect(getVal('-0.1px')).toEqual(-0.1);
    expect(getVal('10deg')).toEqual(10);
    expect(getVal('0deg')).toEqual(0);
    expect(getVal('0%')).toEqual(0);
    expect(getVal('10 10')).toEqual(10);
    expect(getVal('10')).toEqual(10);
  });

  test('it returns false if passed a malformed value', () => {
    expect(getVal('')).toBeFalsy();
    expect(getVal(10)).toBeFalsy();
    expect(getVal('--10px')).toBeFalsy();
  });
});

describe('parseMatrix', () => {
  test('it can parse a well-formed matrix', () => {
    expect(parseMatrix('matrix(1, 0, 0, 1, 0, 0)')).toEqual([1, 0, 0, 1, 0, 0]);
    expect(parseMatrix('matrix(1,0,0,1,0,0)')).toEqual([1, 0, 0, 1, 0, 0]);
    expect(parseMatrix('matrix(1.1,0,0,1,0,0)')).toEqual([1.1, 0, 0, 1, 0, 0]);
    expect(parseMatrix('matrix(-1,0,0,1,0,0)')).toEqual([-1, 0, 0, 1, 0, 0]);
    expect(parseMatrix('matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0)'))
      .toEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0]);
  });

  test('it will use NaN for values that cannot be parsed to float', () => {
    expect(parseMatrix('matrix(a, 0, 0, 1, 0, 0)')[0]).toBeNaN();
    expect(parseMatrix('matrix(  , 0, 0, 1, 0, 0)')[0]).toBeNaN();
  });
});
