const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
}

const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = []
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
fs.readdirSync(path.resolve(__dirname, '../', 'src', 'pug', 'pages')).forEach(
  (file) => {
    PAGES.push(file)
  }
)
const htmlPlugins = PAGES.map(
  (fileName) =>
    new HtmlWebpackPlugin({
      filename: `${fileName}.html`,
      template: `src/pug/pages/${fileName}/${fileName}.pug`,
      chunks: [fileName, 'index'],
      inject: 'body',
      minify: {
        collapseWhitespace: isProd,
        // collapseWhitespace: false
      },
    })
)
const entry = () => {
  const point = {}
  PAGES.forEach((page) => {
    point[page] = path.resolve(__dirname, `../src/pug/pages/${page}/${page}.js`)
  })

  return point
}
// let publicPath = () => {
//   if (!isDev) {
//     return '/metalamp/'
//   } else {
//     return '/'
//   }
// }
let publicPath = () => {
  return !isDev ? '/metalamp/' : '/'
}

module.exports = {
  // BASE config
  externals: {
    paths: PATHS,
  },
  entry: entry(),
  output: {
    filename: `[name].js`,
    path: PATHS.dist,
    publicPath: publicPath(),
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        oneOf: [
          {
            use: ['pug-loader'],
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: { path: `./postcss.config.js` },
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: { path: `./postcss.config.js` },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      // ~Img: path.resolve(__dirname, '../src/assets/img'),
      Src: PATHS.src,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
      { from: `${PATHS.src}/static`, to: '' },
    ]),
  ].concat(htmlPlugins),
}
