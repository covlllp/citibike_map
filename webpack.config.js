var path = require('path');
var webpack = require('webpack');

var entryPath = './src/js/main.jsx';
var jsPath = path.join(__dirname, 'src', 'js');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
  },
  entry: entryPath,
  output: {
    path: path.join(__dirname, 'static'),
    publicPath: '/static/',
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/data': 'http://localhost:3000',
    },
  },
  module: {
    loaders: [
      {
        test: jsPath,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
