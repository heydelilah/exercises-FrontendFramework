angular.module('ContactsApp', ['ngRoute', 'ngResource', 'ngMessages'])
	// .run(function($rootScope){
	// 	$rootScope.message = "helo";
	// });
	
	.config(function($routeProvider, $locationProvider){
		$routeProvider
			// 联系人列表
			.when('/contacts', {
				controller: 'ListController',
				templateUrl: 'views/list.html'
			})
			// 新增联系人
			.when('/contacts/add', {
				controller: 'AddController',
				templateUrl: 'views/add.html'
			})

		// ? 和hash相关
		$locationProvider.html5Mode(true);

	})