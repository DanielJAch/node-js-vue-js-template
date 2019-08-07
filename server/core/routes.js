var express = require('express');
var path = require('path');
var example = require('../api/example');

module.exports = function(app) {
  // Set up main page-load route.
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });

  // Set up static files.
  app.use(express.static(path.join(__dirname, '../../client')));

  // Add more API routes here.
  app.use('/api/example', example);
};