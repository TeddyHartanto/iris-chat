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
          $scope.room = room; // --> to keep track of changes in room
          socket.joinRoom(room._id);
          socket.syncMessages($scope.messages);
          $scope.send = sendMessage;
          $scope.newSession = newSession;
      });
    });

    $scope.input = '';

    /**
     * Use $scope.$watch to listen to user connected to the app
     */
    // when this controller is initialized, the value being watched is always 0
    // if oldVal === 0, newVal === 1 --> first user has connected
    // if oldVal === 0, newVal === 2 --> second user has connected
    $scope.$watch(function(scope) {
      if (room)
        return room.chatters.length;
      else
        return 0;
    },  function(newVal, oldVal) {
          if (newVal === 1 && oldVal === 0) {
            var timestamp = new Date(), hours = timestamp.getHours(), minutes = timestamp.getMinutes();
            if (hours/10 < 1) hours = '0' + hours;
            if (minutes/10 < 1) minutes = '0' + minutes;

            // the message below is local to each user
            $scope.messages.push({sender: "System", text: "You are connected! =)",
                                  timestamp: hours + ':' + minutes})
          }
          if (newVal === 2 && oldVal === 0) {
            var timestamp = new Date(), hours = timestamp.getHours(), minutes = timestamp.getMinutes();
            if (hours/10 < 1) hours = '0' + hours;
            if (minutes/10 < 1) minutes = '0' + minutes;

            // the message below is local to each user
            $scope.messages.push({sender: "System", text: "You are connected! =)",
                                  timestamp: hours + ':' + minutes})
            socket.secondUser();
        }
    });

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