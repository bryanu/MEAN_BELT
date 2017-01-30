var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: {
		type: 		String,
		required: true,
		index: { 	unique: true	}
	}
}, {
	timestamps: true
});

mongoose.model('users', userSchema);
