angular.module('uiRouterSample')

    .directive('diItem', function () {
        return {
            restrict: 'E',
            templateUrl: "directives/list/item/item.html",
            replace: true,
            scope: {
                num: "@",
                item: "@"
            },
            link: function(scope) {
                scope.number = scope.num || "none";
            }
        };
    });