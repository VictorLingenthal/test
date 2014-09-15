angular.module('uiRouterSample')

    .directive('diItem1', function () {
        return {
            restrict: 'E',
            templateUrl: "directives/list/item1/item1.html",
            replace: true,
            scope: {num: "@"},
            link: function(scope, element) {

                scope.number = scope.num || "none";

                var drag = new BetaJS.UI.Interactions.Drag(element, {
                    droppable: true,
                    clone_element: true,
                    enabled: true,
                    remove_element_on_drop: false
                });
                drag.on("start", function (dr) {
                    dr.modifier.css("background-color", "blue");
                    dr.actionable_modifier.css("background-color", "red");
                });

            }
        };
    });