var express = require('express');
var path = require('path');

var app = express();

module.exports.app = app;

module.exports.start = function start(port, callback) {
    
    app.use(express.static(path.resolve(__dirname)))

    app.all('/*', function (req, res) {
        res.sendFile(path.resolve(__dirname, './index.html'))
    })

    callback = callback || function() {
        console.log(`Listening on port ${port}`)
    }
    app.listen(port, callback);
}