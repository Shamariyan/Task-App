const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema([
	{
		user: {
			// this is connecting the user to the posts
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		},
		text: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		date: {
			type: Date,
			default: Date.now()
		},
		status: {
			type: Boolean,
			default: false,
			required: true
		}
	}
]);

module.exports = Task = mongoose.model('task', TaskSchema);
