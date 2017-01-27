var mongoose = require('mongoose'),
		Schema   = mongoose.Schema;

var AppointmentSchema = new mongoose.Schema({
	complaint: {
		type: 		 String,
		minlength: 10,
		required:  [true, 'You must enter a Message'],
		trim: 		 true,
	},
	userName: {
		type: 		String,
		trim: 		true,
	},
	_userID: {
    type: Schema.Types.ObjectId, ref: 'User'
	},
	date: {
		type: 		Date,
		required: [true, 'You must enter a Date']
	},
	time: {
		type: 		Date,
		required: [true, 'You must enter a Time']
	}

}, {timestamps: true});

mongoose.model('Appointment', AppointmentSchema);
