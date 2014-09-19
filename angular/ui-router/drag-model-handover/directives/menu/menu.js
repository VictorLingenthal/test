angular.module('uiRouterSample')

    .directive('diMenu', function () {
        return {
            restrict: 'E',
            templateUrl: "directives/menu/menus.html",
            replace: true,
            controller: function($scope, $element, $state) {

                var drop1 = new BetaJS.UI.Interactions.Drop($('.page1'), {
                    enabled: true,
                    droppable: function () {
                        return true;
                    }
                });
                drop1.on('hover', function (dr) {
                    dr.modifier.css('background-color', 'green');
                    console.log(dr);
                    $state.go('main.page1');
                });
                drop1.on("hover-invalid", function (dr) {
                    dr.modifier.css("background-color", "gray");
                });
                drop1.on("dropped", function () {
                    //alert("yeah");
                });

            },
            scope: {},
            link: function(scope) {}
        };
    });