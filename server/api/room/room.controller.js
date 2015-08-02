/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /rooms              ->  create
 */

'use strict';

var Room = require('./room.model');

// Create a new chat room
// exports.create is not a middleware, but instead used for server-side logic
exports.create = function(aRoom) {
	var createdRoom;
	Room.create(aRoom, function(err, room) {
		if (err) { return handleError(err); }
		createdRoom = room;
		console.log(createdRoom);
	});
	return createdRoom;
};

function handleError(err) {
	console.log(err);
}