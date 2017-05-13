var path = require('path');
var webpack = require('webpack')

var srcFolder = path.join(__dirname, 'src')

// var babelSettings = {
//     cacheDirectory: true,
//     presets: ['es2015', 'react'],
//     plugins: ['transform-object-rest-spread', 'transform-class-properties']
// }

var env = process.env.NODE_ENV || 'development';

var apiUrl = process.env.API_URL;

var vendorLibs = ['react',
    'react-dom',
    'es6-promise',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
    'redux-thunk',
    'superagent',
    'superagent-promise-plugin',
    'showdown',
    'highlight']

module.exports = {
    entry: {
        vendor: vendorLibs,
        app: [path.join(__dirname, 'src/index.dev.jsx')], //prod replaces this key with regular index
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        publicPath: '/dist'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less'],
        alias: {
            'highlight': path.join(srcFolder, 'client-app/common/markdown/highlight.pack'),
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, include: srcFolder, loader: 'babel-loader', options: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.less/, include: srcFolder, use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.css$/, include: srcFolder, use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env),
                API_URL: JSON.stringify(apiUrl)
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        })
    ]
}