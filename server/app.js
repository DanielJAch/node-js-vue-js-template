'use strict';

const express = require('express');
const https = require('https');
const fs = require('fs');
const middleware = require('./core/middleware');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const config = require('../config');
let certLocation = null;
let certKeyLocation = null;

switch (config.env) {
  case '"production"':
  case 'production':
  case '"prod"':
  case 'prod':
    process.env.NODE_ENV = config.prod.env.NODE_ENV;
    process.env.PORT = config.prod.env.PORT;
    process.env.PORT_HTTPS = config.prod.env.PORT_HTTPS;
    process.env.HOST = config.prod.env.HOST;
    certLocation = config.prod.ssl.cert;
    certKeyLocation = config.prod.ssl.key;
    break;
  case '"staging"':
  case 'staging':
    process.env.NODE_ENV = config.staging.env.NODE_ENV;
    process.env.PORT = config.staging.env.PORT;
    process.env.PORT_HTTPS = config.staging.env.PORT_HTTPS;
    process.env.HOST = config.staging.env.HOST;
    certLocation = config.staging.ssl.cert;
    certKeyLocation = config.staging.ssl.key;
    break;
  case '"test"':
  case 'test':
    process.env.NODE_ENV = config.test.env.NODE_ENV;
    process.env.PORT = config.test.env.PORT;
    process.env.PORT_HTTPS = config.test.env.PORT_HTTPS;
    process.env.HOST = config.test.env.HOST;
    certLocation = config.test.ssl.cert;
    certKeyLocation = config.test.ssl.key;
    break;
  default:
    process.env.NODE_ENV = config.dev.env.NODE_ENV;
    process.env.PORT = config.dev.env.PORT;
    process.env.PORT_HTTPS = config.dev.env.PORT_HTTPS;
    process.env.HOST = config.dev.env.HOST;
    certLocation = config.dev.ssl.cert;
    certKeyLocation = config.dev.ssl.key;
    break;
};

console.log('------------Starting App in %s Environment------------', process.env.NODE_ENV);

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

const server = app.listen(process.env.PORT, process.env.HOST, function() {
  console.log('Express server listening at http://%s:%s', process.env.HOST, process.env.PORT);
});

https.createServer({
  key: fs.readFileSync(certKeyLocation),
  cert: fs.readFileSync(certLocation)
}, app)
  .listen(process.env.PORT_HTTPS, function () {
    console.log('Express server listening at https://%s:%s', process.env.HOST, process.env.PORT_HTTPS);
  });

module.exports = app;