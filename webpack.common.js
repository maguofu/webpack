const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const glob = require("glob");

function entries() {
  let entryObj = {
    pageList: []
  };
  // 读取/src/pages/*/*.{js,ts}  即入口文件路径
  const PAGE_PATH = path.resolve(__dirname, './src/pages');
  const entryFiles = glob.sync(PAGE_PATH + '/*/*.{js,ts}', {
    ignore: PAGE_PATH + '/*/*.d.ts'
  })
  
  entryFiles.forEach((filePath) => {
    let name = filePath.split('/')[filePath.split('/').length - 2];
    entryObj.pageList.push({
      entry: `./${filePath.slice(filePath.indexOf('src'))}`,
      name: name,
    })
    console.log(`>>>>page is /${name}.html#/`)
  })
  return entryObj;
}
const pages = entries();
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
  resolve:{
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      '@utils': path.resolve(__dirname, 'utils/'),
    },
    extensions: ['.vue', '.tsx', '.ts', '.js']
  },
  plugins: [
    // 分离css
    new miniCssExtractPlugin({
      filename: 'static/css/[name].[hash:8].css',
    }),
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
        exclude: /node_modules/,
        use: [
          'vue-loader',
        ]
      },
      {
        test: /\.(ts|tsx)?$/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less|sass)$/,
        exclude: /node_modules/,
        use: [
          'vue-style-loader',
          'style-loader',
          miniCssExtractPlugin.loader,
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