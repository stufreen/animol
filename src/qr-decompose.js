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

  // var R=[[0 for ( i in A) ] for ( j in A)];
  var R = [];
  for (var y = 0; y < A.length; y++) {
    R[y] = [];
    for (var x = 0; x < A[y].length; x++) {
      R[y][x] = 0;
    }
  }

  // var Q=[[A[ i ] [ j ] for (j in A[ 0 ] )] for ( i in A) ] ; //Q i s a copy of A
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

/*
var identity = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
var translate = [[1, 0, 0], [0, 1, 0], [30, 30, 1]];
var oneRad = [[0.540302, 0.841471, 0], [-0.841471, 0.540302, 0], [0, 0, 1]]
var rotAndSkew = [[0.540302, 0.841471, 0], [0, 1.85082, 0], [0, 0, 1]]

var result = qrdec(rotAndSkew);

var Q = result.q;
var R = result.r;

console.log(result);
console.log('Rotation:', Math.atan2(Q[0][1], Q[0][0]));
console.log('Shear:', Math.atan(R[1][0]));
*/
