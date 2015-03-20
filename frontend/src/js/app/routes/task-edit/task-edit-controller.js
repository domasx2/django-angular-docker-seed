angular.module('myapp')
    .controller('TaskEditController', function($scope, TaskData, Task, RouteService) {
        $scope.taskData = new Task(TaskData);
        this.update = function(form) {
            if (form.$valid) {
                $scope.taskData.$update().then(function() {
                    alert('Saved');
                    RouteService.openHomePage();
                }, function() {
                    alert('Error occured');
                });
            }

        };
    });
