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
fs.readdirSync(path.resolve(__dirname, '../', 'src', 'pug', 'pages')).forEach(
  (file) => {
    PAGES.push(file)
  }
)

const htmlPlugins = PAGES.map(
  (fileName) => new HtmlWebpackPlugin({
    filename: `${fileName}.html`,
    template: `src/pug/pages/${fileName}/${fileName}.pug`,
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
    point[page] = path.resolve(__dirname, `../src/pug/pages/${page}/${page}.js`)
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
  devtool: 'inline-source-map',
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
      { from: `${PATHS.src}/pug/components/**/*.png`, to: `${PATHS.assets}img/[name].[ext]` },
      { from: `${PATHS.src}/pug/components/**/*.svg`, to: `${PATHS.assets}img/[name].[ext]` },
      { from: `${PATHS.src}/pug/layout/*.svg`, to: `${PATHS.assets}img/[name].[ext]` },
      { from: `${PATHS.src}/pug/pages/**/*.svg`, to: `${PATHS.assets}img/[name].[ext]` },
      { from: `${PATHS.src}/pug/pages/**/*.png`, to: `${PATHS.assets}img/[name].[ext]` }

    ]),

  ].concat(htmlPlugins),
}
