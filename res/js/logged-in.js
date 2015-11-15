var isTeacher = Parse.User.current().get("account_type");

$(document).ready(function() {
	if(isTeacher) {
		$(".studentOnly").hide();
	} else {
		$(".teacherOnly").hide();
	}
	$("#logout").click(function logOut(event){
		Parse.User.logOut();
		window.location.href = "index.html";
	});
});