myApp.factory('bucketFactory', function($http){
	var user = [], items = [], factory = {};

	factory.loginUser = function(data, callback){
		user.push(data);
		callback(user);
	}

	factory.addItem = function(info, callback){
		$http.post('/item', info).then(function(data){
			if(data.error){
				callback(data);
			} else {
				items.push(data);
				callback(items);
			}
		})
	}

	factory.getItems = function(name, callback){
		$http.get('/items/'+name).then(function(data){
			callback(data);
		});
	}

	factory.getItemsDone = function(name, callback){
		$http.get('/itemsdone/'+name).then(function(data){
			callback(data);
		});
	}

	factory.getItemsNotDone = function(name, callback){
		$http.get('/itemsnotdone/'+name).then(function(data){
			callback(data);
		});
	}

	factory.getUser = function(callback){
		callback(user);
	}

	factory.getNames = function(name, callback){
		$http.get('/names/'+name).then(function(data){
			callback(data.data);
		});
	}

	factory.done = function(id, callback){
		$http.get('/done/'+id).then(function(data){
			callback(data);
		});
	}



	factory.logoutUser = function(callback){
		user = "";
		callback();
	}

	return factory;
})
