'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send([
    {
      id: 0,
      name: 'Example Message',
      description: 'Hello world'
    }
  ]);
});

module.exports = router;