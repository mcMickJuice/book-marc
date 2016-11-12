var nodemon = require('nodemon')
var path = require('path')
var jsonServer = require('json-server')



//assets and app
var clientApp =path.join(__dirname,'app/*'); 
console.log(clientApp)

nodemon({
    script: path.join(__dirname,'app.js'),
    ext: 'js',
    ignore: clientApp,
    watch: __dirname
})

//json server setup

var server = jsonServer.create();
var router = jsonServer.router(path.resolve(__dirname, '../test-server/db.json'));
var middlewares = jsonServer.defaults();

server.use(middlewares)
server.use(jsonServer.rewriter({
    '/api/': '/'
}))

server.use(router)
server.listen(3030, () => {
    console.log('JSON Server running on port 3030')
})