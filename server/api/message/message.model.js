'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
	text: String,
	sender: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Message', MessageSchema);