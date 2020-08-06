
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const common = require('./webpack.common.js');
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(merge(common, {
  mode: 'production',
  plugins: [
    // 删除build之后的文件夹内容
    new CleanWebpackPlugin(),
    // 压缩js
    new UglifyJSPlugin(),
    // 压缩css
    new optimizeCss(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}));