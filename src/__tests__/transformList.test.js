import { IDENTITY, inferTransforms, buildFromToList } from '../transformList';

window.getComputedStyle = jest.fn().mockImplementation(() => {
  return {
    transform: 'matrix(1, 0, 0, 1, 0, 0)',
    height: '0px',
    width: '0px'
  };
});

describe('inferTransforms', () => {
  test('it should infer a transform list', () => {
    expect(inferTransforms('foo')).toEqual(IDENTITY);
  });
});

describe('buildFromToList', () => {
  const fromList = { height: '0px', width: '0rem' };
  const toList = { height: '100px', width: '100rem' };
  const fromListTransform = { transform: { rotateZ: '0rad' } };
  const toListTransform = { transform: { rotateZ: '1rad' } };

  test('it should return a fromToList', () => {
    expect(buildFromToList(null, fromList, toList)).toEqual([
      {
        fromVal: 0,
        key: 'height',
        toVal: 100,
        unit: 'px'
      },
      {
        fromVal: 0,
        key: 'width',
        toVal: 100,
        unit: 'rem'
      }
    ]);
  });

  test('it should infer from values if fromList is empty', () => {
    expect(buildFromToList(null, {}, toList)).toEqual([
      {
        fromVal: 0,
        key: 'height',
        toVal: 100,
        unit: 'px'
      },
      {
        fromVal: 0,
        key: 'width',
        toVal: 100,
        unit: 'rem'
      }
    ]);
  });

  test('it should infer to values if toList is empty', () => {
    expect(buildFromToList(null, toList, {})).toEqual([
      {
        fromVal: 100,
        key: 'height',
        toVal: 0,
        unit: 'px'
      },
      {
        fromVal: 100,
        key: 'width',
        toVal: 0,
        unit: 'rem'
      }
    ]);
  });

  test('it should handle transform objects', () => {
    expect(buildFromToList(null, fromListTransform, toListTransform)).toEqual([
      {
        fromVal: [{
          key: 'rotateZ',
          unit: 'rad',
          val: 0
        }],
        key: 'transform',
        toVal: [{
          key: 'rotateZ',
          unit: 'rad',
          val: 1
        }],
        unit: 'transformList'
      },
    ]);
  });
});
