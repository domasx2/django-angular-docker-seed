angular.module('myapp').config(function(RouteServiceProvider) {
    RouteServiceProvider.when({
        name: 'edit-task',
        url: '/task/:id',
        templateUrl: 'sample/routes/task-edit/task-edit.html',
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
