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

                var drop = new BetaJS.UI.Interactions.Drop(element, {
                    enabled: true,
                    droppable: function () {
                        return true;
                    },
                    bounding_box: function (bb) {
                        var height = bb.bottom - bb.top + 1;
                        var margin = Math.floor(height * 0.2);
                        bb.top += margin;
                        bb.bottom -= margin;
                        return bb;
                    }
                });
                drop.on("hover", function (dr) {
                    dr.modifier.css("background-color", "green");
                });
                drop.on("hover-invalid", function (dr) {
                    dr.modifier.css("background-color", "gray");
                });
                drop.on("dropped", function () {
//                    alert("yeah");
                });

            }
        };
    });