angular.module('starter.services', [])
.factory('StudentLogin',function($http){
	return {
		loginUser: function(number, pass, reg_id, course) {
			var req = $http.get({
				method:'POST',
				url:'http://bendev.gear.host/api/student.php?',
				data:'tag=student&student_no='+number+'&email='+number+'@student.ncirl.ie&password='+pass+'&reg_id='+reg_id+'&course='+course,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				});
			
			req.success = function(data, status, headers, config){			
				req.then(data, status, headers, config);
				return req;
			}
			req.error = function(data, status, headers, config){
				req.then(data, status, headers, config);
				return req;
			}
			
			return req;
		}
	}
})
.factory('NciUpdates', function($http){
	var update = [];
	$http.get('http://bendev.gear.host/api/?tag=getUpdates')
	.then(function(response){
		var jsonArray = response.data.result;
		for(var i=0; i<jsonArray.length; i++){
			var upd = jsonArray[i];
			update.push(upd);
		}
	})
	return {
		all: function() {
			return update;
		},
		get: function(id) {
			for (var i = 0; i < update.length; i++) {
				if (parseInt(update[i].id) === parseInt(id)) {
					return update[i];
				}
			}
			return null;
		}
	}
});