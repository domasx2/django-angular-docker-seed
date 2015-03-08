angular.module('compile').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/helloworld.html',
    "<p>Hello world</p>"
  );

}]);
