const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/animol.js",
  output: {
    filename: "animol.min.js",
    path: path.resolve(__dirname, "dist"),
    library: "animol",
    libraryTarget: "umd",
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  devServer: {
    contentBase: path.resolve(__dirname, "demo"),
    compress: true,
    port: 9000,
  },
  // devtool: 'inline-source-map'
};
