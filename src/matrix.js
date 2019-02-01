import { roundTo } from './math';
import { qrDec } from './qr-decompose';

function noNegZero(num) {
  return (Object.is(num, -0) ? 0 : num);
}

export var decomposeTransformMatrix3D = function (matrix) {
  var dec = qrDec(matrix);
  return {
    translateX: { unit: 'px', val: roundTo(matrix[12], 4) },
    translateY: { unit: 'px', val: roundTo(matrix[13], 4) },
    translateZ: { unit: 'px', val: roundTo(matrix[14], 4) },
    scaleX: { unit: '', val: roundTo(dec.r[0], 4) },
    scaleY: { unit: '', val: roundTo(dec.r[5], 4) },
    scaleZ: { unit: '', val: roundTo(dec.r[10], 4) },
    rotateX: { unit: 'rad', val: roundTo(noNegZero(Math.atan2(dec.q[6], dec.q[5])), 4) },
    rotateY: { unit: 'rad', val: roundTo(noNegZero(Math.atan2(dec.q[8], dec.q[0])), 4) },
    rotateZ: { unit: 'rad', val: roundTo(noNegZero(Math.atan2(dec.q[1], dec.q[0])), 4) },
    skewX: { unit: 'rad', val: roundTo(Math.atan2(dec.r[4], dec.r[0]), 4) },
    skewY: { unit: 'rad', val: roundTo(Math.atan2(dec.r[1], dec.r[5]), 4) }
  };
};

export var matrix2DTo3D = function (m) {
  return [
    m[0],
    m[1],
    0,
    0,
    m[2],
    m[3],
    0,
    0,
    0,
    0,
    1,
    0,
    m[4],
    m[5],
    0,
    0
  ];
};
