$(document).ready(function() {
	
	$(".logout-hidden").hide();
	if(Parse.User.current() !== null){
		$(".logout-hidden").show();
		var isTeacher = Parse.User.current().get("account_type");
		if(isTeacher) {
			$(".studentOnly").hide();
		} else {
			$(".teacherOnly").hide();
		}
		
		$("#logout").click(function logOut(event){
			Parse.User.logOut();
			window.location.href = "index.html";
		});
	}
});