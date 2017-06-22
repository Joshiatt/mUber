process.env['NODE_ENV'] = 'test';

var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/routes.js');
var mongoose = require('mongoose');
var app = express();

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/muber');
}




app.use(bodyParser.json());
routes(app);

app.use(function(err, req, res, next) {
    res
        .status(422)
        .send({ error: err.message });
})


module.exports = app;