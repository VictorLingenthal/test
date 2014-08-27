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

          .state('contacts', {
            abstract: true,
            url: '/contacts',
            templateUrl: '../sample/templates/contacts.html',
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
            templateUrl: '../sample/templates/contacts.list.html'
          })

          .state('contacts.detail', {
            url: '/{contactId:[0-9]{1,4}}',
            views: {
              '': {
                templateUrl: '../sample/templates/contacts.detail.html',
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
                templateUrl: '../sample/templates/contacts.detail.item.html',
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
                templateUrl: '../sample/templates/contacts.detail.item.edit.html',
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
