a11yModule.directive('a11yTypeAhead', ['$timeout', 'a11yCommon', function ($timeout, a11yCommon) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            a11yUid: '=',
            selectedText: '=',
            onSelect: '&',
            ariaLabelButton: '@',
            a11yAriaLabel: '@',
            preSelected: '='
        },
        templateUrl: 'Components/a11yTypeAhead/a11yTypeAhead.html',
        link: function (scope, element, attr) {
            keys = new a11yCommon.getKeyCodes();
            scope.states = a11yCommon.USStates;
            taTimerPromise = null;

            $timeout(function () {
                scope.taListBox = element.find('#' + scope.a11yUid + '-list');
                scope.taOptions = scope.taListBox.find('li');
                scope.taEdit = element.find('#' + scope.a11yUid + '-edit');
                scope.taSelected = scope.taOptions.filter('.selected');

                if (scope.preSelected >= 0) {
                    scope.taOptions.eq(scope.preSelected).addClass('selected');
                    scope.taSelected = scope.taOptions.filter('.selected');
                    //scope.taEdit.attr('aria-activedescendant', scope.taSelected.attr('id'));
                }
                scope.taEdit.val(scope.taSelected.text());

                scope.taButton = element.find('#' + scope.a11yUid + '-button');
                scope.taLabel = element.find('#' + scope.a11yUid + '-label');

                if (scope.taButton.attr('aria-label') == "")
                    scope.taButton.attr('aria-label', 'testLabel');
                if (scope.taLabel.text() == "")
                    scope.taLabel.text('States');
            }, 200);

            scope.textBoxKeyDown = function (Event) {
                var curOption = scope.taOptions.filter('.selected');
                var curNdx = scope.taOptions.index(curOption);

                switch (Event.keyCode) {
                    case keys.tab: {
                        // Save the current selection
                        scope.selectOption(curOption, true);

                        if (scope.isOpen() == true) {
                            scope.hideOption(false);
                        }

                        // allow tab to propagate
                        return true;
                    }
                    case keys.esc: {
                        // Discard the changes by selecting the taSelected

                        scope.itemSelect(scope.taSelected, false);
                        scope.taEdit.select();

                        if (scope.isOpen() == true) {
                            scope.hideOption(true);
                        }

                        Event.stopPropagation();
                        return false;
                    }
                    case keys.enter: {
                        if (Event.shiftKey || Event.altKey || Event.ctrlKey) {
                            return true;
                        }

                        if (scope.isOpen() == false) {
                            scope.showOption(false);
                        }
                        else {
                            // Save the current selection and close
                            scope.selectOption(curOption, true);
                            scope.hideOption(false);
                            $timeout(function () { scope.taEdit.focus(); }, 500);
                        }
                        scope.taEdit.select();
                        Event.stopPropagation();
                        return false;
                    }
                    case keys.up: {

                        if (Event.shiftKey || Event.ctrlKey) {
                            return true;
                        }

                        var curOption = scope.taOptions.filter('.selected');

                        if (Event.altKey && scope.isOpen()) {
                            // alt up / down toggles the list
                            //if (scope.isOpen()) {
                            scope.selectOption(curOption, true);
                            scope.taEdit.select();
                            scope.hideOption(false);
                            /*}
                            else {
                                scope.showOption(false);
                            }*/
                        }
                        else {
                            // up / down moves selection to next / previous items

                            if (curNdx > 0) {
                                var prev = scope.taOptions.eq(curNdx - 1);

                                // Reset the selected class to current selection
                                curOption.removeClass('selected');
                                prev.addClass('selected');

                                // If list is open update the text box and scroll
                                // else itemSelect
                                if (scope.isOpen() == true) {
                                    //scope.taEdit.val(prev.text());// changed to itemSelect
                                    scope.itemSelect(prev, false);
                                    scope.taListBox.scrollTop(scope.calcOffset(prev));
                                }
                                else {
                                    scope.itemSelect(prev, true);
                                }

                                scope.taEdit.select();
                            }
                        }

                        Event.stopPropagation();
                        return false;
                    }
                    case keys.down: {
                        if (Event.shiftKey || Event.ctrlKey) {
                            return true;
                        }

                        var curOption = scope.taOptions.filter('.selected');
                        if (Event.altKey && !scope.isOpen()) {  //added not scope isopen to prevent double alt down to close
                            // alt up / down toggles the list

                            /*if (scope.isOpen() == true) {
                                scope.selectOption(curOption, true);
                                scope.taEdit.select();
                                scope.hideOption(true);
                            }
                            else {*/
                            scope.showOption(false);
                            //}
                        }
                        else {
                            // up / down moves selection to next / previous items

                            if (curNdx != scope.taOptions.length - 1) {
                                var prev = scope.taOptions.eq(curNdx + 1);

                                // Reset the selected class to current selection
                                curOption.removeClass('selected');
                                prev.addClass('selected');

                                // If list is open update the text box and scroll
                                // else itemSelect
                                if (scope.isOpen() == true) {
                                    //scope.taEdit.val(prev.text());//changed to itemSelect false
                                    scope.itemSelect(prev, false);
                                    scope.taListBox.scrollTop(scope.calcOffset(prev));
                                }
                                else {
                                    scope.itemSelect(prev, true);
                                }

                                scope.taEdit.select();
                            }
                        }

                        Event.stopPropagation();
                        return false;
                    }
                }
                return true;
            };

            scope.textBoxKeyUp = function (Event) {
                var val = scope.taEdit.val();
                var re = new RegExp('^' + val, 'i');

                if (Event.shiftKey || Event.ctrlKey || Event.altKey) {
                    return true;
                }

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
                }

                // repopulate the list make all items visible and remove the selection highlighting
                scope.taOptions = scope.taListBox.find('li').removeClass('hidden').removeClass('selected');

                if (val.length == 0) {
                    // if the list box is visible, scroll to the top
                    if (scope.isOpen() == true) {
                        scope.taListBox.scrollTop(0);
                    }
                }
                else {
                    // recreate the list including only options that match
                    // what the user typed
                    scope.taOptions = scope.taOptions.filter(function (index) {

                        if (re.test($(this).text()) == true) {
                            return true;
                        }
                        else {
                            // hide those entries that do not match
                            $(this).addClass('hidden');

                            return false;
                        }
                    });
                }

                if (scope.taOptions.length > 0) {
                    var newOption = scope.taOptions.first();
                    var newVal = newOption.text();
                    var start = val.length;
                    var end = newVal.length;
                    var editNode = scope.taEdit.get(0);

                    if (Event.keyCode != keys.backspace) {
                        // if the user isn't backspacing, fill in the
                        // suggested value.
                        //scope.taEdit.val(newVal);
                        scope.itemSelect(newOption, false);
                    }

                    // Select the auto-complete text
                    scope.selectText(start, end);

                    // Reset the highlighting for the list
                    scope.taOptions.removeClass('selected');

                    newOption.addClass('selected');
                }

                // Show the list if it is hidden
                if (scope.isOpen() == false) {
                    scope.showOption(false);
                }

                Event.stopPropagation();
                return false;
            } // end handleEditKeyUp()

            scope.textBoxKeyPress = function (Event) {
                if (Event.altKey && (Event.keyCode == keys.up || Event.keyCode == keys.down)) {
                    Event.stopPropagation();
                    return false;
                }

                switch (Event.keyCode) {
                    case keys.enter:
                    case keys.up:
                    case keys.down: {
                        Event.stopPropagation();
                        return false;
                    }
                }

                return true;

            } // end handleOptionKeyPress()

            scope.textBoxBlur = function (Event) {
                console.log('handleEditBlur' + scope.a11yUid);
                //store the current selection
                scope.prevListBoxOpenedState = false;
                if (scope.isOpen() == true) {
                    scope.selectOption(scope.taOptions.filter('.selected'), false);

                    $timeout.cancel(taTimerPromise);
                    taTimerPromise = $timeout(function () {
                        scope.hideOption(false);
                    }, 200);

                    scope.prevListBoxOpenedState = true;
                }
                scope.taEdit.removeAttr('aria-activedescendant')
                // allow tab to propagate
                return true;
            }

            scope.textBoxFocus = function (Event) {
                $timeout(function () {
                    if (!scope.taEdit.attr('aria-activedescendant') || scope.taEdit.attr('aria-activedescendant') == "") {
                        if (scope.taSelected.attr('id')) {
                            scope.taEdit.attr('aria-activedescendant', scope.taSelected.attr('id'));
                        }
                        else {
                            scope.taEdit.attr('aria-activedescendant', scope.a11yUid + '-none');
                        }
                    }
                }, 1000);
            }

            scope.listBoxBlur = function (Event) {
                console.log('handleBlur' + scope.a11yUid);

                // store the currently selected value
                scope.selectOption(scope.taOptions.filter('.selected'), false);

                Event.stopPropagation();
                return false;

            } // end handleComboBlur()

            scope.listBoxFocus = function (Event) {
                console.log('handleFocus' + scope.a11yUid);

                scope.selectOption(scope.taOptions.filter('.selected'), false);

                $timeout.cancel(taTimerPromise);

                // set focus on the edit box
                scope.taEdit.focus();

                Event.stopPropagation();
                return false;

            } // end handleComboFocus()

            scope.listBoxClick = function (Event) {
                //                if (angular.element(Event.target).hasClass('cb_list'))
                if (angular.element(Event.target)[0].nodeName == "UL")
                    return true;
                // select the clicked item
                scope.selectOption(scope.taOptions.filter('#' + Event.target.id), true);

                // set focus on the edit box
                $timeout(function () {
                    scope.taEdit.focus();
                }, 200);
                // close the list
                scope.hideOption(false);

                Event.stopPropagation();
                return false;

            } // end handleOptionClick()

            scope.dropDownClick = function (Event) {
                $timeout(function () {
                    if (!scope.prevListBoxOpenedState) {
                        scope.showOption(true)
                    }
                    // Set focus on the edit box
                    scope.taEdit.focus();
                }, 200);

                scope.taButton.find('.tri').addClass('down');
                Event.stopPropagation();
                return false;

            } // end dropDownButtonClick();

            scope.dropDownMouseUp = function (Event) {
                if (scope.taButton.find('.tri').hasClass('pressed')) {
                    scope.taButton.find('.tri').removeClass('down').removeClass('pressed');
                } else {
                    scope.taButton.find('.tri').removeClass('down').addClass('pressed');
                }
            }

            scope.itemSelect = function (itemSelected, itemSelectTrigger) {
                scope.taEdit.val(itemSelected.text());
                scope.taEdit.attr('aria-activedescendant', itemSelected.attr('id'));
                if (itemSelectTrigger) {
                    scope.selectedText = itemSelected.attr('data-code') + ' ' + itemSelected.text();
                    $timeout(function () {
                        scope.onSelect();
                    }, 200);
                }
            }

            scope.isOpen = function () {
                //console.log('isOpen' + scope.a11yUid + scope.taListBox.attr('aria-expanded'));
                return (scope.taListBox.attr('aria-expanded') == 'true');
            };

            scope.hideOption = function (selectItem) {
                //console.log('closeList ' + Date.now().toString());
                var curOption = scope.taOptions.filter('.selected');

                if (selectItem == true) {
                    curOption = scope.taSelected;

                    // remove the selected class from the other list items
                    scope.taOptions.removeClass('selected');

                    // add selected class to the stored selection
                    curOption.addClass('selected');
                }

                scope.taListBox.hide().attr('aria-expanded', 'false');

                if (!scope.taButton.find('.tri').hasClass('down')) {
                    scope.taButton.find('.tri').removeClass('pressed');
                }
                scope.taEdit.attr('aria-expanded', 'false');

            } // end scope.hideOption()

            scope.showOption = function (selectItem) {
                //console.log('openList ' + Date.now().toString());
                var curOption = scope.taOptions.filter('.selected');

                if (selectItem == true) {
                    curOption = scope.taSelected;

                    // remove the selected class from the other list items
                    scope.taOptions.removeClass('selected');

                    // add selected class to the stored selection
                    curOption.addClass('selected');
                }

                scope.taListBox.show().attr('aria-expanded', 'true');
                if (!scope.taButton.find('.tri').hasClass('down')) {
                    scope.taButton.find('.tri').addClass('pressed');
                }
                if (scope.taSelected.length == 0) {
                    //
                    // select the first item
                    scope.selectOption(scope.taOptions.first(), false);
                    curOption = scope.taSelected;
                }
                //
                // scroll to the currently selected option
                scope.taListBox.scrollTop(scope.calcOffset(curOption));
                scope.taListBox.css('margin-left', scope.taEdit.offset().left - scope.taLabel.offset().left);
                scope.taListBox.css('width', scope.taEdit.outerWidth() + scope.taButton.outerWidth());
                scope.taEdit.attr('aria-expanded', 'true');

            } // end scope.showOption();

            scope.selectOption = function ($id, itemSelectTrigger) {

                // remove the selected class from the list
                scope.taOptions.removeClass('selected');

                // add the selected class to the new option
                $id.addClass('selected');

                // store the newly selected option
                scope.taSelected = $id;

                // update the edit box
                //scope.taEdit.val($id.text());
                scope.itemSelect($id, itemSelectTrigger);

                //move cursor to the end
                scope.selectText(scope.taEdit.val().length, scope.taEdit.val().length);

                // reset the option list
                scope.taOptions = scope.taListBox.find('li').removeClass('hidden');

            } // end scope.selectOption

            scope.selectText = function (start, end) {

                var editNode = scope.taEdit.get(0);

                if (editNode.setSelectionRange) {
                    // Firefox and other gecko based browsers
                    editNode.setSelectionRange(start, end);
                }
            } // end scope.selectText()

            scope.calcOffset = function (selectedOption) {
                var offset = 0;
                offset = (scope.taOptions.filter(':lt(' + scope.taOptions.index(selectedOption) + ')').filter(':not("[class=hidden]")').length - 1) * scope.taOptions.eq(-1).outerHeight();
                return (offset > 0 ? offset : 0);
            }
        }
    }
}]);