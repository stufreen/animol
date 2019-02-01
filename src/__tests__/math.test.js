import { roundTo } from '../math';

describe('roundTo', () => {
  test('it should round to 3 decimal points', () => {
    const result = roundTo(0.12345, 3);
    expect(result).toEqual(0.123);
  });

  test('it should leave numbers as-is if ther are shorter than precision', () => {
    const result = roundTo(0.12345, 6);
    expect(result).toEqual(0.12345);
  });
});
