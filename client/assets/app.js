var app = angular.module('loginApp', ['ngRoute','ngCookies']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/index.html',
			controller: 'aptController',
			controllerAs: 'aC'
		})
		.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'loginController',
			controllerAs: 'lC'
		})
		.when('/appointment', {
			templateUrl: 'partials/appointment.html',
			controller: 'aptController',
			controllerAs: 'aC'
		})
		.otherwise({
			redirectTo: '/'
		})
})



// var app = angular.module('loginApp', ['ngRoute','ngCookies']);
//
// app.config(function($routeProvider){
// 	$routeProvider
// 		.when('/', {
// 			templateUrl: 'partials/index.html',
// 			controller: 'aptController',
// 			controllerAs: 'aC'
// 		})
// 		.when('/login', {
// 			templateUrl: 'partials/login.html',
// 			controller: 'loginController',
// 			controllerAs: 'lC'
// 		})
// 		.otherwise({
// 			redirectTo: '/'
// 		})
// })
