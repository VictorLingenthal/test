var app = angular.module("dragApp", []);

app.controller('AppCtrl', function ($scope) {
   $scope.list = [];
    for (var i = 0; i<4; ++i)
        $scope.list[i] = "item " + i;
});

app.directive('draggable', function($document) {
    return function(scope, element, attr) {
        var startX = 0, startY = 0, x = 0, y = 0;
        element.css({
            position: 'relative',
            border: '1px solid red',
            backgroundColor: 'lightgrey',
            cursor: 'pointer'
        });
        element.on('mousedown', function(event) {
            // Prevent default dragging of selected content
            event.preventDefault();
            startX = event.screenX - x;
            startY = event.screenY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
            y = event.screenY - startY;
            x = event.screenX - startX;
            element.css({
                top: y + 'px',
                left:  x + 'px'
            });
        }

        function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
        }
    };
});


app.directive('draggabley', function($document) {
    return function(scope, element, attr) {
        var el = element;
        var parent = element.parent();
        var pos = null;

        var startX = 0, startY = 0, x = 0, y = 0;

        element.css({
            position: 'relative',
            cursor: 'pointer'
        });
        element.on('mousedown', function(event) {
            // Prevent default dragging of selected content
            event.preventDefault();
            element.css({
                border: '1px solid red',
                background: 'grey',
                zIndex: 2
            });
            //startX = event.screenX - x;
            startY = event.screenY - y;
            console.log("startY: " + startY);
            console.log(element);
            console.log(parent);
            //el.remove();
            el.css("display", "none");
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
            if (!pos) {
                pos = event.screenY;
                console.log("pos: " + pos);
            }
            y = event.screenY - pos;
            //x = event.screenX - startX;
            console.log(y);
            element.css({
                top: y + 'px'
              //  left:  x + 'px'
            });
        }

        function mouseup() {
            parent.append(el);
            pos = null;
            console.log("mouseup");
            console.log(el);
            el.css({
                background: 'none',
                border: 'none',
                zIndex: '1',
                top: '',
                display: ""
            });
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
        }
    };
});