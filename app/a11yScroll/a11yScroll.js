'use strict';

angular.module('a11yModule').directive('a11yScroll', ['a11yCommon', function (a11yCommon) {
    return {
        scope: true,
        link: function (scope, element, attrs) {
            var keys = a11yCommon.getKeyCodes();
            scope.scrollDiv = $('#' + attrs['a11yScroll']);
            $(element).on('keydown', function (e) {
                if (!(e.keyCode == keys.up || e.keyCode == keys.down || e.keyCode == keys.pageup || e.keyCode == keys.pagedown))
                    return;

                var multiplier = 1;
                if (e.keyCode == keys.up || e.keyCode == keys.pageup) multiplier = -1;
                scope.scrollDiv[0].scrollTop += multiplier * ((e.keyCode == keys.pageup || e.keyCode == keys.pagedown) ? 60 : 30);
                e.preventDefault();
            });
        }
    };
}])