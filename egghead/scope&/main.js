var app = angular.module("scopeApp", []);

app.controller("AppCtrl", function($scope) {
    var obj = {a:"ObjectStart"};
    $scope.obj = obj;
    $scope.result = "Startresult";
    $scope.callHome = function(message, def) {
        console.log(message);
        $scope.result= message + def.a;
    }
});


app.directive("sender", function() {
    return {
        scope: {
            dial: "&"
        },
        template: '<input type="text" ng-model="value">' +
            '<button ng-click="dial({message:value, def:abc})">Call home!</button>',
        link: function (scope) {
            var obj = {a:3, b:3};
            scope.abc = obj;
        }
    }
});

app.directive("receiver", function() {
    return {
        scope: {
            show: "@"
        },
        replace: true,
        template: '<div>Receiver String: {{show}}</div>',
//        link: function (scope) {
//            scope.show = "Hi";
//        }
    }
});

app.directive("receiverobject", function() {
    return {
        scope: {
            show: "@"
        },
        replace: true,
        template: '<div>Receiver Object: {{halleluja}}</div>',
        link: function (scope) {
//            console.log(scope.show);
//            console.log(typeof scope.show);
//            for (var key in scope.show) {
//                console.log("Key='" + key + "', Value='" + scope.show[key] + "'");
//            }
//
            scope.halleluja = scope.show.a;
        }
    }
});