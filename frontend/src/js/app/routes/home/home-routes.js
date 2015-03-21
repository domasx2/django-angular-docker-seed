angular.module('myapp').config(function(RouteServiceProvider) {
    RouteServiceProvider.when({
        name: 'home', 
        url: '/',
        templateUrl: 'js/app/routes/home/home.html',
        controller: 'HomeController',
        controllerAs: 'ctrl',
    });
});
