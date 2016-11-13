var nodemon = require('nodemon')
var path = require('path')

//assets and app
var clientApp =path.join(__dirname,'client-app/*'); 

nodemon({
    script: path.join(__dirname,'dev-app.js'),
    ext: 'js',
    ignore: clientApp,
    watch: __dirname
})