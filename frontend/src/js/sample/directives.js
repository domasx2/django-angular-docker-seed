angular.module('myapp').directive('helloworld', function () {
    "use strict";
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/helloworld.html'
    };
});