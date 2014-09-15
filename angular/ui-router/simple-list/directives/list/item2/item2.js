angular.module('uiRouterSample')

    .directive('diItem2', function () {
        return {
            restrict: 'E',
            templateUrl: "directives/list/item2/item2.html",
            replace: true,
            scope: {num: "@"},
            link: function(scope,element) {
                scope.number = scope.num || "none";

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