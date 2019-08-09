const TOKEN_DURATION = (3600 * 24); // 24 hours

const _ = require('lodash');
const jwt = require('jsonwebtoken');
const NodeCache = require('node-cache');
const cache = new NodeCache({ checkperiod: TOKEN_DURATION });
const utilities = require('./utilities');
const config = require('../../config');
const userTokenKey = 'username'; // You can change this to ID or email address or some other property that uniquely identifies a user

const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  let body;

  if (_.isObject(err)) {
    body = {
      name: err.name,
      message: err.message,
      stack: err.stack
    };
  } else {
    body = {
      message: err.toString()
    };
  }

  body = JSON.stringify(body, null, 4);

  res.status(err.status || 500);

  // If the user was not logged in, and this was not an AJAX request, redirect to login
  // TODO: You may want to change this depending on how you set up your authentication process!!
  if(err.status === 401 && !req.xhr) {
    return res.redirect('/login');
  }

  // if (config.errorEmailAddress) {
  //   // Send error emails
  //   var email = _.extend(config.emailConfig.email, { text: body });
    
  //   // This is async, but we don't wait for the promise to return (so we can send the error page to browser while email is being sent)
  //   sendEmail(email, config.emailConfig.smtpHosts)
  //   .done();
  // }

  if (process.env.NODE_ENV === '"development"' || process.env.NODE_ENV === '"test"') {
  // Debug error messages
    return res.send(body);
  }

  // Prod error messages
  return res.send('A server error has occurred.');
};

const _setTokenExpiration = (user, duration) => {
  user.iat = Math.floor(Date.now() / 1000);
  user.exp = Math.floor(Date.now() / 1000) + duration;

  return jwt.sign(user, config.clientSecret);
};

const _checkBlackList = (key, token) => {
  const blacklist = cache.get(key);

  if (_.isArray(blacklist) && _.some(blacklist, function(t) { return t === token; })) {
    throw new Error('Could not find token.');
  }
};

const renewAuthToken = (user) => {
  return _setTokenExpiration(user, TOKEN_DURATION);
};

const expireAuthToken = (user) => {
  const key = user[userTokenKey];
  const blacklistedTokens = cache.get(key) || [];

  if (!_.some(blacklistedTokens, user.token)) {
    blacklistedTokens.push(user.token);
  }

  // Blacklist the user token.
  cache.set(key, blacklistedTokens);

  return _setTokenExpiration(user, -(TOKEN_DURATION));
};

const checkAuthentication = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token) {
    try {
      const decoded = jwt.verify(token, config.clientSecret);
      
      _checkBlackList(decoded[userTokenKey], token);

      decoded.token = token;
      req.decoded = decoded;

      next();
    } catch(e) {
      e.status = 401;
      errorHandler(e, req, res, next);
    }
  } else {
    errorHandler(utilities.getHttpError('Failed to authenticate. No token provided.', 401), req, res, next);
  }
};

const getUserFromToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token) {
    const decoded = jwt.verify(token, config.clientSecret);

    _checkBlackList(decoded[userTokenKey], token);

    return decoded;

  } else {
    errorHandler(utilities.getHttpError('Failed to authenticate. No token provided.', 401), req, res, next);
  }
};

module.exports = {
  errorHandler,
  checkAuthentication,
  renewAuthToken,
  expireAuthToken,
  getUserFromToken
};