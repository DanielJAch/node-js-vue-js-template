const _ = require('lodash');
const crypto = require('crypto');
const config = require('../../config');

const algorithm = 'sha512';
const salt = config.clientSecret;
const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

const encrypt = function(text){
  if (!text || !_.isString(text)) {
    throw new Error('The "text" argument must be valid strings to call this function.');
  }

  const hash = crypto.createHmac(algorithm, salt);

  hash.update(text);

  return hash.digest('hex');
};

const comparePasswords = function(unencrypted, encrypted) {
  return encrypt(unencrypted, salt) === encrypted;
};

const getHttpError = function(msg, status) {
  const err = new Error(msg);

  err.status = status;

  return err;
};

module.exports = {
  encrypt: encrypt,
  comparePasswords: comparePasswords,
  getHttpError: getHttpError,
  emailRegEx: emailRegEx
};