var classCode = sessionStorage.getItem("class-code");
var curr = Parse.User.current();
var isTeacher = curr.get("account_type");

function addLink() {
	$("a.index-card-link").click( function(event) {
		var aTag = $(event.target);
		var enrollCode = aTag.attr('name');
		sessionStorage.setItem("enroll-code", enrollCode);
		sessionStorage.setItem("class-code", classCode);
		window.location.href = "student-profile.html";
	});
}

$(document).ready(function() {
	$("#class-settings-link").click( function(event) {
		sessionStorage.setItem("class-code", classCode);
		window.location.href="class-settings.html";
	});
	
	var varies = "";
	if(isTeacher){
		varies = "Show this class code to your students who hasn't joined yet so they can enroll in this Clazzam class!";
		$(".student_list_head").append("<th>Index Card</th>");
		
	} else {
		varies = "Show this to your classmates who hasn't joined yet so they can enroll in this Clazzam class!"
	}
	$(".varies").html(varies);
	
	var qClass = new Parse.Query(Class_);
	qClass.equalTo("objectId", classCode);
	qClass.include("teacherId");
	qClass.include("teacherId.userId");
	qClass.find({
		success: function(results) {
			var currClass = results[0];
			var class_name = currClass.get("cat_no");
			var section = currClass.get("section");
			var venue = currClass.get("venue");
			var schedule = currClass.get("schedule");
			
			$(".section").html(section);
			$(".cat_no").html(class_name);
			$(".venue").html(venue);
			$(".sched").html(schedule);
			$(".class-code").html(classCode);
			
			if(!isTeacher) {
				var teacher = currClass.get("teacherId");
				var teachAcc = teacher.get("userId");
				var teacherName = teachAcc.get("last_name") + ", " + teachAcc.get("first_name");
				$(".teacher").html(teacherName);
			}
			
			var qEnroll = new Parse.Query(Enrollment);
			qEnroll.include("classId");
			qEnroll.include("studentId");
			qEnroll.include("studentId.userId");
			qEnroll.ascending("student_name");
			qEnroll.equalTo("classId", currClass);
			qEnroll.find({
				success: function(results) {
					for(var i=0; i<results.length; i++){
						var currEnroll = results[i];
						var currStudent = currEnroll.get("studentId");
						var studentAcc = currStudent.get("userId");
						
						var surname = studentAcc.get("last_name");
						var firstname = studentAcc.get("first_name");
						var nickname = currStudent.get("nickname");
						var ync = currStudent.get("year_course");
						
						var enrollmentId = currEnroll.id;
						var cuts = currEnroll.get("cuts");
						var recitation = currEnroll.get("recitation");
						
						var out = "<tr>";
						out += "<td>" + surname + "</td>";
						out += "<td>" + firstname + "</td>";
						out += "<td>" + nickname + "</td>";
						out += "<td>" + ync + "</td>";
						out += "<td>" + cuts + "</td>";
						out += "<td>" + recitation + "</td>";
						
						if(isTeacher) {
							out += "<td><a href='#' class='index-card-link' name='" + enrollmentId +"'>click here</a></td>";
						}
						
						out += "</tr>";
						$(".student_list").append(out);
					}
					addLink();
					if(results.length===0) {
						$(".student_list").html("<tr><td colspan='7'>There are no enrolled students in this class.</td></tr>");
					}
				}, error: function(error) {
					console.log("Enrollment Query Error: " + error.message);
				}
			});
			
			
		}, error: function(error) {
			console.log("Class Query Error: " + error.message);
		}
	});
});