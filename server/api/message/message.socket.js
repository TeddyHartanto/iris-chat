'use strict';

var message = require('./message.model');

exports.register = function(socket) {
	message.schema.post('save', function(doc) {
		onSave(socket, doc);
	});
}

function onSave(socket, doc, cb) {
	socket.emit('message:save', doc);

	// below is to ouput to the console (for debugging purpose)
	if (doc.text === 'rooms')
		console.log(socket.rooms);
	if (doc.text === 'socket')
		console.log(socket);
}