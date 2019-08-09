const express = require('express');
const router = express.Router();
const utilities = require('../core/utilities');
const middleware = require('../core/middleware');
const identityModel = require('../models/identity');

router.get('/', middleware.checkAuthentication, function(req, res) {
  if (!!req.decoded) {
    // TODO: Implement your own method of looking up the current user, then return that user's information.
    res.json(req.decoded);
  } else {
    throw utilities.getHttpError('Could not find token.', 401);
  }
});

router.post('/login', function(req, res, next) {
  const authInfo = req.body;

  if (!authInfo.username || !authInfo.password) {
    middleware.errorHandler({ message: 'User name and password are required.', status: 400 }, req, res, next);

    return;
  }

  // TODO: Implement your own method of authenticating the user here, then return the token when successfully authenticating.

  const userObject = {
    username: authInfo.username,
    name: 'User Name'
  };
  const token = middleware.renewAuthToken(userObject);
  const identity = identityModel.toDto(userObject, token);

  res.json(identity);
});

router.post('/refresh', middleware.checkAuthentication, function(req, res, next) {
  const userObject = middleware.getUserFromToken(req, res, next);

  // TODO: Look up the user in your repository and ensure that the user has not been disabled!!

  const token = middleware.renewAuthToken(userObject);
  const identity = identityModel.toDto(userObject, token);

  res.json(identity);
});

router.get('/userinfo', middleware.checkAuthentication, function(req, res, next) {
  const userObject = middleware.getUserFromToken(req, res, next);
  const identity = identityModel.toDto(userObject);

  res.json(userObject);  
});

router.get('/logout', middleware.checkAuthentication, function(req, res) {
  if (!!req.decoded) {
    middleware.expireAuthToken(req.decoded);

    // TODO: Implement any other tasks required to expire the current user's token.

    res.json({ message: 'Successfully logged out.' });
  } else {
    throw utilities.getHttpError('Could not find token.', 401);
  }
});

module.exports = router;