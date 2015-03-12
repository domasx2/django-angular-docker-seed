angular.module('myapp').controller('TasksController', ['$scope', '$http', 'Task', function ($scope, $http, Task) {
    $scope.new_task = new Task();
    $scope.tasks = Task.list();

    this.update = function(task) {
        $scope.edited_task = task;
        $scope.new_task = new Task(task);
    };

    this.save = function () {
        if (!$scope.new_task.id) {
            $scope.new_task.$save();
            $scope.tasks.push($scope.new_task);
        } else {
            $scope.edited_task.text = $scope.new_task.text;
            $scope.new_task.$update();
        }
        $scope.new_task = new Task();
    };

    this.remove = function (index) {
        var task = $scope.tasks.splice(index, 1)[0];
        task.$remove();
    };
}]);