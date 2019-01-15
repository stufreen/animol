import { convenience } from '../convenience';

describe('reverseConvenienceTransforms', () => {
  test('it should do nothing if all good', () => {
    const input = { translateX: '200px' };
    expect(convenience(input)).toEqual(input);
  });

  test('it should convert rotate to rotateZ', () => {
    const input = { rotate: '1rad' };
    expect(convenience(input)).toEqual({ rotateZ: '1rad' });
  });
});
