if(Parse.User.current()) {
	window.location.replace("home.html");
}

$(document).ready( function(){
	$("#login").submit(function(event){
		event.preventDefault();
			
		var email = $("#login-email").val();
		var password = $("#login-password").val();
		
		Parse.User.logIn(email, password, {
			success: function(user){
				window.location.href = "home.html";
			}, error: function(user, error){
				console.log("Log in error:"+error.message); }});
		});
});