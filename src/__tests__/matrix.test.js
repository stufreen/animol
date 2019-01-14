import { decomposeTransformMatrix3D } from '../matrix';

describe('decomposeTransformMatrix3D', () => {
  test('it should calculate 3D x translation in pixels', () => {
    const translateX2D = [1, 0, 0, 0, 1, 0, 0, 0, 1, 20, 0, 0];
    const result = decomposeTransformMatrix3D(translateX2D);
    expect(result[0]).toEqual({ key: 'translateX', val: 20, unit: 'px' });
  });

  test('it should calculate 3D y translation in pixels', () => {
    const translateY2D = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 30, 0];
    const result = decomposeTransformMatrix3D(translateY2D);
    expect(result[1]).toEqual({ key: 'translateY', val: 30, unit: 'px' });
  });

  test('it should calculate 3D z translation in pixels', () => {
    const translateY2D = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 40];
    const result = decomposeTransformMatrix3D(translateY2D);
    expect(result[2]).toEqual({ key: 'translateZ', val: 40, unit: 'px' });
  });

  test('it should calculate 3D x scale', () => {
    const scaleX2D = [1.1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
    const result = decomposeTransformMatrix3D(scaleX2D);
    expect(result[3]).toEqual({ key: 'scaleX', val: 1.1, unit: '' });
  });

  test('it should calculate 3D y scale', () => {
    const scaleX2D = [1, 0, 0, 0, 1.2, 0, 0, 0, 1, 0, 0, 0];
    const result = decomposeTransformMatrix3D(scaleX2D);
    expect(result[4]).toEqual({ key: 'scaleY', val: 1.2, unit: '' });
  });

  test('it should calculate 3D z scale', () => {
    const scaleX2D = [1, 0, 0, 0, 1, 0, 0, 0, 1.3, 0, 0, 0];
    const result = decomposeTransformMatrix3D(scaleX2D);
    expect(result[5]).toEqual({ key: 'scaleZ', val: 1.3, unit: '' });
  });

  test('it should calculate no rotation', () => {
    const identity = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
    const result = decomposeTransformMatrix3D(identity);
    expect(result[6]).toEqual({ key: 'rotateX', val: 0, unit: 'rad' });
    expect(result[7]).toEqual({ key: 'rotateY', val: 0, unit: 'rad' });
    expect(result[8]).toEqual({ key: 'rotateZ', val: 0, unit: 'rad' });
  });

  test('it should calculate 3D x rotation', () => {
    const a = 1.1;
    const rotateX3D = [1, 0, 0, 0, Math.cos(a), Math.sin(a), 0, -1 * Math.sin(a), Math.cos(a), 0, 0, 0];
    const result = decomposeTransformMatrix3D(rotateX3D);
    expect(result[6]).toEqual({ key: 'rotateX', val: a, unit: 'rad' });
  });

  test('it should calculate 3D y rotation', () => {
    const a = 1.2;
    const rotateY3D = [Math.cos(a), 0, -1 * Math.sin(a), 0, 1, 0, Math.sin(a), 0, Math.cos(a), 0, 0, 0];
    const result = decomposeTransformMatrix3D(rotateY3D);
    expect(result[7]).toEqual({ key: 'rotateY', val: a, unit: 'rad' });
  });

  test('it should calculate 3D z rotation', () => {
    const a = 1.3;
    const rotateZ3D = [Math.cos(a), Math.sin(a), 0, -1 * Math.sin(a), Math.cos(a), 0, 0, 0, 1, 0, 0, 0];
    const result = decomposeTransformMatrix3D(rotateZ3D);
    expect(result[8]).toEqual({ key: 'rotateZ', val: a, unit: 'rad' });
  });
});
