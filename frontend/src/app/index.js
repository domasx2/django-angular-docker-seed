angular.module('myapp', ['ngRoute', 'ngResource'])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    })
require('./sample');
