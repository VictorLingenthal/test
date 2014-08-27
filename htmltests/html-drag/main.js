var app = angular.module("dragApp", []);

app.controller('AppCtrl', function ($scope) {
   $scope.list = [];
    for (var i = 0; i<4; ++i)
        $scope.list[i] = "item " + i;

    $scope.drop = function (ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("Text");
        ev.target.appendChild(document.getElementById(data));
    }
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
}



