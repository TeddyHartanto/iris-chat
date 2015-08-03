/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /rooms              ->  create
 */

'use strict';

var Room = require('./room.model');

// Join a room or create a new one
exports.join = function(req, res) {
	Room.findOne({chatters: {$size: 1} }, function(err, room) {
		if (err) { handleError(res, err); }
		if (room) {
			room.chatters.push(req.body.userId);
			room.save(function(err) {
				if (err) { handleError(res, err); }
				return res.json(200, room);
			});
		}
		else {
			Room.create({ chatters: [req.body.userId]}, function(err, newRoom) {
				if (err) { handleError(res, err); }
				return res.json(201, newRoom);
			})
		}
	})
};

function handleError(res, err) {
	return res.send(500, err);
}