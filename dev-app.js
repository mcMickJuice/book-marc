var webpackMiddleware = require('./webpack-middleware')
var webServer = require('./webServer')

webpackMiddleware(webServer.app);

var port = process.env.PORT || 3000;

webServer.start(port, (err) => {

    if(err) {
        console.log(err);
        return;
    }

    console.log(`dev-app server started at port ${port}`)
})