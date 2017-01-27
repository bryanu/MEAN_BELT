 var mongoose = require('mongoose')
     appt  = mongoose.model('Appointment')

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
   	appt.find({}, function(err, appts) {
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
    console.log("server.controllers.apt:", newAppointment)
    // Do checks here
      var now = new Date();
      var aptDate = new Date(req.body.date);
      if (aptDate < now) {
        console.log("Date Error")
        res.json({errors: {	date: { message: 'You cannot set an appointment in the past.'}}} );
      }
      var startTime = '14';
      var endTime   = '23';
      var apptRequestTime = req.body.time.substr(11,2);
      if ( !(apptRequestTime <= endTime && apptRequestTime >= startTime) ) {
        res.json({errors: {	time: { message: 'We only accept appointments between 8:00am and 5:00pm'}}} );
      }
      if (req.body.complaint.length < 10) {
        res.json({errors: {	complaint: { message: 'Please provide a longer description of your issue.'}}} );
      }
 		newAppointment.save(function(err, apt) {
 			if (err) {
 				res.json({error: "Error occured saving message"});
 			} else {
        returnedApt = {
          apt_id: 	 apt._id,
          complaint: apt.complaint
        }
        console.log("AppID: ",returnedApt)
 				res.json(returnedApt);
 			}
 		})
 	}


	// this.createComment = function(req, res) {
	// 	console.log("server.controllers.createComment:")
	//
	// 	message.findOne({_id: req.body.messageID}, function(err, msg){
	// 		var newComment = new comment({
	// 				comment:  	req.body.comment,
	// 				userName:		req.body.userName,
	// 				_messageID: req.body.messageID,
	// 				_userID:  	req.body.userID
	// 		});
	//
	// 		newComment.save(function(err, objComment){
	// 			if (err) {
	// 				 res.status(500).json(err.errors);
	// 			}	else {
	// 				msg.comments.push(objComment._id);
	// 				msg.save(function(err, newMessage){
	// 				 	if(err) {
	// 						console.log('Error saving comment');
	// 					} else {
	// 						console.log(objComment);
	// 						res.send(objComment);
	// 					}
	// 				});
	// 		 }
	// 	 });
	// 	})
	// }
	//
	// this.create = function(req, res) {
	// 	console.log("server.controllers.messages:", req.body)
	// 	var newMessage = new message({
	// 			message:  req.body.message,
	// 			userName: req.body.userName,
	// 			_userID:  req.body.userID
	// 	});
	// 	newMessage.save(function(err, msgID) {
	// 		if (err) {
	// 			res.json({error: "Error occured saving message"});
	// 		} else {
	// 			res.json(msgID);
	// 		}
	// 	})
	// }
	//
	// this.index = function(req, res) {
	// 	message.find({}).populate('comments').exec(function(err, messages) {
	// 			 if (err){
	// 					res.status(666);
	// 					res.json(err.errors);
	// 			 } else {
	// 				 res.json(messages);
	// 			 }
	// 		})
	// }

 }

 module.exports = new AptController();
