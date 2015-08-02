'use strict';

var Room = require('./room.model');

/**
 * {Function} createAndJoinRoom  - to create a new Room and join the created room
 *
 * @param {Socket} socket
 * @param {Object} a Room object to construct a Room document
 */
var createAndJoinRoom = function(socket, aRoom) {
	Room.create(aRoom, function(err, room) {
		if (err) { handleError(err); }
		socket.leave(socket.rooms[0]);
		socket.join(room._id.toString());
	});
}

/**
 * Finds a Room with only 1 chatter,
 * if found, join that room
 * otherwise, create a new room
 *
 * @param {Socket} socket
 * @param {Object} userId (Mongoose ObjectId)
 */
var findAvailableRoom = function(socket, userId) {
	Room.findOne({chatters: { $size: 1} }, function(err, room) {
		if (err) { handleError(err); }
		if (room) {
			socket.leave(socket.rooms[0]);
			socket.join(room._id.toString());
		}
		else {
			createAndJoinRoom(socket, { chatters: [userId] });
		}
	});
}

exports.createAndJoinRoom = createAndJoinRoom;
exports.findAvailableRoom = findAvailableRoom;

function handleError(err) {
	console.log(err);
}