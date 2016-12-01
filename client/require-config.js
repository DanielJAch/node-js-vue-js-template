requirejs.config({
  paths: {
    jquery: 'bower_components/jquery/dist/jquery',
    bootstrap: 'bower_components/bootstrap/dist/js/bootstrap', // must be placed after pager
    lodash: 'bower_components/lodash/lodash', 
  },
  shim: {
    'bootstrap': { deps: ['jquery'] }
  }
});

require(['js/app']);