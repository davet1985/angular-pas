'use strict';

angular.module('configService', [])

.factory('configService', function() {
  
  var API_END_POINT = 'https://across-ruby-grape.herokuapp.com/';
  return {
    API_END_POINT: API_END_POINT
  };

});