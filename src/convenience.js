export const convenience = transformObj => Object.keys(transformObj)
  .reduce((accumulator, key) => {
    if (key === 'rotate') {
      return Object.assign({ rotateZ: transformObj[key] }, accumulator);
    }
    return Object.assign({ [key]: transformObj[key] }, accumulator);
  }, {});
