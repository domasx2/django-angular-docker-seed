angular.module('myapp').provider('RouteService', function RouteServiceProvider($routeProvider) {
    
    var routes = {};

    this.when = function when(config) {
        if (!config.hasOwnProperty('name')) {
            throw new Error('route config must have a name provided');
        }
        if (!config.hasOwnProperty('url')){
            throw new Error('route config must have a url provided');
        }
        routes[config.name] = {
            config: config
        };
        $routeProvider.when(config.url, config);
    };

     this.$get = function RouteServiceProviderFactory($location) {
        return {
            open: function open (name, args) {
                /*
                    name String   route name
                    args Obect   property to value mapping for all properties defined in url as ':property'
                */
                if (! routes.hasOwnProperty(name)) {
                    throw new Error('route ' + name + ' not known');
                }
                var url = routes[name].config.url;

                //reolace :prop with values from args object
                url = url.replace(/(:[a-zA-Z0-9_]+)/g, function (match, p) {
                    p = p.substring(1);
                    if (!(args && args.hasOwnProperty(p))) {
                        throw new Error('route ' + name + ' missing argument ' + p);
                    }
                    return args[p];
                });

                $location.path(url);
            }
        };
    };
});
