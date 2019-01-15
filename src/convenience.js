export const convenience = transformObj => Object.keys(transformObj)
  .reduce((accumulator, key) => {
    if (key === 'rotate') {
      return {
        ...accumulator,
        rotateZ: transformObj[key],
      };
    }
    return {
      ...accumulator,
      [key]: transformObj[key],
    };
  }, {});
