const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD config
  mode: 'production',
  plugins: [],
  // output: {
  //   filename: `[name].js`,
  //   path: PATHS.dist,
  //   publicPath: '/metalamp',
  // },
})
const mod = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
mod.then((v) => console.log(v))
module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
