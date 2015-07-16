var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var RoomSchema = new Schema({
	chatters: [{ type: Schema.Types.ObjectId, ref: 'User'}],
	numChatters: { type: Number, min: 2, max: 2 },
	messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}]
});

module.exports = mongoose.model('Room', RoomSchema);