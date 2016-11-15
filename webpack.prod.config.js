var baseConfig = require('./webpack.base.config')
var webpack = require('webpack')

var plugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
                warnings: false
            }
    })
]

module.exports = Object.assign({}, baseConfig, {
    plugins: [...plugins, ...baseConfig.plugins]
})