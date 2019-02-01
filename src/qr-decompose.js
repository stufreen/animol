var dot = function (a, b) {
  var s = 0;
  for (var i in a) {
    s += a[i] * b[i];
  }
  return s;
};

export const qrDec = function (matrix) { // QR−decomposition A=QR of matrix A
  // Turn matrix into 2D array
  var A = [];
  for (var y = 0; y < 4; y++) {
    A[y] = [];
    for (var x = 0; x < 4; x++) {
      A[y][x] = matrix[(y * 4) + x];
    }
  }
  A[3][3] = 1;

  var m = A.length;

  var R = [];
  for (var y = 0; y < A.length; y++) {
    R[y] = [];
    for (var x = 0; x < A[y].length; x++) {
      R[y][x] = 0;
    }
  }

  var Q = [];
  for (var y = 0; y < A.length; y++) {
    Q[y] = [];
    for (var x = 0; x < A[y].length; x++) {
      Q[y][x] = A[y][x];
    }
  }

  for (var i = 0; i < m; i++) {
    var e = Q[i];
    var r = Math.sqrt(dot(e, e));
    if (r === 0) {
      throw "qrdec: singular matrix";
    }
    R[i][i] = r;

    for (var k in e) {
      e[k] /= r; // normalization
    }

    for (var j = i + 1; j < m; j++) {
      var q = Q[j];
      var s = dot(e, q);
      for (var k in q) {
        q[k] -= s * e[k]; // orthogonalization
      }
      R[j][i] = s;
    }
  }

  return {
    q: Q[0].concat(Q[1], Q[2], Q[3]),
    r: R[0].concat(R[1], R[2], R[3])
  };
};
