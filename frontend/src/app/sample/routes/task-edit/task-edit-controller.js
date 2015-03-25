angular.module('myapp').controller('TaskEditController', function($scope, TaskData, Task, RouteService) {

    $scope.taskData = new Task(TaskData);

    this.update = function(form) {
        if (form.$valid) {
            $scope.taskData.$update().then(function() {
                RouteService.open('home');
            }, function() {
                alert('Error occured');
            });
        }
    };
});
