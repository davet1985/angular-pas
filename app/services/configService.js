'use strict';

angular.module('configService', [])

.factory('configService', function() {
  
  var API_END_POINT = 'http://localhost:9494/';
  return {
    API_END_POINT: API_END_POINT
  };

});