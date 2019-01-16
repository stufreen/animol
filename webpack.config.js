const path = require('path');

module.exports = {
  entry: './src/animol.js',
  output: {
    filename: 'animol.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'animol',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'demo'),
    compress: true,
    port: 9000,
  },
};
