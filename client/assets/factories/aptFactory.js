app.factory('aptFactory', ['$http', function($http){
	// var messages = [],
	// 		message  = {};

	function AptFactory(){

		this.delete = function(id, callback){
        $http.delete('/appointment/'+id).then(callback);
    };


		this.postAppointment = function(newAppointment) {
			return $http.post('/appointment', newAppointment).then(function(ret){
				console.log("ret.errors from postAppointment",ret)
				if(ret.data.errors) {
					console.log("ret.errors from postAppointment",ret)
				}
				return ret;
			})
		}

		this.index = function(callback) {
			console.log("In index")
			$http.get('/appointment').then(function(retData) {
				callback(retData.data);
				console.log(retData.data);
			});
		}

		// this.postComment = function(newComment, callback) {
		// 	return $http.post('/comment', newComment).then(function(ret){
		// 		callback();
		// 	})
		// }
		//
		// this.postMessage = function(newMessage, callback) {
		// 	return $http.post('/message', newMessage).then(function(ret){
		// 		callback();
		// 	})
		// }
		//
		// this.index = function(callback) {
		// 	$http.get('/message').then(function(retData) {
		// 		callback(retData.data);
		// 	});
		// }

}
	return new AptFactory();
}])
