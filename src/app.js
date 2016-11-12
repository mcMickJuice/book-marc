var express = require('express');
var path = require('path');
var proxy = require('express-http-proxy')
var webpackMiddleware = require('./webpack-middleware')

var app = express();

var proxyMiddleware = proxy('http://localhost:3030', {
    forwardPath: (req, res) => {
        var path = require('url').parse(req.baseUrl).path;
        return path;
    } 
})
app.use('/api/*', proxyMiddleware);

app.use(express.static(path.resolve(__dirname)))

webpackMiddleware(app);

app.all('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname,'./index.html'))
})

app.listen(3000, () => console.log('listening on port 3000'))