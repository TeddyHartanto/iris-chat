'use strict';

var Room = require('./room.model');

exports.register = function(socket) {
	Room.schema.post('save', function(doc) {
		onSave(socket, doc);
	});
}

function onSave(socket, doc, cb) {
	socket.leave(socket.rooms[0]);
	socket.join(socket.room._id);
}