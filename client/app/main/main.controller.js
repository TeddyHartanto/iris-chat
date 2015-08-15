'use strict';

angular.module('irisChatApp')
  .controller('MainCtrl', function ($scope, $http, socket, User, $state) {
    var room;
    $scope.messages = [];
    // FURTHER IMPROVEMENT (TO-DO):
    // set a variable to indicate whether there's another chatter or not
    // sync the socket with that variable, so when someone connect, the variable is flagged
    // use that flag to disable/enable the send and input

    var user = User.get({}, function() {

      $scope.userId = user._id;
      $http.post('api/rooms', { userId: user._id })
       .then(function(res) { // res is response sent by $http.post
          room = res.data;
          socket.joinRoom(room._id);
          socket.syncSession($scope.messages, $scope.inactive);

          $scope.send = sendMessage;
          $scope.newSession = newSession;

          var timestamp = new Date(), hours = timestamp.getHours(), minutes = timestamp.getMinutes();
          if (hours/10 < 1) hours = '0' + hours;
          if (minutes/10 < 1) minutes = '0' + minutes;
          // the message below is local to each user
          $scope.messages.push({sender: "System", text: "You are connected! =)",
                                timestamp: hours + ':' + minutes});

          if (room.chatters.length === 2)
            socket.secondUser();
      });
    });

    $scope.input = '';

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