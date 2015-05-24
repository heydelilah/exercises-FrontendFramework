angular.module('ContactsApp', ['ngRoute', 'ngResource'])
	// .run(function($rootScope){
	// 	$rootScope.message = "helo";
	// });
	
	.config(function($routeProvider, $locationProvider){
		$routeProvider.when('/contacts', {
			controller: 'ListController',
			templateUrl: 'views/list.html'
		});

		// ? 和hash相关
		$locationProvider.html5Mode(true);

	})