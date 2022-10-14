'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'app.bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  module: {
      rules: [
          {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', { targets: "defaults" }],
                        ["@babel/preset-react"]
                    ]
                }
              },
          }
      ]
  },
  stats: {
      colors: true
  },
  devtool: 'source-map'
};
