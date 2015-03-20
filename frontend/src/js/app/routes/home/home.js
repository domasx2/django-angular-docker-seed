angular.module('myapp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'js/app/routes/home/home.html',
                controller: 'HomeController',
                controllerAs: 'ctrl',
            });
    });
