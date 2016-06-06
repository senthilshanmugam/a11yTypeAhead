angular.module('a11yModule')
    .controller('a11yTypeAheadController', ['$scope', '$q', '$timeout', 'a11yCommon', function ($scope, $q, $timeout, a11yCommon) {

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

    $scope.onItemSearchCities = function (searchString) {
        var deferred = $q.defer();
        deferred.resolve(a11yCommon.getFilteredCities(searchString));
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








