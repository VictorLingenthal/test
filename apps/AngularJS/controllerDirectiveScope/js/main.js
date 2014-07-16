var app = angular.module("choreApp", []);

app.controller("ChoreCtrl", function($scope) {
    $scope.logChore = function() {
        alert("It is done!");
    }
})

app.directive("kid", function() {
    return {
        restrict: "E",
        scope: {
            done: "&"
        },
        template: ' <div class="button" ng-click="done()">I\'m done!</div>'
    }
})