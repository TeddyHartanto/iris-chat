'use strict';

angular.module('irisChatApp')
  .controller('MainCtrl', function ($scope, $http, socket, User, $state) { // controller is constructed many times, unlike services
    //var user = user; // user should be resolved before the controller is instantiated as specified in ui-router wiki
    // Unfortunately, there was a bug when users login, logout, and then login again
    // The users will not be registered inside the room
    // Therefore, the main controller needs to be injected with User module
    // And the room creation is done only after the user object has been retrieved
    var room;
    $scope.messages = [];

    // set a variable to indicate whether there's another chatter or not
    // sync the socket with that variable, so when someone connect, the variable is flagged
    // use that flag to disable/enable the send and input

    var user = User.get({}, function() {

      console.log('User: ');
      console.log(user); // [debug]
      $scope.userId = user._id;
      $http.post('api/rooms', { userId: user._id })
       .then(function(res) { // res is response sent by $http.post
          room = res.data;
          console.log('Room: ');
          console.log(room); // [debug]
          socket.joinRoom(room._id);
          $scope.send = sendMessage;
          socket.syncMessages($scope.messages);
          $scope.newSession = newSession;
      });
    });

    /*$http.get('api/messages').success(function(messages) {
      $scope.messages = messages;
      socket.syncUpdates('message', $scope.messages);
    });*/

    $scope.features = ['Ftr1', 'Ftr2', 'Ftr3'];
    $scope.input = '';

    /*$scope.send = function() {
      if ($scope.input === '') {
        return;
      }
      // save the message in mongoDB using POST method
      $http.post('/api/messages', { text: $scope.input, sender: user._id }); // use user._id, not user
      // after saving socket, sendMessage wil be emitted, socket.syncUpdates
      // will listen to the event and act
      $scope.input = '';
    };*/ // delete after the fn works normally when defined inside $http.post then
          // but keep comments
    $scope.$on('logout', function() {
      socket.leaveRoom();
    });

    function sendMessage() {
      var msg;
      if ($scope.input === '') {
        return;
      }
      // first create the message
      $http.post('/api/messages', { text: $scope.input, sender: user._id })
        .then(function(res) { // and then push the message to the room
          var msg = res.data;
          // console.log(msg);
          socket.sendMessage(msg);
          $http.post('/api/rooms/send', { roomId: room._id, msgId: msg._id});
        });
      $scope.input = '';
    };

    function newSession() {
      socket.leaveRoom();
      $state.reload();
    };

  });