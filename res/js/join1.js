
// filler account
Parse.User.logOut();
var userFill = "student3"
var username = userFill+"@gmail.com";
Parse.User.logIn(username, userFill, {
	success: function(user) {
		console.log("login success");
		var currUser = Parse.User.current();
	}, error: function(user, error) {
		console.log("login failed: " + error.message);
	}
});

$(document).ready(function() {
	$("#find-class").submit(function(event) {
		event.preventDefault();
		var classCode = $("#classCode").val();
		sessionStorage.setItem("class-code", classCode);
		window.location.href = "join2.html";
	});
	
});
