angular.module('myapp').factory('Task', ['$resource', function($resource) {
    return $resource('/api/tasks/:slug', {slug: '@slug'},
        {
            'list': {method: 'GET', isArray: true},
            'update': { method:'PUT' }
        });
    }
]);