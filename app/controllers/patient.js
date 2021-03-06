'use strict';

angular.module('myApp.patient', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/patients', {
      templateUrl: 'app/views/patient/list.html',
      controller: 'PatientListCtrl'
    })
    .when('/patient', {
      templateUrl: 'app/views/patient/create.html',
      controller: 'PatientCreateCtrl'
    })
    .when('/patient/:id', {
      templateUrl: 'app/views/patient/view.html',
      controller: 'PatientViewCtrl'
    })
    .when('/patient/:id/edit', {
      templateUrl: 'app/views/patient/edit.html',
      controller: 'PatientEditCtrl'
    });
}])

.factory('Patient', function($resource, CONFIG) {
  return $resource(CONFIG.API_BASE_URL + "patient/:id", {}, {
    query: {
      isArray: true,
      url: CONFIG.API_BASE_URL + "patients"
    },
    update: {
      isArray: false,
      method: "PUT"
    }
  });
})

.controller('PatientListCtrl', ['$scope', '$location', 'Patient', function($scope, $location, Patient) {
  Patient.query(function(data) {
    $scope.patientList = data;
  });

  $scope.delete = function(id) {
    $('#patient_' + id).siblings().find('button').prop('disabled', true).text('Deleting...');
    Patient.delete(
      { id: id },
      {},
      function() {
        $('#patient_' + id).parent().remove();
      }
    );
  }
}])

.controller('PatientViewCtrl', ['$scope', '$routeParams', '$location', 'Patient', function($scope, $routeParams, $location, Patient) {
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
}])

.controller('PatientCreateCtrl', ['$scope', '$routeParams', '$location', 'Patient', function($scope, $routeParams, $location, Patient) {
  $scope.patient = {};

  $scope.submit = function() {
    Patient.save(
      {},
      $scope.patient,
      function() {
        $location.path("/patients");
      }
    );
  };
}]);
