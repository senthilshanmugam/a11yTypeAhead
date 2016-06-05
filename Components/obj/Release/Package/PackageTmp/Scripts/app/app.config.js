angular.module('componentsRouting', ['ngRoute']).config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'html/Components.html',
        controller: 'componentsController'
    }).
    when('/Components', {
        templateUrl: 'html/Components.html',
        controller: 'componentsController'
    }).
    otherwise({
        redirectTo: '/Components'
    });
}])