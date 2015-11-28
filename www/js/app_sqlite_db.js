angular.module('ngCordova', [])
.factory('ServicesTB', function($cordovaSQLite){

	var db = $cordovaSQLite.openDB('app.db');

	$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS ticket(id integer primary key AUTOINCREMENT,"+
		" student_id text not null, title text not null, body text, status text not null, date DATE)");

	return{
		add: function(student_id, title, body){
			var query = "INSERT INTO ticket(student_id, title, body, status, date) VALUES(?,?,?,?,?)";
		},
		setStatus: function(id, status){

		},
		all: function(){
			var query = "SELECT * FROM ticket";
			var serviceList = [];
			$cordovaSQLite.execute(db, query, []).then(function(res) {
				if(res.rows.length > 0){
					for(var i = 0; i< res.rows.length; i++){
						serviceList.push({
							id: res.rows.item(i).id,
							student_id: res.rows.item(i).student_id,
							title: res.rows.item(i).title,
							body: res.rows.item(i).body,
							status: res.rows.item(i).status,
							date: res.rows.item(i).date
						})
					}					
				}
			},
			function(err){
				console.error(err);
			});
		}
	}
});