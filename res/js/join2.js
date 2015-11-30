var classCode = sessionStorage.getItem("class-code");
var currClass = null;
var currUser = Parse.User.current();
var currStudent = null;

var queryStudent = new Parse.Query(Student);
queryStudent.include("userId");
queryStudent.equalTo("userId", currUser);
queryStudent.find({
	success: function(results) {
		currStudent = results[0];
	}, error: function(error) {
		console.log("User Student Query Error: " + error.message);
	}
});

function setFields() {
	var query = new Parse.Query(Class_);
	query.include("teacherId");
	query.include("teacherId.userId");
	query.equalTo("objectId", classCode);
	query.find({
		success: function(results) {
			currClass = results[0];
			var classname = currClass.get("cat_no");
			var section = currClass.get("section");
			var venue = currClass.get("venue");
			var sched = currClass.get("schedule");
			var inst = currClass.get("instruction");
			var teacher = currClass.get("teacherId");
			var tUser = teacher.get("userId");
			
			var teacherName = tUser.get("first_name") + " " + tUser.get("last_name");
			
			$("#classCode").html(classCode);
			$("#classname").html(classname);
			$("#section").html(section);
			$("#venue").html(venue);
			$("#schedule").html(sched);
			$("#instruction").html(inst);
			$("#teacher").html(teacherName);
			
		}, error: function(error) {
			console.log("Class Query Error: " + error.message);
		}
	});
}

setFields();

$(document).ready( function() {
	$("#join-class").submit( function(event) {
		event.preventDefault();
		var response = $("#response").val();
		var add = new Enrollment();
		add.set("classId", currClass);
		add.set("studentId", currStudent);
		add.set("response", response);
		add.set("recitation", 0);
		add.set("cuts", 0);
		add.save({
			success: function() {
				window.location.href = "home.html";
			}, error: function() {
				console.log("Enrolling Error: " + error.message);
			}
		});
	});
});