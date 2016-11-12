var nodemon = require('nodemon')
var path = require('path')
var jsonServer = require('json-server')

//assets and app
var clientApp =path.join(__dirname,'app/*'); 

nodemon({
    script: path.join(__dirname,'dev-app.js'),
    ext: 'js',
    ignore: clientApp,
    watch: __dirname
})