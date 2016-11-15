var path = require('path');
var webpack = require('webpack')
var dotenv = require('dotenv');


var srcFolder = path.join(__dirname, 'src')

var babelSettings = {
    cacheDirectory: true,
    presets: ['es2015', 'stage-0', 'react']
}

var env = process.env.NODE_ENV || 'development';

var apiUrl = process.env.API_URL;

module.exports = {
    entry: [
        path.resolve(__dirname, './src/index.jsx')
    ],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        // contentPath: '/',
        publicPath: '/dist'
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env),
                API_URL: JSON.stringify(apiUrl)
            }
        }),
    ]
}