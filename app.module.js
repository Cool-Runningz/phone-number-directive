// Define the `phoneFormatterApp` module
(function() {
    'use strict';

angular
    .module('phoneFormatterApp', [])
    .factory('libphonenumber', function ($window) {
    return $window.libphonenumber;
  });

})(window.angular);