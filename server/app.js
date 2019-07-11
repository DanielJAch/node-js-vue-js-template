'use strict';

const PORT = process.env.PORT || 22974;
const PORT_HTTPS = process.env.PORT_HTTPS || 22974;
const HOST = process.env.HOST || 'localhost';

console.log('------------Starting App in %s Environment------------', process.env.NODE_ENV);

const express = require('express');
const https = require('https');
const config = require('./config');
const middleware = require('./core/middleware');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();

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

const server = app.listen(PORT, HOST, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Express server listening at http://%s:%s', host, port);
});

module.exports = app;