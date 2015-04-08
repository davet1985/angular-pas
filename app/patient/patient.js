'use strict';

angular.module('myApp.patient', ['ngRoute', 'ngResource', 'configService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/patients', {
      templateUrl: 'patient/list.html',
      controller: 'PatientListCtrl'
    })
    .when('/patient', {
      templateUrl: 'patient/create.html',
      controller: 'PatientListCtrl'
    })
    .when('/patient/:id', {
      templateUrl: 'patient/patient.html',
      controller: 'PatientViewCtrl'
    })
    .when('/patient/:id/edit', {
      templateUrl: 'patient/patient-edit.html',
      controller: 'PatientEditCtrl'
    });
}])

.factory('Patient', function($resource, configService) {
  return $resource(configService.API_END_POINT + "patient/:id", {}, {
    query: {
      isArray: true,
      url: configService.API_END_POINT + "patients"
    },
    update: {
      isArray: false,
      method: "PUT"
    }
  });
})

.controller('PatientListCtrl', ['$scope', 'Patient', function($scope, Patient) {
  Patient.query(function(data) {
    $scope.patientList = data;
  });
}])

.controller('PatientViewCtrl', ['$scope', '$routeParams', '$location', 'Patient', function($scope, $routeParams, $location, Patient) {
  $scope.editFlag = $routeParams.edit;
  Patient.get({ id: $routeParams.id }, function(data) {
    $scope.patient = data;
  });

  $scope.edit = function() {
    $location.path("/patient/" + $routeParams.id + "/edit");
  };

}])

.controller('PatientEditCtrl', ['$scope', '$routeParams', '$location', 'Patient', function($scope, $routeParams, $location, Patient) {

  Patient.get({ id: $routeParams.id }, function(data) {
    $scope.patient = data;
  });

  $scope.submit = function() {
    Patient.update(
      { id: $routeParams.id },
      $scope.patient,
      function() {
        $location.path("/patient/" + $routeParams.id);
      }
    );
  };

}]);
