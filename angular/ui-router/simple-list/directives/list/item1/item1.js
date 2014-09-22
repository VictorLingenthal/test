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
                    enabled : true,
                    clone_element: true,
                    start_event: null,
                    droppable: true
                }, {
                	// add any other data you want to carry along
                	number: scope.number
                });
            
                var drag_gesture = new BetaJS.UI.Gestures.Gesture(drag.element(), BetaJS.UI.Gestures.defaultGesture({
                    mouse_up_activate: false,
                    wait_time: 250,
                    wait_activate: true,
                    disable_x: 10,
                    disable_y: 10,
                    enable_x: -1,
                    enable_y: -1,
                }));
                drag_gesture.on("activate", drag.start, drag);
                drag_gesture.on("deactivate", drag.stop, drag);
                drag.on("move", function (event) {
                    event.actionable_modifier.csscls("focus", true);
                    event.modifier.csscls("unfocus", true);
                });

                var actions = {
                    "other": {less: -1/4},
                    "archive": {greater: 1/4, less: 1/3},
                    "delete": {greater: 1/3}
                };
                BetaJS.UI.Interactions.Drag.multiple(element, {
                    enabled : true,
                    draggable_y: false,
                    start_event: null
                }, function (drag) {
                    var drag_gesture = new BetaJS.UI.Gestures.Gesture(drag.element(), BetaJS.UI.Gestures.defaultGesture({
                        mouse_up_activate: false,
                        wait_time: 250,
                        wait_activate: false,
                        disable_x: -1,
                        disable_y: 10,
                        enable_x: 10,
                        enable_y: -1,
                    }));
                    drag_gesture.on("activate", drag.start, drag);
                    drag_gesture.on("deactivate", drag.stop, drag);
                    drag.on("move", function (event) {
                        var element = event.element;
                        var parent = element.parent();
                        var x = parseInt(element.css("left"), 10);
                        var w = parseInt(element.css("width"), 10);
                        var a = {};
                        for (var cls in actions) {
                            a = actions[cls];
                            if ((!a.less || x <= w * a.less) && (!a.greater || x >= w * a.greater))
                                parent.addClass(cls);
                            else
                                parent.removeClass(cls);
                        }
                    });
                    drag.on("release", function (event) {
                        var element = event.element;
                        var parent = element.parent();
                        var x = parseInt(element.css("left"), 10);
                        var w = parseInt(element.css("width"), 10);
                        for (var cls in actions) {
                            a = actions[cls];
                            if ((!a.less || x <= w * a.less) && (!a.greater || x >= w * a.greater)) {
                                event.source.abort();
                                parent.slideUp();
                            }
                        }
                    });
                });
                var click_gesture = new BetaJS.UI.Gestures.Gesture(element, BetaJS.UI.Gestures.defaultGesture({
                    mouse_up_activate: true,
                    wait_time: 250,
                    wait_activate: false,
                    disable_x: -1,
                    disable_y: -1,
                    enable_x: -1,
                    enable_y: -1,
                }));
                click_gesture.on("activate", function () {
                    alert("click");
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