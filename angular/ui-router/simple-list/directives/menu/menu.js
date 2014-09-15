angular.module('uiRouterSample')

    .directive('diMenu', function () {
        return {
            restrict: 'E',
            templateUrl: "directives/menu/menu.html",
            replace: true,
            controller: function($scope, $element, $state) {

                //$("mi").each(function () {
                    var element = $(this);
                    //var element = $("#test");
                    var drop = new BetaJS.UI.Interactions.Drop($element, {
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
                    drop.on('hover', function (dr) {
                        dr.modifier.css('background-color', 'green');
                        $state.go('main.page2');
                    });
                    drop.on("hover-invalid", function (dr) {
                        dr.modifier.css("background-color", "gray");
                    });
                    drop.on("dropped", function () {
                        //alert("yeah");
                    });

                //});

            },
            scope: {
            },
            link: function(scope) {
            }
        };
    });