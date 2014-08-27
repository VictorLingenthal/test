angular.module('uiRouterSample')
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {

        $urlRouterProvider
          .when('/c?id', '/contacts/:id')
          .when('/user/:id', '/contacts/:id')
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


            .state('list', {
//                abstract: true,
                url: '/list',
                templateUrl: 'templates/list/list.html'
            })

            .state('list.tests', {
                url: '/list.tests',
                templateUrl: 'templates/list/list.tests.html'
            })

            .state('list.page1', {
                url: '/list.page1',
                templateUrl: 'templates/list/list.page1.html'
            })

            .state('list.page2', {
                url: '/list.page2',
                templateUrl: 'templates/list/list.page2.html'
            })


          .state('contacts', {
            abstract: true,
            url: '/contacts',
            templateUrl: 'templates/contacts/contacts.html',
            resolve: {
              contacts: ['contacts',
                function( contacts){
                  return contacts.all();
                }]
            },
            controller: ['$scope', '$state', 'contacts', 'utils',
              function (  $scope,   $state,   contacts,   utils) {
                $scope.contacts = contacts;
                $scope.goToRandom = function () {
                  var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);
                  $state.go('contacts.detail', { contactId: randId });
                };
              }]
          })

          .state('contacts.list', {
            url: '',
            templateUrl: 'templates/contacts/contacts.list.html'
          })

          .state('contacts.detail', {
            url: '/{contactId:[0-9]{1,4}}',
            views: {
              '': {
                templateUrl: 'templates/contacts/contacts.detail.html',
                controller: ['$scope', '$stateParams', 'utils',
                  function (  $scope,   $stateParams,   utils) {
                    $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
                  }]
              },

              'hint@': {template: 'This is contacts.detail populating the "hint" ui-view'},

              'menuTip': {
                templateProvider: ['$stateParams',
                  function ($stateParams) {return '<hr><small class="muted">Contact ID: ' + $stateParams.contactId + '</small>'}]
              }
            }
          })

          .state('contacts.detail.item', {
            url: '/item/:itemId',
            views: {
              '': {
                templateUrl: 'templates/contacts/contacts.detail.item.html',
                controller: ['$scope', '$stateParams', '$state', 'utils',
                  function (  $scope,   $stateParams,   $state,   utils) {
                    $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);
                    $scope.edit = function () {$state.go('.edit', $stateParams)};
                  }]
              },
              'hint@': {template: ' This is contacts.detail.item overriding the "hint" ui-view'}
            }
          })

          .state('contacts.detail.item.edit', {
            views: {
              '@contacts.detail': {
                templateUrl: 'templates/contacts/contacts.detail.item.edit.html',
                controller: ['$scope', '$stateParams', '$state', 'utils',
                  function (  $scope,   $stateParams,   $state,   utils) {
                    $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);
                    $scope.done = function () {$state.go('^', $stateParams);};
                  }]
              }
            }
          })

          .state('about', {
            url: '/about',
            templateProvider: ['$timeout',
              function ($timeout) {
                return $timeout(function () {
                  return '<p class="lead">UI-Router Resources</p><ul>' +
                           '<li><a href="https://github.com/angular-ui/ui-router/tree/master/sample">Source for this Sample</a></li>' +
                           '<li><a href="https://github.com/angular-ui/ui-router">Github Main Page</a></li>' +
                           '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' +
                           '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' +
                           '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' +
                         '</ul>';
                }, 100);
              }]
          })
      }]);
