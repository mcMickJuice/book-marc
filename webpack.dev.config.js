var path = require('path');
var webpack = require('webpack');

var babelSettings = {
    cacheDirectory: true,
    presets: ['es2015', 'stage-0', 'react']
}
var srcFolder = path.join(__dirname, 'src');
var appIndexPath = path.resolve(__dirname, './src/index.jsx');
var apiUrl = process.env.API_URL;

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        'react-hot-loader/patch',
        appIndexPath
    ],
    output: {
        path: '/',
        filename: 'bundle.js',
        // contentPath: '/',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.less']
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, include: srcFolder, loader: 'babel', query: babelSettings },
            { test: /\.less/, include: srcFolder, loader: 'style!css!less' }
        ]
    },
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                API_URL: JSON.stringify(apiUrl)
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}