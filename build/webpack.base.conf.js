const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

// Main const
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#main-const
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
}

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
// const PAGES_DIR = PATHS.src
const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = []
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
fs.readdirSync(path.resolve(__dirname, '../', 'src', 'pug', 'pages')).forEach(
  (file) => {
    PAGES.push(file.split('/', 2))
  }
)
const htmlPlugins = PAGES.map(
  (fileName) =>
    new HtmlWebpackPlugin({
      filename: `${fileName}.html`,
      template: `src/pug/pages/${fileName}/${fileName}.pug`,
      minify: {
        collapseWhitespace: isProd,
        // collapseWhitespace: false
        chunks: [fileName, 'index'],
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
module.exports = {
  // BASE config
  externals: {
    paths: PATHS,
  },
  entry: entry(),
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: '/',
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     minSize: 1,
  //     minChunks: 2,
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.pug$/,
        oneOf: [
          // this applies to <template lang="pug"> in Vue components

          // this applies to pug imports inside JavaScript
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
    // new HtmlWebpackPugPlugin({
    //   adjustIndent: true,
    // }),

    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
      { from: `${PATHS.src}/static`, to: '' },
    ]),

    // Automatic creation any html pages (Don't forget to RERUN dev server)
    // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
    // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
  ].concat(htmlPlugins),
}
