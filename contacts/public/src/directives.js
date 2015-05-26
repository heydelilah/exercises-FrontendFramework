angular.module('ContactsApp')
	.value('FieldTypes', {
		'text': ['Text', 'should be text']
	})
	.directive('formField', function($timeout, FieldTypes){
		return {
			restrict: 'EA', // 类型
			templateUrl: 'views/formField.html',
			replace: true,	// 是否替换
			scope: {
				record: '=',
				field: '@',
				live: '@',
				required: '@'
			},
			link: function($scope, element, attr){

				// 消息的格式是固定这样的吗？
				$scope.$on('record:invalid', function(){
					// 这里的调用很奇怪？为何不是$scope.record[field];
					// 这里引用的是ng-form; ng-form="{{field}}"
					$scope[$scope.field].$setDirty();
				})

				$scope.types = FieldTypes;

				$scope.remove = function(field){
					delete $scope.record[field];
					$scope.blurUpdate();
				}

				$scope.blurUpdate = function(){
					if($scope.live !== 'false'){
						$scope.record.$update(function(updateRecord){
							$scope.record = updateRecord;
						});	
					}
				}

				var timeoutId;
				$scope.update = function(){
					$timeout.cancel(timeoutId);
					timeoutId = $timeout($scope.blurUpdate, 1000);
				}
			}
		}
	})