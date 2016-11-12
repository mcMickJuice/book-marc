require('dotenv').config();

var express = require('express');
var path = require('path');
var routes = require('./server-app/routes')
var bodyParser = require('body-parser')

var app = express();
app.use(express.static(path.resolve(__dirname)))
app.use(bodyParser.json());

module.exports.app = app;



module.exports.start = function start(port, callback) {
routes.use(app);    

    //shouldnt this be get, not all?
    app.get('/*', function (req, res) {
        res.sendFile(path.resolve(__dirname, './index.html'))
    })

    callback = callback || function () {
        console.log(`Listening on port ${port}`)
    }
    app.listen(port, callback);
}