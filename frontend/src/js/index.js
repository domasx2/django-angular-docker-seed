angular.module('myapp', ['ngRoute', 'ngResource'])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    })
    .run(function($rootScope, RouteService) {
        $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
            if (rejection.status === 404) {
                alert('Not found');
                RouteService.openHomePage();
            }
        });
    });
require('./app');
