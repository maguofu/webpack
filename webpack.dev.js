const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  output: {
    // S使用 webpack-dev-middleware   开发模式   server.js和node server.js
    publicPath: '/',
    // E使用 webpack-dev-middleware   开发模式   server.js和node server.js
  },
  devtool: 'inline-source-map',

  // 使用观察模式  webpack --watch  build完成后需要手动刷新
  // S使用 webpack-dev-server  开发模式（常用方式）  webpack-dev-server --open
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  // E使用 webpack-dev-server  开发模式（常用方式）  webpack-dev-server --open
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
})