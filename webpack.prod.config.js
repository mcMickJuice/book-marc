var baseConfig = require('./webpack.base.config')
var webpack = require('webpack')
var path = require('path')

var appEntry = [
    path.resolve(__dirname, './src/index.jsx')
]

var plugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
                warnings: false
            }
    })
]
baseConfig.entry.app = appEntry
baseConfig.plugins = [...plugins, ...baseConfig.plugins]

module.exports = baseConfig;