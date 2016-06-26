angular.module('a11yModule')
    .controller('a11yScrollController', ['$scope', '$uibModal', function ($scope, $uibModal) {
        $scope.name = "Some Value";
        $scope.longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu feugiat risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas fringilla, lorem a luctus imperdiet, purus lorem tincidunt nibh, gravida fringilla sem ante vitae neque. In congue fringilla ipsum vel hendrerit. Quisque ornare imperdiet odio nec malesuada. Vestibulum sollicitudin rhoncus aliquet. Sed ut placerat erat. Quisque et ligula commodo, tristique lorem vel, posuere ipsum. Maecenas commodo neque nec lacus porta, a tempor sem pretium. Vestibulum nec pulvinar risus. Aliquam ultrices bibendum libero ut ornare. Vestibulum id iaculis est. Donec viverra risus id ipsum lacinia porta ac id quam. Morbi ut augue nisl. Vivamus eleifend lacinia aliquam. Aenean viverra faucibus ullamcorper. Quisque tempor ante eu magna placerat pulvinar. Nam at metus tristique, interdum augue at, vehicula erat. Pellentesque at diam neque. Aliquam erat volutpat. Sed molestie justo vitae tellus interdum posuere. Quisque accumsan, urna vitae mattis molestie, ipsum purus convallis tortor, id euismod nulla ante imperdiet nulla. Morbi pulvinar mauris id velit ultrices, vitae consequat ipsum vestibulum. Proin ut viverra felis. Suspendisse dolor ante, pulvinar at metus posuere, molestie ultrices ante. Pellentesque ipsum nisl, tincidunt in faucibus et, consequat sit amet quam. Maecenas eleifend est ut mi feugiat finibus. Maecenas hendrerit, velit id sagittis sollicitudin, dolor justo vestibulum tellus, nec auctor purus risus ut tellus. Fusce sit amet auctor mi. Aliquam porttitor erat sit amet neque posuere, at ultricies ante consectetur. Quisque non orci lobortis, ornare leo sit amet, maximus sapien. In fringilla ligula elit, ac dignissim nisi efficitur quis. Nullam imperdiet sed mi et semper. Mauris scelerisque, dolor in maximus eleifend, dui elit sodales tellus, sit amet ultricies justo nisi sed nisl. Quisque tempus et dolor eu blandit. Praesent bibendum, nibh eu iaculis lobortis, massa nisi placerat augue, sed eleifend diam nulla nec sem. Sed suscipit, neque quis tristique sollicitudin, sem nibh sodales dolor, et eleifend magna purus vel magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse vel consequat lorem, eget fringilla massa. Donec sed turpis sit amet eros luctus fringilla. Nulla facilisi. Praesent ut justo diam. Nunc sit amet ex aliquam, fermentum mauris pharetra, dignissim nisi. Vestibulum id felis eu orci facilisis vulputate. Ut pharetra consequat laoreet. Duis sed ullamcorper risus. Duis faucibus ante lacus, quis ullamcorper ante dictum semper. Mauris dapibus efficitur mi sed interdum. Suspendisse non tempor nisl. Cras ac augue leo. Morbi porta sollicitudin viverra. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi imperdiet placerat ex, eget maximus nisl fermentum sit amet. Donec viverra urna et nulla commodo, sed posuere erat tempus. Curabitur ut condimentum justo, nec dictum enim. Suspendisse ut urna quis nisl ullamcorper placerat. Etiam et eros at lacus consectetur bibendum. Nunc blandit auctor turpis, eget molestie nulla ultricies vel. Vivamus urna enim, gravida sit amet nisi id, dignissim imperdiet lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi vitae ornare tortor. Aenean ut tincidunt erat. Ut consequat mi quis lorem rutrum auctor eget at nisi. Maecenas tristique velit eu lacus luctus, a consequat felis viverra. Donec vestibulum suscipit nulla ac interdum.";
        $scope.showDialog = function () {
            $scope.opts = {
                backdrop: true,
                backdropClick: true,
                dialogFade: false,
                keyboard: true,
                windowClass: 'dlgWindow',
                templateUrl: 'a11yScroll/modalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve: {} // empty storage
            };

            $scope.opts.resolve.item = function () {
                return angular.copy({ name: $scope.name, longText: $scope.longText }); // pass name to Dialog
            }

            var modalInstance = $uibModal.open($scope.opts);

            modalInstance.rendered.then(function () {
                angular.element('.dlgWindow').attr('aria-label', 'Modal View');
                angular.element("#dialog-title")
                    .attr('tabindex', '0')
                    .css('outline', 0)
                    .on('blur', function () {
                        $(this).removeAttr('tabindex');
                    }).focus();
            });

            modalInstance.result.then(function () {
                //on ok button press 
            }, function () {
                //on cancel button press
                console.log("Modal Closed");
            });
        };
    }])
    .controller('Nav', ['$scope', function ($scope) {
    }])
    .controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', '$uibModal', 'item', function ($scope, $uibModalInstance, $uibModal, item) {

        $scope.item = item;

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);