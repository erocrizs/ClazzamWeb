var classCode = sessionStorage.getItem("class-code");
var enrollCode = sessionStorage.getItem("enroll-code");
var curr = Parse.User.current();
var isTeacher = curr.get("account_type");

var month = ["Jan", "Feb", "Mar", "Apr", 
			"May", "Jun", "Jul", "Aug",
			"Sept", "Oct", "Nov", "Dec"];

$(document).ready(function() {
	
	$(".class-page-link").click( function (){
		sessionStorage.setItem("class-code", classCode);
		window.location.href = "class-page.html";
	});
	
	var qEnroll = new Parse.Query(Enrollment);
	qEnroll.equalTo("objectId", enrollCode);
	qEnroll.include("classId");
	qEnroll.include("studentId");
	qEnroll.include("studentId.userId");
	qEnroll.find({
		success: function(results) {
			var currEnroll = results[0];
			var currClass = currEnroll.get("classId");
			var currStud = currEnroll.get("studentId");
			var currAcc = currStud.get("userId");
			
			var studentName = currEnroll.get("student_name");
			var subject = currClass.get("cat_no") + " - " + currClass.get("section");
			var nickname = currStud.get("nickname");
			var ync = currStud.get("year_course");
			var birthday = currStud.get("birthday");
			var bDayString = month[birthday.getMonth()] + " " + birthday.getDate() + ", " + birthday.getFullYear();
			var email = currAcc.get("username");
			var recitation = currEnroll.get("recitation");
			var cuts = currEnroll.get("cuts");
			
			$(".student-name").html(studentName);
			$(".class-page-link").html(subject);
			$(".nickname").html(nickname);
			$(".ync").html(ync);
			$(".birthday").html(bDayString);
			$(".email").html(email);
			$(".recitation").html(recitation);
			$(".cuts").html(cuts);
			
			var instruction = "<p>" + currClass.get("instruction").split("\n").join("</p><p>") + "</p>";
			
			var response = "<p>" + currEnroll.get("response").split("\n").join("</p><p>") + "</p>";
			$(".instruction").html(instruction);
			$(".response").html(response);
			
		}, error: function(error) {
			console.log("Enrollment Query Error: " + error.message);
		}
	});
	
});