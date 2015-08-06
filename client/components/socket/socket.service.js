/* global io */
'use strict';

// injecting socket as a dependency will make the component connect to socket.io
angular.module('irisChatApp')
  .factory('socket', function(socketFactory) {

    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io('', {
      // Send auth token on connection, you will need to DI the Auth service above
      // 'query': 'token=' + Auth.getToken()
      path: '/socket.io-client'
    });

    var socket = socketFactory({
      ioSocket: ioSocket
    });

    return {
      socket: socket,

    /*  /**
       * Register listeners to sync an array with updates on a model
       *
       * Takes the array we want to sync, the model name that socket updates are sent from,
       * and an optional callback function after new items are updated.
       *
       * @param {String} modelName
       * @param {Array} array
       * @param {Function} cb
       *
      syncUpdates: function (modelName, array, cb) {
        cb = cb || angular.noop;

        /**
         * Syncs item creation/updates on 'model:save'
         *
        socket.on(modelName + ':save', function (item) {
          var oldItem = _.find(array, {_id: item._id});
          var index = array.indexOf(oldItem);
          var event = 'created';

          // replace oldItem if it exists
          // otherwise just add item to the collection
          if (oldItem) {
            array.splice(index, 1, item);
            event = 'updated';
          } else {
            array.push(item);
          }

          cb(event, item, array);
        });

        /**
         * Syncs removed items on 'model:remove'
         *
        socket.on(modelName + ':remove', function (item) {
          var event = 'deleted';
          _.remove(array, {_id: item._id});
          cb(event, item, array);
        });
      }, */

      /**
       * Removes listeners for a models updates on the socket
       *
       * @param modelName
       */
      unsyncUpdates: function (modelName) {
        socket.removeAllListeners(modelName + ':save');
        socket.removeAllListeners(modelName + ':remove');
      },

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
          // console.log('Messages: ');
          // console.log(messages);
        });

        socket.on('secondUser', function() {
          var timestamp = new Date();
          messages.push({ sender: "System", text: "Another user has connected. You may start chatting now. Say hi! :)",
                          timestamp: timestamp.getHours() + ':' + timestamp.getMinutes()});
        });
      },

      sendMessage: function(message) {
        socket.emit('sendMessage', message);
      }

    };
  });
