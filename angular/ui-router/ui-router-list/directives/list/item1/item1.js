angular.module('uiRouterSample')

    .directive('diItem1', function () {
        return {
            restrict: 'E',
            templateUrl: "directives/list/item1/item1.html",
            replace: true,
            scope: {num: "@"},
            link: function(scope, element) {

                scope.number = scope.num || "none";

                add_hover_target(element, element, "self-hover");

                console.log("Scope Number: " + scope.number);

                console.log("Directive - Before draggable_list()");
                draggable_list(element, "item1", "focus", "unfocus", {
//                    finish: function () {
//                        droppable_list(element, this, $("dilist"), scope.items1, scope.items2, scope);
//                    }
                });
                console.log("Directive - After draggable_list()");
            }
        };
    });