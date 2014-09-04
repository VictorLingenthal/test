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
            link: function(scope,element) {
                scope.number = scope.num || "none";
                add_hover_target(element, element, "self-hover");
                add_hover_target(element, "dilist", "foreign-hover");
                draggable_list(element, "item", "focus", "unfocus", {
                    finish: function () {
                        droppable_list(element, this, $("dilist"), scope.items1, scope.items2, scope);
                    }
                });
            }
        };
    });