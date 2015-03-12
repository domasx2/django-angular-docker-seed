angular.module('myapp').directive('taskList', function () {
    return {
        restrict: 'E',
        templateUrl: 'tasks/task-list.html',
        controller: 'TasksController',
        controllerAs: 'ctrl'
    };
});