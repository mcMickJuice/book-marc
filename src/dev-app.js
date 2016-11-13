var webpackMiddleware = require('./webpack-middleware')
var webServer = require('./webServer')

webpackMiddleware(webServer.app);

webServer.start(3000, () => console.log('dev-app server started'))