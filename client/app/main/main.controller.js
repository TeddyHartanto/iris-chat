'use strict';

angular.module('irisChatApp')
  .controller('MainCtrl', function ($scope, $http, socket, user) {
    var user = user;
    socket.createRoom(user._id);
    $scope.messages = [];

    $http.get('api/messages').success(function(messages) {
      $scope.messages = messages;
      socket.syncUpdates('message', $scope.messages);
    });

    $scope.features = ['Ftr1', 'Ftr2', 'Ftr3'];
    $scope.input = '';

    $scope.send = function() {
      if ($scope.input === '') {
        return;
      }
      // save the message in mongoDB using POST method
      $http.post('/api/messages', { text: $scope.input, sender: user._id }); // use user._id, not user
      // after saving socket, message:save wil be emitted, socket.syncUpdates
      // will listen to the event and act
      $scope.input = '';
    };

  });
