'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/home/home.html',
      controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', [function() {

}]);