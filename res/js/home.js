var curr = Parse.User.current();
var isTeacher = curr.get("account_type");

if(isTeacher) {
	var qT = new Parse.Query(Teacher);
	var currT = null;
	qT.equalTo("userId", curr);
	qT.find({
		success: function(results) {
			currT = results[0];
		}, error: function(error) {
			console.log("User Teacher Query Error: " + error.message);
		}
	});
	console.log(currT);
	qClass = new Parse.Query(Class_);
	qClass.include("teacherId");
	qClass.equalTo("teacherId", currT);
	qClass.find({
		success: function(results) {
			var out = "";
			for(var i=0; i<results.length; i++) {
				var current = results[i];
				var class_name = current.get("cat_no");
				var section = current.get("section");
				var venue = current.get("venue");
				var schedule = current.get("schedule");
				
				out += "<div class=\"panel panel-primary\"><div class=\"container\">";
				out += "<a href=\"class-page.html\"><h3>" + class_name +"</h3></a>";
				out += "<div class=\"col-sm-6 col-xs-6\"><strong>Venue</strong>: "+ venue +"</div>";
				out += "<div class=\"col-sm-6 col-xs-6\"><strong>Sched</strong>: " + schedule + "</div>";
				out += "<div class=\"col-sm-12 col-xs-12\"><strong>Section</strong>: " + section + "</div></div></div>";
			}
			$("#class-list").html(out);
		}, error: function(error) {
			console.log("Class Query Error: " + error.message);
		}
	});
	
} else {
	var qS = new Parse.Query(Student);
	qS.include("userId");
	qS.equalTo("userId", currUser);
	qS.find({
		success: function(results) {
			currStudent = results[0];
		}, error: function(error) {
			console.log("User Student Query Error: " + error.message);
		}
	});
	
	
}