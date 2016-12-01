'use strict';

var express = require('express');
var path = require('path');
var config = require('../../config');

module.exports = function(app) {
  // Set up main page-load route.
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/index.html'))
  });

  // Set up static files.
  app.use(express.static(path.join(__dirname, '../../client')));

  // Add more API routes here.
  app.use('/api/example', require('../api/example'));
};