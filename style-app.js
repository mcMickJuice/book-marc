var webpackMiddleware = require('./webpack-middleware')
var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.resolve(__dirname)));

webpackMiddleware(app);

app.listen(process.env.PORT || 3000, () => console.log('style-app server started'))