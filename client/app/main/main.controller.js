'use strict';

angular.module('irisChatApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.messages = ['Msg1', 'Msg2', 'Msg3'];
    $scope.features = ['Ftr1', 'Ftr2', 'Ftr3'];
    $scope.input = '';
    $scope.send = function() {
      if ($scope.input === '') {
        return;
      }
      $http.post('/api/messages', { message: $scope.input });
      $scope.input = '';
    }
  });
