var webpack = require('webpack');
var baseConfig = require('./webpack.base.config')
var path = require('path');

var devEntry = [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        'react-hot-loader/patch',
        path.resolve(__dirname, './src/index.dev.jsx')
    ];
var devPlugins = [
        new webpack.HotModuleReplacementPlugin()    
]

var entryArr = [...devEntry, ...(baseConfig.entry || [])]
var pluginArr = (baseConfig.plugins || []).concat(devPlugins)

module.exports = Object.assign({}, baseConfig, {
    entry: entryArr,
    plugins: pluginArr,
    devtool: 'eval-source-map'
})