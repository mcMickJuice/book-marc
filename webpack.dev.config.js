var webpack = require('webpack');
var baseConfig = require('./webpack.base.config')

var devScripts = ['webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    'react-hot-loader/patch']

Object.keys(baseConfig.entry).forEach(key => {
    baseConfig.entry[key] = [...devScripts, ...baseConfig.entry[key]]
})

var devPlugins = [
    new webpack.HotModuleReplacementPlugin()
]

baseConfig.plugins = (baseConfig.plugins || []).concat(devPlugins)
baseConfig.devtool = 'eval-source-map'

module.exports = baseConfig;