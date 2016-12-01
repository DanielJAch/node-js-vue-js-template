define(['jquery', 'bootstrap'], function($, bootstrap) {

  var getExample = function () {
    return $.get('/api/example');
  }

  return {
    getExample: getExample
  };
});