import { isPlainObject, isFunction, isArray, isString, isNumber, toString, some } from 'lodash';
import moment from 'moment';

const USER_TOKEN_KEY = 'USER_TOKEN_KEY';

export const isBlank = (str) => {
  if (str != null) {
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) >= 33) {
        return false;
      }
    }
  }

  return true;
};

export const startsWith = (s1, s2) => {
  if (isArray(s2)) {
    return some(s2, function(s) { return startsWith(s1, s); });
  }

  return (s1.toLowerCase().match('^' + s2.toLowerCase()) !== null);
};

export const endsWith = (s1, s2) => {
  if (isArray(s2)) {
    return some(s2, function(s) { return endsWith(s1, s); });
  }

  return (s1.toLowerCase().match(s2.toLowerCase() + '$') !== null);
};

export const pad = (val, size, padChar) => {
  const str = toString(val);
  const pc = toString(padChar);
  let padding = '';

  if (str.length < size) {
    for (let i = 0; i < size - str.length; i++) {
      padding += pc;
    }
  }

  return padding + str;
};

export const pluralize = (noun) => {
  if (!isString(noun)) {
    return noun;
  }

  if (endsWith(noun, ['a', 'i', 'o', 'u', 'ss'])) {
    return noun + 'es';
  }

  if (endsWith(noun, 's')) {
    return noun;
  }

  return noun + 's';
};

export const saveToLocalStorage = (key, value) => {
  if (isBlank(key)) {
    return;
  }

  if (isPlainObject(value)) {
    window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    window.localStorage.setItem(key, value);
  }
};

export const getFromLocalStorage = (key, mapper) => {
  if (isBlank(key)) {
    return null;
  }

  var value = window.localStorage.getItem(key);

  if (!value || value === 'null' || value === 'undefined') {
    return null;
  }

  if (startsWith(value.trim(), '{') && endsWith(value.trim(), '}')) {
    var obj = JSON.parse(value);

    if (!!obj) {
      return isFunction(mapper) ? mapper(obj) : obj;
    }
  }

  return value;
};

export const objectArraySortFunction = (a, b, property, isDesc) => {
  var aprop = a[property] || '';
  var bprop = b[property] || '';

  if (!isNumber(aprop) && !isNumber(bprop)) {
    if (moment.isMoment(aprop)) { aprop = aprop.format(); }
    if (moment.isMoment(bprop)) { bprop = bprop.format(); }

    aprop = aprop.toString().toLowerCase();
    bprop = bprop.toString().toLowerCase();
  } else {
    aprop = parseFloat(aprop);
    bprop = parseFloat(bprop);
  }

  if (isDesc) {
    return ((bprop < aprop) ? -1 : ((bprop > aprop) ? 1 : 0));
  } else {
    return ((aprop < bprop) ? -1 : ((aprop > bprop) ? 1 : 0));
  }
};

export const isAsciiLetter = (charCode) => {
  return (
    (charCode >= 65 && charCode <= 90) ||
    (charCode >= 97 && charCode <= 122) ||
    (charCode >= 97 && charCode <= 122) ||
    (charCode >= 192 && charCode <= 214) ||
    (charCode >= 216 && charCode <= 246) ||
    (charCode >= 248 && charCode <= 255) ||
    charCode === 138 || charCode === 140 ||
    charCode === 142 || charCode === 154 ||
    charCode === 156 || charCode === 158 ||
    charCode === 159
  );
};
  
export const isAsciiNumber = (charCode) => {
  return (charCode >= 48 && charCode <= 57);
};

export const isAsciiSymbolOrNumber = (charCode) => {
  return (
    (charCode >= 32 && charCode <= 64) ||
    (charCode >= 91 && charCode <= 96) ||
    (charCode >= 123 && charCode <= 137) ||
    (charCode >= 143 && charCode <= 153) ||
    (charCode >= 161 && charCode <= 191) ||
    (charCode >= 143 && charCode <= 153) ||
    charCode === 139 || charCode === 155 ||
    charCode === 157 || charCode === 160 ||
    charCode === 215 || charCode === 247
  );
};

export const formatElapsedTime = (duration) => {
  if (isNumber(duration) && duration > 0) {
    var hours = parseInt(duration / 3600, 10);
    var minutes = hours > 0 ? parseInt((duration - (3600 * hours)) / 60, 10) : parseInt(duration / 60, 10);
    var seconds = parseInt(duration % 60, 10);

    if (hours > 0) {
      return pad(hours, 2, '0') + ':' + pad(minutes, 2, '0') + ':' + pad(seconds, 2, '0');
    } else {
      return pad(minutes, 2, '0') + ':' + pad(seconds, 2, '0');
    }
  }

  return null;
};

export const getUserAccessToken = () => {
  return getFromLocalStorage(USER_TOKEN_KEY);
};

export const setUserAccessToken = (token) => {
  return saveToLocalStorage(USER_TOKEN_KEY, token);
};
