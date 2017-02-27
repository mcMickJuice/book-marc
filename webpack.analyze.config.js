const prodConfig = require('./webpack.prod.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const plugins = [
    new BundleAnalyzerPlugin()
]

prodConfig.plugins = prodConfig.plugins.concat(plugins)

module.exports = prodConfig