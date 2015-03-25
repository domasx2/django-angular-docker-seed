angular.module('myapp').config(function(RouteServiceProvider) {
    RouteServiceProvider.when({
        name: 'edit-task',
        url: '/task/:slug',
        templateUrl: 'sample/routes/task-edit/task-edit.html',
        controller: 'TaskEditController',
        controllerAs: 'ctrl',
        resolve: {
            TaskData: function(Task, $route) {
                var taskData = Task.get({
                    slug: $route.current.params.slug
                });
                return taskData.$promise;
            }
        }
    });
});
