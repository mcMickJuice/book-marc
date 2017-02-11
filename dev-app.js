var webpackMiddleware = require('./webpack-middleware')
var webServer = require('./webServer')
var open = require('open')

webpackMiddleware(webServer.app);

var port = process.env.PORT || 3000;

webServer.start(port, (err) => {

    if(err) {
        console.log(err);
        return;
    }

    console.log('dev-app server started!!')
    // open(`http://localhost:${port}`)
})