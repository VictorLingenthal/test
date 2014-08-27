angular.module('uiRouterSample')

    .directive('diItem1', function () {
        return {
            restrict: 'E',
            templateUrl: "directives/list/item1/item1.html",
            replace: true,
            scope: {num: "@"},
            link: function(scope) {
                scope.number = scope.num || "none";
            }
        };
    });