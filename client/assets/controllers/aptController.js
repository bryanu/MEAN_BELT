app.controller('aptController', function(aptFactory, $location, $cookies){
	var self 	 		 = this;
	self.appointments  = [];
	self.$location = $location;
	self.aptErrors = [];
	self.user_id 	 = '';
	self.user_name = '';


	self.checkStatus = function(userID, user_id, aptDate) {
		var date = new Date();
		aptDate = new Date(aptDate);
		if (userID == user_id && date < aptDate) {
			return true;
		} else {
			return false
		}
	}

	self.delete = function(appointment) {
		aptFactory.delete(appointment._id, function() {
			console.log("*******************  I'M Back ***************")
			self.index();
			$location.url("/");
		});
	}

	self.index = function() {
		aptFactory.index(function(appointments) {
			self.appointments = appointments;
		});
	};
	self.index();

	self.newAppointment = function(){
		self.aptErrors = [];
		var nApt = {
			date:				self.newApt.date,
			time:				self.newApt.time,
			complaint:	self.newApt.complaint,
			userName: 	self.user_name,
			userID:	  	self.user_id
		};
		aptFactory.postAppointment(nApt).then( function(data) {
			console.log("PostApp:", data)
			if (data.data.apt_id) {
				console.log("returned from Post",data)
				$location.url('/index');
			} else {
				var errors = data.data.errors;
				for (key in errors){
					self.aptErrors[key] = errors[key].message
				}
			}
		})
	}

// User access controll section below *******************************************
self.logout = function(){
	$cookies.remove('userID');
	$cookies.remove('userName');
	self.user_id 	 = '';
	self.user_name = '';
	$location.url('/login');
}
if ($cookies.get('userID') != null && $cookies.get('userID') != '' &&
		$cookies.get('userName') != null && $cookies.get('userName') != '' ) {
			self.user_id 	 = $cookies.get('userID');
			self.user_name = $cookies.get('userName');
			//self.index();
} else {
	// No cookies - go home.
	$location.url('/login');
}
// *********************************************************************************
})

// Bryanutley2000@yahoo.com
// Bryan6932
