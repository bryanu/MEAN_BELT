myApp.factory('dashboardFactory', function($http){
	var user = [], factory = {};

	factory.getUser = function(callback){
		callback(user);
	}
	
	factory.loginUser = function(username, callback){
		user.push(username);
		$http.post('/login',username).then(function(username){
			callback(user);
		})
	}

	factory.logoutUser = function(callback){
		user = [];
		callback();
	}

	return factory;

})
