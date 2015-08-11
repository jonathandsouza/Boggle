 angular
     .module('BoggleApplication', ['ngRoute'])
     .config(function ($routeProvider, $locationProvider) {

         $routeProvider
             .when('/login', {
                 templateUrl: 'partials/login.html',
                 controller: 'loginController'
             })
             .when('/home', {

                 templateUrl: 'partials/main.html',
                 controller: 'AppWinController'
             })
             .when('/testing', {
                 templateUrl: 'partials/testing.html',
                 controller: 'TestingController'
             })
             .otherwise({
                 redirectTo: '/testing'
             });


         $locationProvider.hashPrefix('!');

         $locationProvider.html5Mode({
             enabled: false,
             requireBase: false
         });
     });