$(document).ready(function() {
	
	$(".collapsed").hide();
	if(Parse.User.current() !== null){
		$(".collapsed").show();
		
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