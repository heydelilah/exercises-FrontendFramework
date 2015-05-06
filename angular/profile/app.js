angular.module('profileApp', ['ui.router'])
	.config(function($stateProvider){
		$stateProvider.state('index', {
			url: '',
			templateUrl: 'template/setting.html',
			controller: 'ProfileForm as info'
		})
	})
	.controller('ProfileForm' ,function(){

	})