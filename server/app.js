'use strict';

console.log('------------Starting App in %s Environment------------', process.env.NODE_ENV);

const express = require('express');
const https = require('https');
const fs = require('fs');
const middleware = require('./core/middleware');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const config = require('./config');

const PORT = process.env.PORT || 22974;
const PORT_HTTPS = process.env.PORT_HTTPS || 22975;
const HOST = process.env.HOST || 'localhost';

// Body parsers - support parsing of JSON or UTF-8 urlencoded bodies (e.g. from a form).
app.use(bodyParser.json({ limit: 52428800 }));
app.use(bodyParser.urlencoded({
  extended: true,
  parameterLimit: 100000000
}));

// Set the x-frame-options header to prevent clickjacking. See https://github.com/helmetjs/frameguard
app.use(helmet.frameguard('deny'));

// Disable etag support for API routes.
app.disable('etag');

require('./core/routes')(app);

// Error Handling (must be the last middleware / app.use() call)
app.use(middleware.errorHandler);

const server = app.listen(PORT, HOST, function() {
  console.log('Express server listening at http://%s:%s', HOST, PORT);
});

https.createServer({
  key: fs.readFileSync(__dirname + '/ssl/server.key'),
  cert: fs.readFileSync(__dirname + '/ssl/server.cert')
}, app)
  .listen(PORT_HTTPS, function () {
    console.log('Express server listening at https://%s:%s', HOST, PORT_HTTPS);
  });

module.exports = app;