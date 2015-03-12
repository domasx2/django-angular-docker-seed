angular.module('myapp').factory('Task', ['$resource', function($resource) {
    return $resource('/api/tasks/:id', {id: '@id'},
        {
            'list': {method: 'GET', isArray: true},
            'update': { method:'PUT' }
        });
    }
]);