function getTranslate3D(matrix) {
  const translateX = matrix[9];
  const translateY = matrix[10];
  const translateZ = matrix[11];
  const newMatrix = matrix.slice();
  newMatrix[9] = 0;
  newMatrix[10] = 0;
  newMatrix[11] = 0;
  return {
    x: { key: 'translateX', unit: 'px', val: translateX },
    y: { key: 'translateY', unit: 'px', val: translateY },
    z: { key: 'translateZ', unit: 'px', val: translateZ },
    matrix: newMatrix,
  };
}

function getScale3D(matrix) {
  const scaleX = Math.sqrt(Math.pow(matrix[0], 2) + Math.pow(matrix[1], 2) + Math.pow(matrix[2], 2));
  const scaleY = Math.sqrt(Math.pow(matrix[3], 2) + Math.pow(matrix[4], 2) + Math.pow(matrix[5], 2));
  const scaleZ = Math.sqrt(Math.pow(matrix[6], 2) + Math.pow(matrix[7], 2) + Math.pow(matrix[8], 2));
  const newMatrix = matrix.slice();
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
    matrix: newMatrix,
  };
}

const noNegZero = num => (Object.is(num, -0) ? 0 : num);

function getRotate3D(matrix) {
  const beta = Math.atan2(
    -1 * matrix[2],
    Math.sqrt(Math.pow(matrix[0], 2) + Math.pow(matrix[1], 2))
  );
  const alpha = Math.atan2(matrix[5] / Math.cos(beta), matrix[8] / Math.cos(beta));
  const gamma = Math.atan2(matrix[1] / Math.cos(beta), matrix[0] / Math.cos(beta));
  const newMatrix = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
    0, 0, 0,
  ];
  return {
    x: { key: 'rotateX', unit: 'rad', val: noNegZero(alpha) },
    y: { key: 'rotateY', unit: 'rad', val: noNegZero(beta) },
    z: { key: 'rotateZ', unit: 'rad', val: noNegZero(gamma) },
    matrix: newMatrix,
  };
}

// TO DO: Allow skew as well
export const decomposeTransformMatrix3D = (matrix) => {
  const translate = getTranslate3D(matrix);
  const scale = getScale3D(translate.matrix);
  const rotate = getRotate3D(scale.matrix);
  return [
    translate.x,
    translate.y,
    translate.z,
    scale.x,
    scale.y,
    scale.z,
    rotate.x,
    rotate.y,
    rotate.z,
  ];
};

export const matrix2DTo3D = m => [
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
  0,
];
