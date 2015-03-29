angular.module('myapp').controller('TaskEditController', function($scope, TaskData, Task, namedRouteService) {

    $scope.taskData = new Task(TaskData);

    this.update = function(form) {
        if (form.$valid) {
            $scope.taskData.$update().then(function() {
                namedRouteService.open('home');
            }, function() {
                alert('Error occured');
            });
        }
    };
});
