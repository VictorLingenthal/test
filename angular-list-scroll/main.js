var app = angular.module("superApp", []);
app.directive('scrolly', function () {
    return {
        restrict: 'E',
        replace: 'true',
        scope: {},
        controller: function ($scope,$element) {
            $scope.is = [];
            for (var i = 0; i < 50; i++) {$scope.is.push(i);}
            $scope.scrollto = function(a, b) {
                var u = $element.find('ul');
                if ((b == null) || (b == undefined)) {b = 500}
                u.animate({
                    scrollTop: a.offset().top - u.offset().top + u.scrollTop()
                }, b);
            };
        },
        templateUrl: 'template.html',
        link: function (scope, element, attrs) {
            var searchhidden = true;
            var u = element.find('ul');
            var e = u[0];
            setTimeout(function () {
                var id0 = $( "ul li:nth-child(1)" );
                var id1 = $( "ul li:nth-child(2)" );
                var h0 = id0.height();
                u.bind('scroll', function () {
                    scope.scroll = e.scrollTop;
                    scope.$digest();
                    scope.$parent.$digest();
                });
                u.bind("touchend", function() {

                    if (0 < scope.scroll && scope.scroll < h0) {
                        if (searchhidden) {
                            searchhidden = false;
                            scope.scrollto(id0);
                        }
                        else {
                            searchhidden = true;
                            scope.scrollto(id1);
                        }
                    }
                });
                scope.scrollto(id1, 0);
            }, 0);
        }
    };
});
function MyCtrl($scope) {}