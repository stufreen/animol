function getTranslateX2D(matrix) {
  const translateX = matrix[4];
  const newMatrix = matrix.slice();
  newMatrix[4] = 0;
  return {
    transform: { key: 'translateX', unit: 'px', val: translateX },
    matrix: newMatrix,
  };
}

function getTranslateY2D(matrix) {
  const translateY = matrix[5];
  const newMatrix = matrix.slice();
  newMatrix[5] = 0;
  return {
    transform: { key: 'translateY', unit: 'px', val: translateY },
    matrix: newMatrix,
  };
}

function getScaleX2D(matrix) {
  const scaleX = Math.sqrt((matrix[0] ** 2) + (matrix[1] ** 2));
  const newMatrix = matrix.slice();
  newMatrix[0] = matrix[0] / scaleX;
  newMatrix[1] = matrix[1] / scaleX;
  return {
    transform: { key: 'scaleX', unit: '', val: scaleX },
    matrix: newMatrix,
  };
}

function getScaleY2D(matrix) {
  const scaleY = Math.sqrt((matrix[2] ** 2) + (matrix[3] ** 2));
  const newMatrix = matrix.slice();
  newMatrix[2] = matrix[2] / scaleY;
  newMatrix[3] = matrix[3] / scaleY;
  return {
    transform: { key: 'scaleY', unit: '', val: scaleY },
    matrix: newMatrix,
  };
}

function getRotate2D(matrix) {
  const angle = Math.atan2(matrix[1], matrix[0]);
  const newMatrix = [1, 0, 0, 1, 0, 0];
  return {
    transform: { key: 'rotate', unit: 'rad', val: angle },
    matrix: newMatrix,
  };
}

export const decomposeTransformMatrix2D = (matrix) => {
  const translateX = getTranslateX2D(matrix);
  const translateY = getTranslateY2D(translateX.matrix);
  const scaleX = getScaleX2D(translateY.matrix);
  const scaleY = getScaleY2D(scaleX.matrix);
  const rotate = getRotate2D(scaleY.matrix);
  return [
    translateX.transform,
    translateY.transform,
    scaleX.transform,
    scaleY.transform,
    rotate.transform,
  ];
};
