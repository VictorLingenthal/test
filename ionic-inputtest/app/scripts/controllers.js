'use strict';
angular.module('IonicInputtest.controllers', [])

.controller('list', function($scope) {
    $scope.items = ['ABC','AADC','Oliver.Friedmann','Victor.Lingenthal@googlemail.com','B'];
    $scope.keylog = [];
    $scope.count = 0;
    $scope.handleKeypress = function(key) {
        $scope.keylog.push(key);
        if (key == 13) {
            $scope.add();
        }
        else if (key == 8 && !($scope.additem)) {
            $scope.items.pop();
            $scope.count = $scope.count + 1;
        }
    };
    $scope.add = function() {
        if ($scope.additem != undefined) {
            $scope.items.push($scope.additem);
            $scope.additem = "";
        }
    };
})

.controller('AppCtrl', function($scope) {
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.directive('onKeyupFn', function() {
    return function(scope, elm, attrs) {
        var keyupFn = scope.$eval(attrs.onKeyupFn);
        elm.bind('keyup', function(evt) {
            scope.$apply(function() {
                keyupFn.call(scope, evt.which);
            });
        });
    };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
