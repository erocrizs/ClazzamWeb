

$(document).ready(function() {
	var acctype_btn = ""; 
	var isTeacher = Parse.User.current().get("account_type");

	if (isTeacher) {
		acctype_btn = "<li><a href='create-class.html'>Create Class</a></li>";
	}
	else {
		acctype_btn = "<li><a href='join1.html'>Join Class</a></li>";
	}

	$("navbar-right").html(acctype_btn);
	$("#create-class").submit( function(event){
		event.preventDefault(); // use if not refreshing/going to another page
		var catno = $("#classname").val();
		var sec = $("#section").val();
		var venue = $("#venue").val();
		var sched = $("#sched").val();
		var ins = $("#instruction").val();
		var teach;

		var newClass = new Class_();
		var query = new Parse.Query(Teacher);
		query.include("userId");
		query.equalTo("userId", Parse.User.current());
		
		query.find({
			success: function(results) {
				teach = results[0];
				newClass.set("teacherId",teach);
				newClass.set("cat_no",catno);
				newClass.set("section",sec);
				newClass.set("venue",venue);
				newClass.set("schedule",sched);
				newClass.set("instruction",ins);
				newClass.save({
					success: function(){
						window.location.href = "home.html";
					}
					,error: function(error){
						console.log("Error: " +error.message );
					}
				});
				
			} ,error: function(error) {
				console.log(error.message);
			}
		});
	});

	$("#logout").click(function(event) {
		Parse.User.logOut();
	});
});