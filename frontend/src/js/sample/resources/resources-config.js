angular.module('myapp').config(function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
});