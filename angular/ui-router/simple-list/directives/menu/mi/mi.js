angular.module('uiRouterSample')

    .directive('diMi', function () {
        return {
            restrict: 'E',
            templateUrl: "directives/menu/mi/mi.html",
            replace: true,
            controller: function($scope, $element, $state) {

                var drop = new BetaJS.UI.Interactions.Drop($element, {
                    enabled: true,
                    droppable: function () {
                        return true;
                    }
                });
                drop.on('hover', function (dr) {
                    dr.modifier.css('background-color', 'green');
                    console.log(dr);
                    $state.go('main.' + $scope.name);
                });
                drop.on("hover-invalid", function (dr) {
                    dr.modifier.css("background-color", "gray");
                });
                drop.on("dropped", function () {
                    //alert("yeah");
                });

            },
            scope: {
                name: "@"
            },
            link: function(scope) {}
        };
    });