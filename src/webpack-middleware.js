var config = require('../webpack.dev.config');
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

module.exports = function (app) {
    var compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        stats: { colors: true },
        quiet: true
    }))

    app.use(webpackHotMiddleware(compiler, {
        log: console.log
    }))
}

