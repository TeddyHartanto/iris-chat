/**
 * Using Rails-like standard naming convention for endpoints.
 * POST    /rooms              ->  create
 */

'use strict';

var Room = require('./room.model');
var ObjectId = require('mongoose').Types.ObjectId;

// Join a room or create a new one
exports.join = function(req, res) {
	Room.findOne({ chatters: req.body.userId, expired: false }, function(err, existingRoom) {
		if (err) { handleErro(res, err); }
		if (existingRoom) {
			return res.json(200, existingRoom);
		}
		else {
			Room.findOne({ chatters: {$size: 1}, expired: false}, function(err, room) {
				if (err) { handleError(res, err); }
				if (room) {
					room.chatters.push(req.body.userId);
					room.save(function(err) {
						if (err) { handleError(res, err); }
						return res.json(200, room);
					});
				}
				else {
					var timestamp = new Date();
					var aRoom = {}
					aRoom.chatters = [req.body.userId];
					aRoom.timestamp = timestamp.toDateString().substring(4) + ', '
									+ timestamp.getHours() + ':' + timestamp.getMinutes();
					Room.create(aRoom, function(err, newRoom) {
						if (err) { handleError(res, err); }
						return res.json(201, newRoom);
					});
				}
			});
		}
	});
};

// push a message to the room the user is currently in
// needs roomId and msgId
exports.send = function(req, res) {
	Room.findById(req.body.roomId, function(err, room) {
		if (err) { handleError(res, err); }
		room.messages.push(req.body.msgId);
		room.save(function(err) {
			if (err) { handleError(res, err); }
			// console.log('message successfully pushed!'); // [debug]
			return res.json(201, room);
		})
	})
};

exports.getHistory = function(req, res) {
	Room.find({ $and: [{ chatters: new ObjectId(req.params.userId)}, { chatters: { $size: 2 }}]}, function(err, rooms) {
		if (err) { handleError(res, err); }
		return res.json(200, rooms);
	})
	// querying an objectid reference in an array
	// db.rooms.find({chatters: ObjectId("55c1f7649e95a200232ddb54")})
	// specifying 2 conditions of the same field
	// db.rooms.find({ $and: [{chatters: ObjectId("55c1f7649e95a200232ddb54")}, {chatters: {$size: 2}}]})
}

exports.show = function(req, res) {
	Room.findById(req.params.roomId)
		.populate('messages')
		.exec(function(err, room) {
			if (err) return handleError(res, err);
			return res.send(200, room);
		});
		// either populate document or populate query --> look at the api docs, below is populate by document
		// room.populate('messages.message') ?
}

function handleError(res, err) {
	return res.send(500, err);
}