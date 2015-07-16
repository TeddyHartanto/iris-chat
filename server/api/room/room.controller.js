/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /rooms              ->  create
 */

'use strict';

var Room = require('./room.model');

// Create a new chat room
exports.create = function(req,res) {
	Room.create(req.body, function(err, room) {
		if (err) { return handleError(res, err); }
		res.json(200, room);
	}
}

function handleError(res, err) {
	return res.send(500, err);
}