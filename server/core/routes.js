var express = require('express');
var path = require('path');
var auth = require('../api/auth');
var example = require('../api/example');
var authExample = require('../api/authenticatedExample');

module.exports = function(app, checkAuthentication) {
  // Set up main page-load route.
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });

  // Set up static files.
  app.use(express.static(path.join(__dirname, '../../client')));

  // Add more API routes here.
  app.use('/api/auth', auth);
  app.use('/api/example', example);
  app.use('/api/authenticated-example', checkAuthentication, authExample);
};