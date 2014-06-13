var webpack = require("webpack");

module.exports = {
  cache: true,
  entry: "./app.jsx",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  devtool: "inline-source-map",
  module: {
    loaders: [
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.jsx$/, loader: "jsx" }
    ]
  }
};
