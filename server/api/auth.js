const express = require('express');
const router = express.Router();

const utilities = require('../core/utilities');
const middleware = require('../core/middleware');

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
    username: authInfo.username
  };
  const token = middleware.renewAuthToken(userObject);

  userObject.token = token;

  res.json(userObject);
});

router.get('/logout', middleware.checkAuthentication, function(req, res) {
  if (!!req.decoded) {
    // TODO: Implement any other tasks require to expire the current user's token.
    middleware.expireAuthToken(req.decoded);

    res.json({ message: 'Successfully logged out.' });
  } else {
    throw utilities.getHttpError('Could not find token.', 401);
  }
});

module.exports = router;