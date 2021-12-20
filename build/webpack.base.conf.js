/* eslint-disable linebreak-style */
const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
}
const PAGES = []
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
fs.readdirSync(path.resolve(__dirname, '../', 'src','pages')).forEach(
  (file) => {
    PAGES.push(file)
  }
)

const htmlPlugins = PAGES.map(
  (fileName) => new HtmlWebpackPlugin({
    filename: `${fileName}.html`,
    template: `src/pages/${fileName}/${fileName}.pug`,
    chunks: [fileName, 'index'],
    inject: 'body',
    minify: {
      collapseWhitespace: isProd,
    },
  })
)
const entry = () => {
  const point = {}
  PAGES.forEach((page) => {
    point[page] = path.resolve(__dirname, `../src/pages/${page}/${page}.js`)
  })

  return point
}

let publicPath = () => {
  return !isDev ? '/hotel/' : '/'
}

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: entry(),
  devtool: 'eval-cheap-source-map',
  output: {
    filename: `[name].js`,
    path: PATHS.dist,
    publicPath: publicPath(),
    assetModuleFilename: '[name].[ext]'
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
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type:'asset',
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type:'asset',

      },

      {
        test: /\.scss$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
         'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
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
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      Src: PATHS.src,
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/static`, to: '' },
      { from: `${PATHS.src}/fonts/`, to: `${PATHS.assets}fonts/` },
      { from: `${PATHS.src}/components/**/*.png`, to: `${PATHS.assets}img/[name].png` },
      { from: `${PATHS.src}/components/**/*.svg`, to: `${PATHS.assets}img/[name].svg` },
      { from: `${PATHS.src}/layout/*.svg`, to: `${PATHS.assets}img/[name].svg` },
      { from: `${PATHS.src}/pages/**/*.svg`, to: `${PATHS.assets}img/[name].svg` },
      { from: `${PATHS.src}/pages/**/*.png`, to: `${PATHS.assets}img/[name].png` }
    ]),

  ].concat(htmlPlugins),
}
