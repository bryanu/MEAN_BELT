var mongoose = require('mongoose'),
    appt     = mongoose.model('Appointment');

mongoose.Promise = require('bluebird');

function AptController() {
  var errors = [];

  this.delete = function(req, res) {
   console.log("id:",req.params.id)
 		appt.remove({_id: req.params.id}, function(err, result) {
      if (err){
       res.status(666);
       res.json(err.errors);
     } else {
       res.json(result);
     }
     })
  }

  this.index = function(req, res) {
    var now     = new Date().toISOString();
    console.log(now)
  	appt.find({ "date": { "$gte": now } }, function(err, appts) {
  		 if (err){
  				res.status(666);
  				res.json(err.errors);
  		 } else {
  			 res.json(appts);
  		 }
  	})
  }

  this.create = function(req, res) {
 		var newAppointment = new appt({
 				complaint:  req.body.complaint,
        date:       req.body.date,
        time:       req.body.time,
 				userName:   req.body.userName,
 				_userID:    req.body.userID
 		});

    // Get appointments for today.
    appt.find({'date' : req.body.date }).populate('_userID').exec(function(err, appt) {
      var error  = false;
      var errors = [];
        for (users2 in appt) {
          console.log("--> ", appt[users2]._userID._id)
          if (req.body.userID == appt[users2]._userID._id) {
            error = true;
            errors.push({errors: { kind: 'date', message: 'You already have an appointment for this date.'}});
            break;
          }
        }

      // Are there already 3 or more appointments.
      if (appt.length >= 3) {
       error = true;
       errors.push({errors: { kind: 'schedule', message: 'The doctor is old and can only see 3 patients per day.  Please try a different date.'}});
      }

      // Check Date
      var now     = new Date().toISOString().slice(0,10);
      var aptDate = new Date(req.body.date).toISOString().slice(0,10);
      var d = new Date();
      console.log(aptDate,now, "now => ", d)
      if (aptDate === now) {
        error = true;
        errors.push({errors: { kind: 'date', message: 'You already have an appointment for this date.'}});
      } else if (aptDate < now) {
        error = true;
        errors.push({errors: { kind: 'date', message: 'You cannot set an appointment in the past.'}});
      }

      // Check Time
      if (!req.body.time) {
        error = true;
        errors.push({errors: { kind: 'time', message: 'We only accept appointments between 8:00am and 5:00pm'}});
      } else {
        var startTime = '14';   // 8:00 am
        var endTime   = '23';   // 5:00 pm
        var apptRequestTime = req.body.time.substr(11,2);
        if ( !(apptRequestTime <= endTime && apptRequestTime >= startTime) ) {
          error = true;
          errors.push({errors: { kind: 'time', message: 'We only accept appointments between 8:00am and 5:00pm'}});
        }
      }

      // Check Complaint
      if (!req.body.complaint) {
        error = true;
        errors.push({errors: { kind: 'complaint', message: 'Please provide a longer description of your issue.'}});
      } else if (req.body.complaint.length < 10) {
          error = true;
          errors.push({errors: { kind: 'complaint', message: 'Please provide a longer description of your issue, at least 10 characters.'}});
      }

      // No errors, save it - otherwise report errors
      if (!error) {
      		newAppointment.save(function(err, apt) {
      			if (err) {
      				res.json({errors: { kind: 'save', message: 'Error saving record to database.'}});
      			} else {
              returnedApt = {
                apt_id: 	 apt._id,
                complaint: apt.complaint
              }
        			res.json(returnedApt);
      			}
      		})
      } else {
        res.json(errors);
      }
    })
 	}

 }

module.exports = new AptController();
