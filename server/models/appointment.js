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

// AppointmentSchema.methods.getApptsOnDate = function(onDate, callback){
// 	appt.find({'date' : onDate }, function(err, appt) {
// 		if (appt == null) {
// 			console.log("***** GOT 0  *****")
// 			return callback(0);
// 		} else {
// 			console.log("***** GOT", appt.length)
// 			return callback(appt.length);
// 		}
// 	})
// }

mongoose.model('Appointment', AppointmentSchema);
