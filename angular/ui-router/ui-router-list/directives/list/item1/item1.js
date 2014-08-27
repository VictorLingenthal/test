angular.module('uiRouterSample')

    .directive('diItem1', function () {
        return {
            restrict: 'E',
            templateUrl: "directives/list/item1/item1.html",
            replace: true,
            scope: {num: "@"},
            link: function(scope, element) {
                scope.number = scope.num || "none";
                BetaJS.SyncAsync.eventually(function() {
                    $(element).find(".inner").each(function() {
                        BetaJS.UI.Gestures.register(this, BetaJS.UI.Gestures.draggableMachine({}, {
                            semi_start : function() {
                                var doodad = $(this);
                                doodad.css("background","red");
                                $(element).find(".inner").addClass("unfocus");
                                doodad.removeClass("unfocus");
                                doodad.addClass("focus");
                            },
                            semi_finish : function() {
                                $(element).find(".inner").removeClass("unfocus focus");
                            },
                            finish: function () {
                                var data = $(this).data("item");
                                for (var i = 0; i < scope.items1.length; ++i)
                                    if (scope.items1[i].t == data.t)
                                        scope.items1.splice(i,1);
                                scope.items2.push(data);
                                BetaJS.SyncAsync.eventually(function () {
                                    scope.$digest();
                                });
                            }
                        }));
                    });
                });
            }
        };
    });