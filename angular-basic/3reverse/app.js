angular.module('Reverse', [])
	.factory('DataCenter', function(){

		return {words: ''};
	})

	// 疑问：$scope不是this, $scope到底是什么？
	// 笔记：由factory产生的Data对象可以通用到整个app中 
	.controller('MessageCtrl', function($scope, DataCenter){
		this.data = DataCenter;
	})
	.controller('BoardCtrl', function($scope, DataCenter){
		// this.data = DataCenter;

		this.reverse = function(){
			return DataCenter.words.split('').reverse().join('')||'[-]';
		}
	})



/*
	疑问：没有双向绑定成功
*/


// function MessageCtrl($scope, Data){
// 	$scope.data = Data
// }

// function BoardCtrl($scope, Data){
// 	$scope.data = Data
// }