var baseConfig = require('./webpack.base.config')
var webpack = require('webpack')
var path = require('path')

var entry = [
    path.resolve(__dirname, './src/index.jsx')
]

var plugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
                warnings: false
            }
    })
]

module.exports = Object.assign({}, baseConfig, {
    entry: [...entry, ...(baseConfig.entry || [])],
    plugins: [...plugins, ...baseConfig.plugins]
})