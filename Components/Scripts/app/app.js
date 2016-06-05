var componentsApp = angular.module('Components', ['ngAnimate', 'ngSanitize', 'componentsRouting', 'ui.bootstrap', 'a11yModule']);

// Configure Events Module

componentsApp.constant('apiBaseUri', window.apiBaseUri);

componentsApp.controller('componentsController', ['$scope', '$q', '$timeout', 'a11yCommon', function ($scope, $q, $timeout, a11yCommon) {

    $scope.name = "";

    $scope.onItemSelected = function () {
        console.log($scope.name + " Selected")
    };

    $scope.onItemSearchCountries = function (searchString) {
        var deferred = $q.defer();
        deferred.resolve(a11yCommon.getFilteredCountries(searchString));
        return deferred.promise;
    }

    $scope.onItemSearchStates = function (searchString) {
        var deferred = $q.defer();
        deferred.resolve(a11yCommon.getFilteredStates(searchString));
        return deferred.promise;
    }

    $scope.getSelectedItemText = function (itemSelected) {
        return itemSelected.name;
    }

    $scope.getOptionTemplate = function (x) {
        return '<div class="custom-type-ahead-option"><div class="code">' + x.code + '</div>&nbsp;&nbsp;<div class="data">' + x.name + '</div></div>';
    }

    $scope.getSelectedItemText1 = function (itemSelected) {
        return itemSelected.name + ' ' + (itemSelected.code);
    }

    $scope.getOptionTemplate1 = function (x) {
        return '<div class="custom-type-ahead-option1"><div class="code">' + x.code + '</div>&nbsp;&nbsp;<div class="data">' + x.name + '</div></div>';
    }
}]);








