'use strict';

/**
 * @ngdoc overview
 * @name a11yComponentsApp
 * @description
 * # a11yComponentsApp
 *
 * Main module of the application.
 */
angular
  .module('a11yComponentsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'a11yModule'
  ])
    .controller('menuCtrl', ['$scope','$location', function ($scope, $location) {
        $scope.getClass = function (path) {
            if (path.length == 1) {
                return (($location.path().substr(0) === path) ? 'active' : '');
            }
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
        }

    }])
  .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/a11yTypeAhead', {
            templateUrl: 'views/a11yTypeAhead-main.html',
            controller: 'a11yTypeAheadController',
        })
        .when('/a11yScroll', {
            templateUrl: 'views/a11yScroll-main.html',
            controller: 'a11yScrollController',
        })
        .when('/a11ySlickGrid', {
            templateUrl: 'views/a11ySlickGrid-main.html',
            controller: 'a11ySlickGridController',
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl',
            controllerAs: 'about'
        })
        .otherwise({
            redirectTo: '/'
        });
  });
