var app = angular.module("App", []);

app.controller('myCtrl', function ($scope) {
    $scope.items = [];
    for (var i = 0; i < 20; ++i)
        $scope.items[i] = i;
});