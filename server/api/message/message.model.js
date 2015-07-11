'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
	text: String
})

module.exports = mongoose.model('Message', MessageSchema);