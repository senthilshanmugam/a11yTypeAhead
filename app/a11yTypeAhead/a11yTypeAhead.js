'use strict';
a11yModule.directive('a11yTypeAhead', ['$timeout', '$sce', '$compile', 'a11yCommon', function ($timeout, $sce, $compile, a11yCommon) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            selectedText: '=',
            config: '=',
        },
        templateUrl: 'a11yTypeAhead/a11yTypeAhead.html',
        controller: function ($scope, $element) {
            var keys = a11yCommon.getKeyCodes();
            $scope.suggestions = null;
            var taTimerPromise = null;
            $scope.searchRequestCounter = 0;

            $timeout(function () {
                $scope.taLabel = $element.find('#' + $scope.config.a11yUid + '-label');
                $scope.taEdit = $element.find('#' + $scope.config.a11yUid + '-edit');
                $scope.taListBox = $element.find('#' + $scope.config.a11yUid + '-list');
                $scope.taOptions = $scope.taListBox.find('li');
                $scope.taSelected = $scope.taOptions.filter('.selected');
                if (!$scope.config.a11yAriaLabel) $scope.taLabel.text($scope.config.a11yUid + $scope.taLabel.text());
            }, 1);

            $scope.textBoxKeyDown = function (Event) {
                //console.log('textBoxKeyDown');
                var currentItem = $scope.taOptions.filter('.selected');
                var currentIndex = $scope.taOptions.index(currentItem);

                switch (Event.keyCode) {
                    case keys.tab: {
                        $scope.selectOption(currentItem, false); //currentItem[0] !== $scope.taSelected[0]);
                        if ($scope.isOpen() == true) {
                            $scope.hideOption();
                        }
                        return true;
                    }
                    case keys.esc: {
                        $scope.itemSelect($scope.taSelected, false);
                        $scope.taEdit.select();
                        if ($scope.isOpen() == true) {
                            $scope.hideOption();
                        }
                        Event.stopPropagation();
                        return false;
                    }
                    case keys.enter: {
                        if (Event.shiftKey || Event.altKey || Event.ctrlKey) {
                            return true;
                        }

                        if ($scope.isOpen() == false) {
                            if ($scope.taOptions.length > 0)
                                $scope.showOption();
                        }
                        else {
                            $scope.selectOption(currentItem, currentItem[0] !== $scope.taSelected[0]);
                            $scope.hideOption();
                            $timeout(function () { $scope.taEdit.focus(); }, 5);
                        }
                        $scope.taEdit.select();
                        Event.stopPropagation();
                        return false;
                    }
                    case keys.up: {
                        if (Event.shiftKey || Event.ctrlKey) {
                            return true;
                        }

                        if (Event.altKey && $scope.isOpen()) {
                            $scope.selectOption(currentItem, currentItem[0] !== $scope.taSelected[0]);
                            $scope.taEdit.select();
                            $scope.hideOption();
                        }
                        else {
                            if (currentIndex > 0) {
                                var prev = $scope.taOptions.eq(currentIndex - 1);

                                currentItem.removeClass('selected');
                                prev.addClass('selected');

                                if ($scope.isOpen() == true) {
                                    $scope.itemSelect(prev, false);
                                    $scope.taListBox.scrollTop($scope.getScrollPos(prev));
                                }
                                else {
                                    $scope.itemSelect(prev, true);
                                }

                                $timeout(function () { $scope.taEdit.select(); }, 1);
                            }
                        }

                        Event.stopPropagation();
                        return false;
                    }
                    case keys.down: {
                        if (Event.shiftKey || Event.ctrlKey) {
                            return true;
                        }

                        if (Event.altKey && !$scope.isOpen() && $scope.taOptions.length > 0) {
                            $scope.showOption();
                        }
                        else {
                            if (currentIndex < $scope.taOptions.length - 1) {
                                var prev = $scope.taOptions.eq(currentIndex + 1);

                                currentItem.removeClass('selected');
                                prev.addClass('selected');

                                if ($scope.isOpen() == true) {
                                    $scope.itemSelect(prev, false);
                                    $scope.taListBox.scrollTop($scope.getScrollPos(prev));
                                }
                                else {
                                    $scope.itemSelect(prev, true);
                                }

                                $timeout(function () { $scope.taEdit.select(); }, 1);
                            }
                        }

                        Event.stopPropagation();
                        return false;
                    }
                }
                return true;
            };

            $scope.textBoxKeyUp = function (Event) {
                //console.log('textBoxKeyUp');
                if (Event.shiftKey || Event.ctrlKey || Event.altKey) {
                    return true;
                }  // Check

                switch (Event.keyCode) {
                    case keys.shift:
                    case keys.ctrl:
                    case keys.alt:
                    case keys.esc:
                    case keys.tab:
                    case keys.enter:
                    case keys.left:
                    case keys.right:
                    case keys.up:
                    case keys.down:
                    case keys.home:
                    case keys.end: {
                        return true;
                    }
                }  //Check

                if (Event.keyCode == keys.backspace || Event.keyCode == keys.del) {
                    $scope.clearOption();
                }

                var searchString = $scope.taEdit.val();
                if (searchString.length >= $scope.config.searchTreshold) {
                    $timeout.cancel($scope.searchTimer);
                    $scope.searchTimer = $timeout(function () {
                        $('#' + $scope.config.a11yUid + '-result').text('Please wait while we fetch suggestions.');
                        function searchClosure(searchString, searchCounter) {
                            $scope.searchString = searchString;
                            $scope.config.onSearch(searchString).then(function (result) {
                                console.log('searchCounter ' + searchCounter + '  searchString ' + searchString + '  searchRC' + $scope.searchRequestCounter + '"');
                                if (searchCounter != $scope.searchRequestCounter) return;
                                console.log("passed");
                                $scope.searchRequestCounter = 0;
                                $scope.suggestions = result;
                                if (result.length > 0) {
                                    $timeout(function () {
                                        $scope.taOptions = $scope.taListBox.find('li');
                                        if ($scope.isFocus()) {
                                            $('#' + $scope.config.a11yUid + '-result').text('We have received ' + result.length + ' suggestions.  Please use up/down arrow to select');

                                            if (!$scope.isOpen()) {
                                                $scope.showOption();
                                            }
                                        }
                                        if ($scope.taEdit.val().length < $scope.searchTreshold) {
                                            $scope.clearOption("No Suggestions available.");
                                        } // check if this is needed
                                    }, 1);


                                }
                                else {
                                    $scope.clearOption("No Suggestions available.");
                                }
                            });
                        }
                        searchClosure(searchString, ++$scope.searchRequestCounter);
                    }, 500);
                }
                else {
                    if ($scope.isOpen()) {
                        $scope.clearOption("No Suggestions available.");
                    }
                }
                Event.stopPropagation();
                return false;
            }

            $scope.textBoxBlur = function (Event) {
                console.log('textBoxBlur');
                if ($scope.isOpen() == true) {
                    $scope.selectOption($scope.taOptions.filter('.selected'), false);
                    $timeout.cancel(taTimerPromise);
                    taTimerPromise = $timeout(function () {
                        $scope.hideOption();
                    }, 200);
                }

                $('#' + $scope.config.a11yUid + '-result').text("");

                $timeout(function () {
                    $scope.taEdit.removeAttr('aria-owns').removeAttr('aria-activedescendant');
                }, 1000);

                return true;
            }

            $scope.textBoxFocus = function (Event) {
                console.log('textBoxFocus');
                $timeout(function () {
                    $scope.taEdit.removeAttr('aria-owns').removeAttr('aria-activedescendant');
                    if (!$scope.taEdit.attr('aria-activedescendant') || $scope.taEdit.attr('aria-activedescendant') == "") {
                        if ($scope.taSelected.attr('id')) {
                            $scope.taEdit.attr('aria-owns', $scope.config.a11yUid + '-list').attr('aria-activedescendant', $scope.taSelected.attr('id'));
                        }
                    }
                }, 1000);
            }

            $scope.listBoxFocus = function (Event) {
                $timeout.cancel(taTimerPromise);
                $scope.taEdit.focus();

                Event.stopPropagation();
                return false;
            }

            $scope.listBoxClick = function (Event) {
                if (angular.element(Event.target)[0].nodeName == "UL")
                    return true;

                var currentItemId;
                if (Event.target.nodeName != "LI") {
                    currentItemId = '#' + $(Event.target).parents('li').attr('id')
                }
                else {
                    currentItemId = '#' + Event.target.id;
                }

                var currentItem = $scope.taOptions.filter(currentItemId);
                $scope.selectOption(currentItem, currentItem[0] !== $scope.taSelected[0]);
                $scope.taEdit.select(); // Check
                $scope.hideOption();
                $timeout(function () {
                    $scope.taEdit.focus();
                }, 200);

                Event.stopPropagation();
                return false;

            }

            $scope.itemSelect = function (itemSelected, itemSelectTrigger) {
                console.log('itemSelect "' + itemSelected.text() + '"');
                if (itemSelected.length == 0) return;

                var selectItemText;
                if ($scope.config.getOptionTemplate) {
                    selectItemText = $scope.config.getOptionText($scope.suggestions[$scope.taOptions.index(itemSelected)]);
                } else {
                    selectItemText = itemSelected.text();
                }

                $scope.taEdit.attr('aria-owns', $scope.config.a11yUid + '-list').attr('aria-activedescendant', itemSelected.attr('id'));
                if (itemSelectTrigger) {
                    $scope.taEdit.val(selectItemText);
                    $scope.taSelected = itemSelected;
                    if ($scope.selectedText)
                        $scope.selectedText = itemSelected.text();
                    $timeout(function () {
                        if ($scope.isFocus() && $scope.config.onSelect) $scope.config.onSelect();
                        $scope.clearOption();
                    }, 10);
                }
            }

            $scope.isFocus = function () {
                return (document.activeElement.id == $scope.taEdit.get(0).id);
            }

            $scope.isOpen = function () {
                return ($scope.taListBox.css('display') == 'block');
            };

            $scope.hideOption = function () {
                $scope.taOptions.removeClass('selected');
                $scope.taSelected.addClass('selected');
                $scope.taListBox.hide();
                $scope.taEdit.attr('aria-expanded', 'false');
            }

            $scope.showOption = function () {
                $scope.taOptions.removeClass('selected');
                $scope.taSelected.addClass('selected');
                $scope.taListBox.show();
                $scope.taEdit.attr('aria-expanded', 'true');

                $scope.taListBox.css({
                    'margin-left': $scope.taEdit.offset().left - $scope.taLabel.offset().left,
                    'width': $scope.taEdit.outerWidth()
                }).scrollTop(0);//$scope.getScrollPos($scope.taSelected)
            }

            $scope.selectOption = function (selectedOption, itemSelectTrigger) {
                $scope.taOptions.removeClass('selected');
                $scope.taSelected = selectedOption.addClass('selected');
                $scope.itemSelect($scope.taSelected, itemSelectTrigger);
            }

            $scope.clearOption = function (ariaMessage) {
                $('#' + $scope.config.a11yUid + '-result').text(ariaMessage);
                $scope.suggestions = null;
                $scope.taOptions = $scope.taOptions.filter(function () { return false; });
                $scope.hideOption();
            }

            $scope.selectText = function (start, end) {
                var editNode = $scope.taEdit.get(0);
                if (editNode.setSelectionRange) {
                    editNode.setSelectionRange(start, end);
                }
            }

            $scope.getScrollPos = function (selectedOption) {
                var scrollHeight = 0;
                $scope.taOptions.filter(':lt(' + $scope.taOptions.index(selectedOption) + ')').each(function () {
                    scrollHeight += $(this).outerHeight();
                });
                return scrollHeight;
            }

            $scope.getHtml = function (suggestion) {
                var optionTemplate;
                if ($scope.config.getOptionTemplate) {
                    optionTemplate = $scope.config.getOptionTemplate($scope.searchString, suggestion);
                } else {
                    optionTemplate = $scope.defaultTemplate(suggestion);
                }
                return $sce.trustAsHtml(optionTemplate);
            }

            $scope.defaultTemplate = function (suggestion) {
                if (typeof (suggestion) != "object")
                    return suggestion.toString();
                var keyNames = Object.keys(suggestion);
                var returnValue = '';

                for (i = 0; i < keyNames.length - 1; i++) {
                    returnValue += suggestion[keyNames[i]] + ' ';
                }

                return returnValue.trim();
            }
        }
    }
}]).directive('setOptionAriaLabel', ['$compile', function ($compile) {
    return {
        scope: true,
        link: function (scope, element, attrs) {
            var elmnt;
            attrs.$observe('id', function (myTemplate) {
                if (angular.isDefined(myTemplate)) {
                    if (!scope.config.getOptionTemplate) return;
                    $(element).attr("aria-label", scope.config.getOptionText(scope.suggestion));
                }
            });
        }
    };
}]);

