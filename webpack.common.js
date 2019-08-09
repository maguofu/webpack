const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const pages = require('./page');
// S获取入口map
let entryMap = {};
pages.pageList.map((item) => {
  let name = item.name;
  let entry = item.entry;
  entryMap[name] = entry;
  return
});
// E获取入口map

// S输出HTML文件  // 生成build的HTML文件
function getHtmls() {
  return pages.pageList.reduce((pre, cur)=>{
    let tempArr = [
      new HtmlWebpackPlugin({
        template: './publish/template.html',
        filename: `${cur.name}.html`,
        // chunks: [`${cur.name}`, 'commons']
        chunks: [`${cur.name}`]
      })
    ]
    return pre.concat(tempArr);
  }, [])
}
// E输出HTML文件  // 生成build的HTML文件

module.exports = {
  entry: {
    ...entryMap
  },
  output: {
    filename: 'static/js/[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  // 防止重复，提出公共模块
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         name: 'commons',
  //         chunks: "initial",
  //         minChunks: 2
  //       }
  //     }
  //   }
  // },
  plugins: [
    // 分离css
    new miniCssExtractPlugin({
        filename: '[name].[hash:8].css',
    }),
    // 删除build之后的文件夹内容
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ].concat(getHtmls()),
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: [{
          loader: 'babel-loader',
          options: {
             presets: ['es2015']
          }
        }]
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.(css|less|sass)$/,
        use: [
          'vue-style-loader',
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
            name: './static/images/[name].[hash:8].[ext]',
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