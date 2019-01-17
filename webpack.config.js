const path = require('path');

module.exports = {
  entry: './src/animol.js',
  output: {
    filename: 'animol.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'animol',
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'demo'),
    compress: true,
    port: 9000
  }
};
