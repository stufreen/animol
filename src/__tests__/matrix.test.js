import { transformsFromMatrix3D, matrix2DTo3D } from '../matrix';

describe('transformsFromMatrix3D', () => {
  test('it should calculate 3D x translation in pixels', () => {
    const translateX2D = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      20, 0, 0, 1
    ];
    const result = transformsFromMatrix3D(translateX2D);
    expect(result.translateX).toEqual({ val: 20, unit: 'px' });
  });

  test('it should calculate 3D y translation in pixels', () => {
    const translateY2D = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 30, 0, 1
    ];
    const result = transformsFromMatrix3D(translateY2D);
    expect(result.translateY).toEqual({ val: 30, unit: 'px' });
  });

  test('it should calculate 3D z translation in pixels', () => {
    const translateZ2D = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 40, 1
    ];
    const result = transformsFromMatrix3D(translateZ2D);
    expect(result.translateZ).toEqual({ val: 40, unit: 'px' });
  });

  test('it should calculate 3D x scale', () => {
    const scaleX2D = [
      1.1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
    const result = transformsFromMatrix3D(scaleX2D);
    expect(result.scaleX).toEqual({ val: 1.1, unit: '' });
  });

  test('it should calculate 3D y scale', () => {
    const scaleY2D = [
      1, 0, 0, 0,
      0, 1.2, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
    const result = transformsFromMatrix3D(scaleY2D);
    expect(result.scaleY).toEqual({ val: 1.2, unit: '' });
  });

  test('it should calculate 3D z scale', () => {
    const scaleZ2D = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1.3, 0,
      0, 0, 0, 1
    ];
    const result = transformsFromMatrix3D(scaleZ2D);
    expect(result.scaleZ).toEqual({ val: 1.3, unit: '' });
  });

  test('it should calculate no rotation', () => {
    const identity = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
    const result = transformsFromMatrix3D(identity);
    expect(result.rotateX).toEqual({ val: 0, unit: 'rad' });
    expect(result.rotateY).toEqual({ val: 0, unit: 'rad' });
    expect(result.rotateZ).toEqual({ val: 0, unit: 'rad' });
  });

  test('it should calculate 3D x rotation', () => {
    const a = 1.1;
    const rotateX3D = [
      1, 0, 0, 0,
      0, Math.cos(a), Math.sin(a), 0,
      0, -Math.sin(a), Math.cos(a), 0,
      0, 0, 0, 1
    ];
    const result = transformsFromMatrix3D(rotateX3D);
    expect(result.rotateX).toEqual({ val: a, unit: 'rad' });
  });

  test('it should calculate 3D z rotation', () => {
    const a = 1.1;
    const rotateZ3D = [
      Math.cos(a), Math.sin(a), 0, 0,
      -Math.sin(a), Math.cos(a), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
    const result = transformsFromMatrix3D(rotateZ3D);
    expect(result.rotateZ).toEqual({ val: a, unit: 'rad' });
  });

  test('it should calculate 3D z rotation', () => {
    const a = 1.1;
    const rotateY3D = [
      Math.cos(a), 0, -Math.sin(a), 0,
      0, 1, 0, 0,
      Math.sin(a), 0, Math.cos(a), 0,
      0, 0, 0, 1
    ];
    const result = transformsFromMatrix3D(rotateY3D);
    expect(result.rotateY).toEqual({ val: a, unit: 'rad' });
  });
});

describe('matrix2Dto3D', () => {
  test('it can convert a 2D matrix to 3D correctly', () => {
    expect(matrix2DTo3D([1, 0, 0, 1, 0, 0])).toEqual([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 0]);
    expect(matrix2DTo3D([1.1, 0, 0, 1, 0, 0])).toEqual([
      1.1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 0]);
    expect(matrix2DTo3D([-1, 0, 0, 1, 0, 0])).toEqual([
      -1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 0]);
  });
});
