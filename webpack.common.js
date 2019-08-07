const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: 'static/js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  // 防止重复，提出公共模块
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new miniCssExtractPlugin({
        filename: 'static/css/[name].[hash].css'
    }),
    // 分离css
    new ExtractTextPlugin({
      filename: 'static/css/[name].[hash].css',
    }),
    // 删除build之后的文件夹内容
    new CleanWebpackPlugin(),
    // 生成build的HTML文件
    new HtmlWebpackPlugin({
      // filename: '[name].html',
    })
  ],
  module: {
    rules: [
      {
        test: /\.(css|less|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './static/images/[name].[hash].[ext]',
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  }
};