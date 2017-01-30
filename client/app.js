var myApp = angular.module('BeltAp', ['ngRoute', 'ngCookies']);

(function() {
	myApp.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'indexController',
				templateUrl: "partials/index.html",
				controllerAs: 'iC'
			})
			.when('/dashboard', {
				controller: 'dashboardController',
				templateUrl: "partials/dashboard.html",
				controllerAs: 'dC'
			})
			.when('/view/:name', {
				controller: 'viewController',
				templateUrl: "partials/userview.html",
				controllerAs: 'vC'
			})

	})
}());
