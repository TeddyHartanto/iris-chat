/* global io */
'use strict';

// injecting socket as a dependency will make the component connect to socket.io
angular.module('irisChatApp')
  .factory('socket', function(socketFactory) {

    // socket.io now auto-configures its connection
    var ioSocket = io('', {
      path: '/socket.io-client'
    });

    var socket = socketFactory({
      ioSocket: ioSocket
    });

    return {
      socket: socket,

      leaveRoom: function() { // emit logout to be caught by server, to make the socket leave the room it was in before
        socket.emit('leaveRoom');
      },

      joinRoom: function(roomId) {
        socket.emit('joinRoom', roomId);
      },

      secondUser: function() {
        socket.emit('secondUser');
      },

      syncMessages: function(messages) {
        /**
         * Syncs messages in the room this socket is in on 'sendMessage'
         */
        socket.on('sendMessage', function(message) {
          messages.push(message);
        });

        /**
         * Inform the user when another user has connected on 'secondUser'
         */
        socket.on('secondUser', function() {
          var timestamp = new Date(), hours = timestamp.getHours(), minutes = timestamp.getMinutes();
          if (hours/10 < 1) hours = '0' + hours;
          if (minutes/10 < 1) minutes = '0' + minutes;

          messages.push({ sender: "System", text: "Another user has connected. You may start chatting now. Say hi! =)",
                          timestamp: hours + ':' + minutes});
        });
      },

      sendMessage: function(message) {
        socket.emit('sendMessage', message);
      }

    };
  });
