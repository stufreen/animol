const path = require('path');

module.exports = {
  entry: './src/animol.js',
  output: {
    filename: 'animol.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'animol',
  },
};
