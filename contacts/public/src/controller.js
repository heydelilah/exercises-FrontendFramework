angular.module('ContactsApp').controller('ListController', function($scope, Contact, $location){

	// 疑问： 这里的query对应什么？
	// 获取了全部的记录	
	// 'query':  {method:'GET', isArray:true}
	$scope.contacts = Contact.query();

	// 列显示域
	$scope.fields = ['firstName', 'lastName'];

	// 排序
	$scope.sort = function(field){
		$scope.sort.field = field;
		$scope.sort.order = !$scope.sort.order;
	}
	$scope.sort.field = 'firstName';
	$scope.sort.order = false;

	$scope.show = function(id){
		$location.url('contacts/'+id);
	}
})