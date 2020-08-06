const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// VueLoaderPlugin配合vue-loader@15*版本使用
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const glob = require("glob");
// happy使用时  vue-loader@15*版本报错  降级14x版本  不需要vue-loader的VueLoaderPlugin配合使用
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

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

const baseConfig = {
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
    // new VueLoaderPlugin(),
    new HappyPack({
      id: 'jsx',
      threadPool: happyThreadPool,
      loaders: [ 'babel-loader' ]
    }),
    new HappyPack({
      id: 'vue',
      threadPool: happyThreadPool,
      loaders: [ 
        {
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ExtractTextPlugin.extract({
                use: [
                  {
                    loader: 'happypack/loader?id=css',
                  },
                ],
                fallback: 'vue-style-loader'
              }),
              less: ExtractTextPlugin.extract({
                use: [
                  'happypack/loader?id=css',
                  'happypack/loader?id=less',
                ],
                fallback: 'vue-style-loader'
              }),
              js: 'happypack/loader?id=jsx'
            },
         }
        }
       ]
    }),
    new HappyPack({
      id: 'styles',
      threadPool: happyThreadPool,
      loaders: [ 'style-loader', 'css-loader', 'less-loader' ]
    }),
  ].concat(getHtmls()),
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          },
          'happypack/loader?id=jsx',
        ]
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          'vue-loader',
          'happypack/loader?id=vue',
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
        test: /\.less$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=styles'
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

module.exports = baseConfig;