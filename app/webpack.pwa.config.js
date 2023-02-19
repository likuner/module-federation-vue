const { merge } = require('webpack-merge')
const WorkboxPlugin = require('workbox-webpack-plugin')
const common = require('./webpack.config')

module.exports = merge(common, {
  plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  devServer: {
    devMiddleware: {
      writeToDisk: true
    }
  }
})
