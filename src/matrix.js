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

function getScale3D(matrix) {
  var scaleX = Math.sqrt(
    Math.pow(matrix[0], 2) + Math.pow(matrix[1], 2) + Math.pow(matrix[2], 2)
  );
  var scaleY = Math.sqrt(
    Math.pow(matrix[4], 2) + Math.pow(matrix[5], 2) + Math.pow(matrix[6], 2)
  );
  var scaleZ = Math.sqrt(
    Math.pow(matrix[8], 2) + Math.pow(matrix[9], 2) + Math.pow(matrix[10], 2)
  );
  var newMatrix = shallowCopy(matrix);
  newMatrix[0] = matrix[0] / scaleX;
  newMatrix[1] = matrix[1] / scaleX;
  newMatrix[2] = matrix[2] / scaleX;
  newMatrix[4] = matrix[4] / scaleY;
  newMatrix[5] = matrix[5] / scaleY;
  newMatrix[6] = matrix[6] / scaleY;
  newMatrix[8] = matrix[8] / scaleZ;
  newMatrix[9] = matrix[9] / scaleZ;
  newMatrix[10] = matrix[10] / scaleZ;
  return {
    x: { unit: '', val: scaleX },
    y: { unit: '', val: scaleY },
    z: { unit: '', val: scaleZ },
    matrix: newMatrix
  };
}

function noNegZero(num) {
  return (Object.is(num, -0) ? 0 : num);
}

function getRotate3D(matrix) {
  var beta = Math.atan2(
    -1 * matrix[2],
    Math.sqrt(Math.pow(matrix[0], 2) + Math.pow(matrix[1], 2))
  );
  var alpha = Math.atan2(matrix[6] / Math.cos(beta), matrix[10] / Math.cos(beta));
  var gamma = Math.atan2(matrix[1] / Math.cos(beta), matrix[0] / Math.cos(beta));
  var newMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
  return {
    x: { unit: 'rad', val: noNegZero(alpha) },
    y: { unit: 'rad', val: noNegZero(beta) },
    z: { unit: 'rad', val: noNegZero(gamma) },
    matrix: newMatrix
  };
}

// TO DO: Allow skew as well
export var decomposeTransformMatrix3D = function (matrix) {
  var translate = getTranslate3D(matrix);
  var scale = getScale3D(translate.matrix);
  var rotate = getRotate3D(scale.matrix);
  return {
    translateX: translate.x,
    translateY: translate.y,
    translateZ: translate.z,
    scaleX: scale.x,
    scaleY: scale.y,
    scaleZ: scale.z,
    rotateX: rotate.x,
    rotateY: rotate.y,
    rotateZ: rotate.z
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
