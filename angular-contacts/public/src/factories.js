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

				bug: 少写了/， '/api/contact:id','/api/contact3', 
				取不到值

		 */
		return $resource('/api/contact/:id', {id: '@id'}, {
			'update': {method: 'PUT'}
		})
	})


	.factory('Fields', function($q, $http, Contact){
		var url="/options/display_field",
			allFields = [];
			ignore = ['firstName', 'lastName', 'id', 'userId'];

		var deferred = $q.defer();

		var records = Contact.query(function(){

			records.forEach(function(c){

				// @非常不解
				Object.keys(c).forEach(function(k){
					// 去重和过滤
					if(allFields.indexOf(k)<0 && ignore.indexOf(k)<0){
						allFields.push(k);
					}
				});

				deferred.resolve(allFields);

			})
		})

		return {
			get: function(){
				return $http.get(url);
			},
			set: function(field){
				console.log(field)
				return $http.post(url, {field: field})
			},
			headers: function(){
				return deferred.promise;
			}

		}
	})


