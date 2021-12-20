const webpack = require('webpack')
const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const WebpackDevServer=require('webpack-dev-server')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: {
    open: true,
    static:{
      directory:baseWebpackConfig.externals.paths.dist
    },
    port: 8081,
    client: {
      overlay: true,
      reconnect: 5,
    },

  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],
})
const mod = new Promise((resolve, reject) => {
  resolve(baseWebpackConfig)
})
mod.then((v) => console.log(v))
module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
