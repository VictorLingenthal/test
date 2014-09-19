function replace_directive(scope, element, compile) {
    element.html(element.html().replace(/(<[/\w]*)directive\w*:{{([^}]+)}}/g, function (match, prefix, variable) {
        return prefix + scope[variable];
    }));
    compile(element.contents())(scope);
}

angular.module('uiRouterSample')

    .directive('diItem', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: "directives/list/item/item.html",
            replace: true,
            scope: {
                num: "@",
                item: "@"
            },
            controller: function($scope) {
                $scope.dir_name = "di-item" + $scope.item;
            },
            link: function(scope,element) {
                replace_directive(scope, element, $compile);
                scope.number = scope.num || "none";
            }
        };
    });