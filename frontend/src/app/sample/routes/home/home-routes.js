angular.module('myapp').config(function($routeProvider) {
    $routeProvider.when('/', {
        name: 'home',
        templateUrl: 'sample/routes/home/home.html',
        controller: 'HomeController',
        controllerAs: 'ctrl',
    });
});
