angular.module('uiRouterSample')
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {

        $urlRouterProvider
          .otherwise('/directives');

        $stateProvider

            .state('list', {
//                abstract: true,
                url: '/list',
                templateUrl: 'templates/list.html'
            })

            .state('list.tests', {
                url: '/list.tests',
                templateUrl: 'templates/list.tests.html'
            })

            .state('list.page1', {
                url: '/list.page1',
                templateUrl: 'templates/list.page1.html'
            })

            .state('list.page2', {
                url: '/list.page2',
                templateUrl: 'templates/list.page2.html'
            })

            .state('directives', {
                url: '/directives',
                templateUrl: 'templates/list_directives.html'
            })

            .state('directives.tests', {
                url: '/directives.tests',
                templateUrl: 'templates/directives.tests.html'
            })

            .state('directives.page1', {
                url: '/directives.page1',
                templateUrl: 'templates/directives.page1.html'
            })

            .state('directives.page2', {
                url: '/directives.page2',
                templateUrl: 'templates/directives.page2.html'
            })
      }]);