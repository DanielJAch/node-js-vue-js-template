define(['jquery', 'bootstrap', './services/example'], function($, bootstrap, example) {
  $(document).ready(function() {
    console.log('DOCUMENT READY...');

    example.getExample()
    .then(function() {
      console.log('API REQUEST FINISHED');
    });
  });
});