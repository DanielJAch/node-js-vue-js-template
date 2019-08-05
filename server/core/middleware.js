'use strict';

const _ = require('lodash');
const config = require('../../config');

module.exports = {
  errorHandler : function (err, req, res, next) {  // eslint-disable-line no-unused-vars
    // logger.error('SERVER ERROR:', err);

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

    //if the user was not logged in, and this was not an AJAX request, redirect to login
    if(err.status === 401 && !req.xhr) {
      return res.redirect('/login');
    }

    if (process.env.NODE_ENV === '"development"' || process.env.NODE_ENV === '"test"') {
    // Debug error messages
      res.send(body);
    } else {
    // Prod error messages
      res.send('A server error has occurred.');
    }

    if (config.errorEmailAddress) {
      // Send error emails
      var email = _.extend(config.emailConfig.email, { text: body });
      
      // This is async, but we don't wait for the promise to return (so we can send the error page to browser while email is being sent)
      sendEmail(email, config.emailConfig.smtpHosts)
      .done();
    }
  }
};