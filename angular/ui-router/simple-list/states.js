angular.module('uiRouterSample')
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {

        $urlRouterProvider
          .otherwise('/');

        $stateProvider

            .state("home", {
                url: "/",
                template: '<p class="lead">Welcome to the UI-Router Demo</p>' +
                    '<p>Use the menu above to navigate. ' +
                    'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' +
                    '<p>Click these links—<a href="#/c?id=1">Alice</a> or ' +
                    '<a href="#/user/42">Bob</a>—to see a url redirect in action.</p>'
            })

            .state('directives', {
                url: '/directives',
                templateUrl: 'templates/directives/directives.html'
            })

            .state('directives.tests', {
                url: '/directives.tests',
                templateUrl: 'templates/directives/directives.tests.html'
            })

            .state('directives.page1', {
                url: '/directives.page1',
                templateUrl: 'templates/directives/directives.page1.html'
            })

            .state('directives.page2', {
                url: '/directives.page2',
                templateUrl: 'templates/directives/directives.page2.html'
            })


      }]);
