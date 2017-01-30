myApp.controller('viewController', function($scope, $routeParams, $location, dashboardFactory, bucketFactory) {
	$scope.name = $routeParams.name;

	bucketFactory.getItemsDone($routeParams.name, function(data) {
		console.log("getItems on showcontroller", $routeParams.name);
		$scope.itemsDone = data.data;
	})

	bucketFactory.getItemsNotDone($routeParams.name, function(data) {
		console.log("getItems on showcontroller", $routeParams.name);
		$scope.itemsNotDone = data.data;
	})

	$scope.logout = function(data) {
		dashboardFactory.logoutUser(function(data) {
			console.log("user logged out");
			$location.path("/");
		})
	}

})
