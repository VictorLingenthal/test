angular.module('uiRouterSample')
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {

        $urlRouterProvider
          .otherwise('/');

        $stateProvider

            .state('main', {
                url: '/',
                templateUrl: 'templates/main.html'
            })

            .state('main.test', {
                url: 'test',
                templateUrl: 'templates/test.html'
            })

            .state('main.page1', {
                url: 'page1',
                templateUrl: 'templates/page.html',
                controller: ['$scope', '$stateParams',
                    function (  $scope,   $stateParams) {
                        $scope.page = 1;
                        $scope.length = 12;
                    }]
            })

            .state('main.page2', {
                url: 'page2',
                templateUrl: 'templates/page.html',
                controller: ['$scope', '$stateParams',
                    function (  $scope,   $stateParams) {
                        $scope.page = 2;
                        $scope.length = 12;
                    }]
            })

      }]);