Parse.initialize("typ8IpsCsDFlcmktAhyBZ7ICRysjKZP6Ko3y1TQa", "iKZ5oKs3dbndXfba1khGWZwmcffgulNN4SCUj0ia");

var acctype_btn = ""; 
var isTeacher = Parse.User.current().get("account_type");

if (isTeacher) {
	acctype_btn = "<li><a href='create-class.html'>Create Class</a></li>";
}
else {
	acctype_btn = "<li><a href='join1.html'>Join Class</a></li>";
}

$("navbar-right").html(acctype_btn);
			
$("#class-form").submit(function(event){
	event.preventDefault(); // use if not refreshing/going to another page
	var Class = Parse.Object.extend("Class_")
		

	var catno = $("#catno").val();
	var sec = $("#section").val();
	var venue = $("#venue").val();
	var sched = $("#sched").val();
	var ins = $("#instruction").val();
	var teach;

	var newClass = new Class();

	var Teacher = Parse.Object.extend("Teacher");
	var query = new Parse.Query(Teacher);
	query.equalTo("userId", Parse.User.current());
	query.find({
		success: function(results) {
			teach = {
				__type: "Pointer"
				,className: results[0].className
				,objectId: results[0].id
			};
			console.log(teach);
			newClass.set("teacherId",teach); 
		} ,error: function(error) {
			console.log(error.message);
		}
	});

	newClass.set("cat_no",catno);
	newClass.set("section",sec);
	newClass.set("venue",venue);
	newClass.set("schedule",sched);
	newClass.set("instruction",ins);
				
	newClass.save({
		success: function(){
			// clear field
			// OR go to page
		}
		,error: function(error){
			console.log("Error: " +error.message );
		}
	});
});

$("#logout").click(function(event) {
	Parse.User.logOut();
});