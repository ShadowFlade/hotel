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

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
