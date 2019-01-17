export var convenience = function (oldObj) {
  var newObj = {};
  Object.keys(oldObj).forEach((key) => {
    if (key === 'rotate') {
      newObj.rotateZ = oldObj[key];
    } else {
      newObj[key] = oldObj[key];
    }
  });
  return newObj;
};
