const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const proxy = {
  '/test/*': {
    target: 'http://yapi.afpai.com/mock/768', // 源地址
    changeOrigin: true, // 改变源
    ws: true,
    pathRewrite: {
      '^/api': ''
    }
  },
};

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
    contentBase: './src',
    hot: true,
    proxy: proxy
  },
  // E使用 webpack-dev-server  开发模式（常用方式）  webpack-dev-server --open
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
})