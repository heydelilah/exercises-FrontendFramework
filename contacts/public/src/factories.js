angular.module('ContactsApp')
	
	/*
		疑问：
			factory， 这里的 Contact 可以理解为一个构造器吗？	
	 */
	.factory('Contact', function($resource){

		/*
			$resource的用法：
				$resource(url, paramDefaults, actions)
				返回：

			疑问：
				这里是只是写了更新部分的逻辑吗？

		 */
		return $resource('/api/contact:id', {id: '@id'}, {
			'update': {method: 'PUT'}
		})
	})