angular.module('uiRouterSample')

    .directive('diItem2', function () {
        return {
            restrict: 'E',
            templateUrl: "directives/list/item2/item2.html",
            replace: true,
            scope: {num: "@"},
            link: function(scope) {
                scope.number = scope.num || "none";
            }
        };
    });