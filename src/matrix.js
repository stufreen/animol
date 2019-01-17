function shallowCopy(ar) {
  var newAr = [];
  for (let i = 0; i < ar.length; i += 1 ) {
    newAr.push(ar[i]);
  }
  return newAr;
}

function getTranslate3D(matrix) {
  var translateX = matrix[9];
  var translateY = matrix[10];
  var translateZ = matrix[11];
  var newMatrix = shallowCopy(matrix);
  newMatrix[9] = 0;
  newMatrix[10] = 0;
  newMatrix[11] = 0;
  return {
    x: { key: 'translateX', unit: 'px', val: translateX },
    y: { key: 'translateY', unit: 'px', val: translateY },
    z: { key: 'translateZ', unit: 'px', val: translateZ },
    matrix: newMatrix
  };
}

function getScale3D(matrix) {
  var scaleX = Math.sqrt(
    Math.pow(matrix[0], 2) + Math.pow(matrix[1], 2) + Math.pow(matrix[2], 2)
  );
  var scaleY = Math.sqrt(
    Math.pow(matrix[3], 2) + Math.pow(matrix[4], 2) + Math.pow(matrix[5], 2)
  );
  var scaleZ = Math.sqrt(
    Math.pow(matrix[6], 2) + Math.pow(matrix[7], 2) + Math.pow(matrix[8], 2)
  );
  var newMatrix = shallowCopy(matrix);
  newMatrix[0] = matrix[0] / scaleX;
  newMatrix[1] = matrix[1] / scaleX;
  newMatrix[2] = matrix[2] / scaleX;
  newMatrix[3] = matrix[3] / scaleY;
  newMatrix[4] = matrix[4] / scaleY;
  newMatrix[5] = matrix[5] / scaleY;
  newMatrix[6] = matrix[6] / scaleZ;
  newMatrix[7] = matrix[7] / scaleZ;
  newMatrix[8] = matrix[8] / scaleZ;
  return {
    x: { key: 'scaleX', unit: '', val: scaleX },
    y: { key: 'scaleY', unit: '', val: scaleY },
    z: { key: 'scaleZ', unit: '', val: scaleZ },
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
  var alpha = Math.atan2(matrix[5] / Math.cos(beta), matrix[8] / Math.cos(beta));
  var gamma = Math.atan2(matrix[1] / Math.cos(beta), matrix[0] / Math.cos(beta));
  var newMatrix = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
    0, 0, 0
  ];
  return {
    x: { key: 'rotateX', unit: 'rad', val: noNegZero(alpha) },
    y: { key: 'rotateY', unit: 'rad', val: noNegZero(beta) },
    z: { key: 'rotateZ', unit: 'rad', val: noNegZero(gamma) },
    matrix: newMatrix
  };
}

// TO DO: Allow skew as well
export var decomposeTransformMatrix3D = function (matrix) {
  var translate = getTranslate3D(matrix);
  var scale = getScale3D(translate.matrix);
  var rotate = getRotate3D(scale.matrix);
  return [
    translate.x,
    translate.y,
    translate.z,
    scale.x,
    scale.y,
    scale.z,
    rotate.x,
    rotate.y,
    rotate.z
  ];
};

export var matrix2DTo3D = function (m) {
  return [
    m[0],
    m[1],
    0,
    m[2],
    m[3],
    0,
    0,
    0,
    1,
    m[4],
    m[5],
    0
  ];
};
