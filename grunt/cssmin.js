'use strict';

// Minifies CSS files: https://github.com/gruntjs/grunt-contrib-cssmin

module.exports = {
  target: {
    files: {
      'client/css/site.min.css': [
        'client/css/site.css'
      ]
    }
  }
};