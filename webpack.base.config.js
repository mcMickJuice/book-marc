var path = require('path');
var webpack = require('webpack')

var srcFolder = path.join(__dirname, 'src')

var babelSettings = {
    cacheDirectory: true,
    presets: ['es2015', 'react'],
    plugins: ['transform-object-rest-spread', 'transform-class-properties']
}

var env = process.env.NODE_ENV || 'development';

var apiUrl = process.env.API_URL;

module.exports = {
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        // contentPath: '/',
        publicPath: '/dist'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less']
    },
    module: {
        rules: [
            { test: /\.jsx?$/, include: srcFolder, loader: 'babel-loader', options: babelSettings },
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
    ]
}