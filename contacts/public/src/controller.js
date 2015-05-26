angular.module('ContactsApp')
	.controller('ListController', function($scope, Contact, $location){

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

	.controller('AddController', function($scope, Contact, $location){
		// 新建一条记录
		$scope.record = new Contact({
			firstName: ['', 'text'],
			lastName: ['', 'text'],
			birthday: ['', 'date'],
			cellphone: ['', 'tel'],
			email: ['', 'email'],
			homePhone: ['', 'tel'],
			website: ['', 'url']
		});

		$scope.save = function(){
			// 保存前要验证表单，在这里是指lastname 和 firstName
			/* 
				疑问：
					$invalid 不知道哪里来的？
					$broadcast的详细用法？
			*/
			if($scope.newContact.$invalid){
				$scope.$broadcast('record:invalid')
			}else{
				$scope.record.$save();
				$location.url('/contacts');
			}
		}
	})