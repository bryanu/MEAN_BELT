app.factory('aptFactory', ['$http', function($http){
	// var messages = [],
	// 		message  = {};

	function AptFactory(){

		this.delete = function(id, callback){
        $http.delete('/appointment/'+id).then(callback);
    };


		this.postAppointment = function(newAppointment) {
			return $http.post('/appointment', newAppointment).then(function(ret){
				// console.log("ret.errors from postAppointment",ret)
				if(ret.data.errors) {
					// console.log("ret.errors from postAppointment",ret)
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



}
	return new AptFactory();
}])
