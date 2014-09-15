angular.module('uiRouterSample')

    .directive('diList', function () {
        return {
            restrict: 'E',
            templateUrl: "directives/list/list.html",
            replace: true,
            scope: {
                length: "@",
                page: "@"
            },
            link: function(scope) {
                var length = scope.length || 6;
                scope.items = [];
                for (var i = 0; i < length; i++) {scope.items[i] = i}
            }
        };
    });