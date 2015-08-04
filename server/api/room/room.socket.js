'use strict';

var Room = require('./room.model');

exports.register = function(socketio, socket) {
	socket.on('joinRoom', function(roomId) { // done (tested using console.log)
	    socket.join(roomId);
	});
	socket.on('logout', function() { // done too
	    socket.leave(socket.rooms[1], function() {
	    	console.log(socket.rooms);
	    });
	});
	socket.on('sendMessage', function(message) {
		console.log('server got the message: ' + message);
		console.log(socket.rooms[1]);
		socketio.to(socket.rooms[1]).emit('sendMessage', message);
	});
}