import { roundTo } from './math';
import { qrDec } from './qr-decompose';

function shallowCopy(ar) {
  var newAr = [];
  for (let i = 0; i < ar.length; i += 1 ) {
    newAr.push(ar[i]);
  }
  return newAr;
}

function getTranslate3D(matrix) {
  var translateX = matrix[12];
  var translateY = matrix[13];
  var translateZ = matrix[14];
  var newMatrix = shallowCopy(matrix);
  newMatrix[12] = 0;
  newMatrix[13] = 0;
  newMatrix[14] = 0;
  return {
    x: { unit: 'px', val: translateX },
    y: { unit: 'px', val: translateY },
    z: { unit: 'px', val: translateZ },
    matrix: newMatrix
  };
}
/*
function getScale3D(matrix) {
  // var scaleX = Math.sqrt(
  //   Math.pow(matrix[0], 2) + Math.pow(matrix[1], 2) + Math.pow(matrix[2], 2)
  // );
  // var scaleY = Math.sqrt(
  //   Math.pow(matrix[4], 2) + Math.pow(matrix[5], 2) + Math.pow(matrix[6], 2)
  // );
  // var scaleZ = Math.sqrt(
  //   Math.pow(matrix[8], 2) + Math.pow(matrix[9], 2) + Math.pow(matrix[10], 2)
  // );
  // var newMatrix = shallowCopy(matrix);
  // newMatrix[0] = matrix[0] / scaleX;
  // newMatrix[1] = matrix[1] / scaleX;
  // newMatrix[2] = matrix[2] / scaleX;
  // newMatrix[4] = matrix[4] / scaleY;
  // newMatrix[5] = matrix[5] / scaleY;
  // newMatrix[6] = matrix[6] / scaleY;
  // newMatrix[8] = matrix[8] / scaleZ;
  // newMatrix[9] = matrix[9] / scaleZ;
  // newMatrix[10] = matrix[10] / scaleZ;
  return {
    x: { unit: '', val: roundTo(matrix[0], 4) },
    y: { unit: '', val: roundTo(matrix[5], 4) },
    z: { unit: '', val: roundTo(matrix[10], 4) }
  };
}
*/

function noNegZero(num) {
  return (Object.is(num, -0) ? 0 : num);
}

function getRotate3D(values) {
  var x = Math.atan2(values[6], values[5]);
  var y = Math.atan2(values[8], values[0]);
  var z = Math.atan2(values[1], values[0]);
  return {
    x: { unit: 'rad', val: roundTo(noNegZero(x), 4) },
    y: { unit: 'rad', val: roundTo(noNegZero(y), 4) },
    z: { unit: 'rad', val: roundTo(noNegZero(z), 4) }
  };
}

function getSkew(matrix) {
  return {
    x: { unit: 'rad', val: Math.atan2(matrix[4], matrix[0]) },
    y: { unit: 'rad', val: Math.atan2(matrix[1], matrix[5]) }
  };
}

export var decomposeTransformMatrix3D = function (matrix) {
  var translate = getTranslate3D(matrix);
  var decomposed = qrDec(translate.matrix);
  console.log(decomposed);
  var rotate = getRotate3D(decomposed.q);
  var skew = getSkew(decomposed.r);
  return {
    translateX: translate.x,
    translateY: translate.y,
    translateZ: translate.z,
    scaleX: { unit: '', val: roundTo(decomposed.r[0], 4) },
    scaleY: { unit: '', val: roundTo(decomposed.r[5], 4) },
    scaleZ: { unit: '', val: roundTo(decomposed.r[10], 4) },
    rotateX: rotate.x,
    rotateY: rotate.y,
    rotateZ: rotate.z,
    skewX: skew.x,
    skewY: skew.y
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
