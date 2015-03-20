angular.module('myapp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/task/:id', {
                templateUrl: 'js/app/routes/task-edit/task-edit.html',
                controller: 'TaskEditController',
                controllerAs: 'ctrl',
                resolve: {
                    TaskData: function(Task, $route) {
                        var taskData = Task.get({
                            id: $route.current.params.id
                        });
                        return taskData.$promise;
                    }
                }
            });
    });
