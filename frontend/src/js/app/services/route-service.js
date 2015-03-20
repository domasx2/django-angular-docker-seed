angular.module('myapp')
    .service('RouteService', function($location) {
        var openPage = function(path) {
            $location.path(path);
        };

        this.openHomePage = function() {
            return openPage('/');
        };

        this.openTaskEdit = function(id) {
            return openPage('/task/' + id);
        };
    });
