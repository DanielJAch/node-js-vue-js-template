'use strict';

var PORT = process.env.PORT;
var PORT_HTTPS = process.env.PORT_HTTPS;

console.log('------------Starting App in %s Environment------------', process.env.NODE_ENV);

var express = require('express');
var https = require('https');
var config = require('../config');
var middleware = require('./core/middleware');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var app = express();

// Body parsers - support parsing of JSON or UTF-8 urlencoded bodies (e.g. from a form).
app.use(bodyParser.json({ limit: 52428800 }));
app.use(bodyParser.urlencoded({
  extended: true
}));

// Set the x-frame-options header to prevent clickjacking. See https://github.com/helmetjs/frameguard
app.use(helmet.frameguard('deny'));

// Disable etag support for API routes.
app.disable('etag');

require('./core/routes')(app);

// Error Handling (must be the last middleware / app.use() call)
app.use(middleware.errorHandler);

var server = app.listen(PORT, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Express server listening at http://%s:%s', host, port);
});

module.exports = app;