angular.module('uiRouterSample')

    .controller('TestCtrl', function ($scope) {
        $scope.value = "Hello";
    })

    .directive('test', function () {
        return {
            restrict: 'E',
            templateUrl: "templates/test.html",
            replace: false,
            controller: function($scope) {}
        };
    });