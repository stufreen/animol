export var convenience = function (oldObj) {
  oldObj = oldObj || {};
  var newObj = {};
  Object.keys(oldObj).forEach(function (key) {
    if (key === 'rotate') {
      newObj.rotateZ = oldObj[key];
    } else {
      newObj[key] = oldObj[key];
    }
  });
  return newObj;
};
