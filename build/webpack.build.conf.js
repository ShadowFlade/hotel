const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [],
})
const mod = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
mod.then((v) => console.log(v))
module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
