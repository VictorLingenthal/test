var app = angular.module("superApp", []);

app.controller('test', function($scope) {
    $scope.test = "Hello";
});

app.directive("pagedirective", function() {
    return {
        restrict: "E",
        templateUrl: "page.html",
        replace: true,
        controller: function($scope) {
            $scope.name = "Button";
            $scope.directive = "insidedirective";
        },
        link: function(scope, element) {
        }
    }
});

app.directive("insidedirective", function() {
    return {
        restrict: "E",
        templateUrl: "inside.html",
        replace: true,
        controller: function($scope) {
            $scope.name = "Button";
        },
        link: function(scope, element) {
        }
    }
});

