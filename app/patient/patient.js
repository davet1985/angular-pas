'use strict';

angular.module('myApp.patient', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/patients', {
      templateUrl: 'patient/list.html',
      controller: 'PatientCtrl'
    })
    .when('/patient', {
      templateUrl: 'patient/create.html',
      controller: 'PatientCtrl'
    })
    .when('/patient/:id', {
      templateUrl: 'patient/patient.html',
      controller: 'PatientCtrl'
    });
}])

.controller('PatientCtrl', [function() {

}]);