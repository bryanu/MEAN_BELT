myApp.controller('indexController', function($scope, $location, dashboardFactory){

	$scope.login = function(){
				console.log("Here",$scope.name)
		dashboardFactory.loginUser($scope.name, function(data){
			$location.path('/dashboard');
		})
	}

})
