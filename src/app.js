var path = require('path');
var proxy = require('express-http-proxy')
var webpackMiddleware = require('./webpack-middleware')
var webServer = require('./webServer')

//need to invert this so that app is exported
//db json middleware
var proxyMiddleware = proxy('http://localhost:3030', {
    forwardPath: (req, res) => {
        var path = require('url').parse(req.baseUrl).path;
        return path;
    } 
})

webServer.app.use('/api/*', proxyMiddleware);

webpackMiddleware(webServer.app);

webServer.start(3000, () => console.log('server started from app.js'))