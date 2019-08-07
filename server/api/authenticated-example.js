var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send([
    {
      id: 0,
      name: 'Authenticated Example Message',
      description: 'Hello world - You are Authenticated!'
    }
  ]);
});

module.exports = router;