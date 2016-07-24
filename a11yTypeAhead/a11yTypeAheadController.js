angular.module('a11yModule')
    .controller('a11yTypeAheadController', ['$scope', '$q', '$timeout', 'a11yCommon', function ($scope, $q, $timeout, a11yCommon) {
        $scope.name = "";

        $scope.onItemSelected = function () {
            console.log($scope.name + " Selected")
        };

        $scope.getSelectedItemText = function (itemSelected) {
            return itemSelected.name;
        }

        $scope.getOptionTemplate = function (searchString, selectedOption) {
            var xName = selectedOption.name;
            var regExBold = new RegExp('(' + searchString + ')(?!<\/strong>)', 'gi');
            var subst = '<strong>$1</strong>';
            xName = xName.replace(regExBold, subst);
            return '<div class="custom-type-ahead-option"><div class="data">' + xName + '</div></div>';
        }

        $scope.getSelectedItemText1 = function (itemSelected) {
            return itemSelected.name + ' ' + (itemSelected.code);
        }

        $scope.getOptionTemplate1 = function (searchString, selectedOption) {
            return '<div class="custom-type-ahead-option1"><div class="code" aria-hidden="true">' + selectedOption.code + '</div>&nbsp;&nbsp;<div class="data" aria-hidden="true">' + selectedOption.name + '</div></div>';
        }

        $scope.aclConfig = {
            searchTreshold: 1,
            a11yUid: 'AsianCountriesList',
            a11yAriaLabel: 'Asian Countries List',
            hideLabel: false,
            onSearch: function (searchString) {
                var deferred = $q.defer();
                deferred.resolve(a11yCommon.getFilteredCountries(searchString));
                return deferred.promise;
            },
            getOptionTemplate: function (searchString, selectedOption) { return $scope.getOptionTemplate(searchString, selectedOption); },
            getOptionText: function (itemSelected) { return $scope.getSelectedItemText(itemSelected); },
            onSelect: function () { $scope.onItemSelected(); },
        }
        $scope.ussConfig = {
            searchTreshold: 2,
            a11yUid: 'USStatesList',
            a11yAriaLabel: 'US States List',
            hideLabel: false,
            onSearch: function (searchString) {
                var deferred = $q.defer();
                deferred.resolve(a11yCommon.getFilteredStates(searchString));
                return deferred.promise;
            },
            getOptionTemplate: function (searchString, selectedOption) { return $scope.getOptionTemplate1(searchString, selectedOption); },
            getOptionText: function (itemSelected) { return $scope.getSelectedItemText(itemSelected); },
            onSelect: function () { $scope.onItemSelected(); },
        }
        $scope.uscConfig = {
            //searchTreshold: 3,
            a11yUid: 'USCities',
            //a11yAriaLabel: '', //OPTIONALall 
            hideLabel: true,
            onSearch: function (searchString) {
                var deferred = $q.defer();
                deferred.resolve(a11yCommon.getFilteredStates(searchString)); //getFilteredCities
                return deferred.promise;
            },
            //getOptionTemplate: function () { }, //OPTIONAL
            //getOptionText: function () { }, //OPTIONAL
            //onSelect: function () {  }, //OPTIONAL
        }
    }]);








