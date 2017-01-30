myApp.controller('dashboardController', function($scope, $location, dashboardFactory, bucketFactory) {
	var user, other;

	dashboardFactory.getUser(function(data) {
		user = data;
		$scope.user = user[0].name;
	})

	$scope.done = function(id) {
		bucketFactory.done(id, function(data) {
			bucketFactory.getItems($scope.user, function(data) {
				$scope.items = data.data;
				$scope.item = {};
			})
		})
	}

	$scope.logout = function(data) {
		dashboardFactory.logoutUser(function(data) {
			$location.path("/");
		})
	}

	$scope.add = function() {
		$scope.item.name = $scope.user;
		$scope.item.done = false;
		if (!$scope.item.friend) {
			$scope.item.friend = $scope.user;
		} else {
			var name = $scope.item.name;
			$scope.item.friend = $scope.item.friend.name;
			var friend = $scope.item.friend;
			other = {
				name: 				friend,
				title: 				$scope.item.title,
				description: 	$scope.item.description,
				friend: 			name,
				done: 				false
			}
		}
		bucketFactory.addItem($scope.item, function(data) {
			bucketFactory.getItems($scope.user, function(data) {
				$scope.items = data.data;
				$scope.item = {};
			})
		})
	}

	bucketFactory.getItems($scope.user, function(data) {
		$scope.items = data.data;
	})

	bucketFactory.getNames($scope.user, function(data) {
		$scope.names = data;
	})

})
