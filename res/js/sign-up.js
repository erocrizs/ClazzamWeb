$(document).ready(function() {
	$("#studentOnly").hide();
	var account_type = true;
	$("input:radio[name='type']").change(
		function(){  
			if(this.value == 'student' && this.checked){
				$("#studentOnly").show("slow", null);
				$("#yearncourse").attr("required", true);
				$("#nickname").attr("required", true);
				$("#bday").attr("required", true);
				$("#yearncourse").attr("disabled", false);
				$("#nickname").attr("disabled", false);
				$("#bday").attr("disabled", false);
				console.log($("#bday").val());
				account_type = false;
			}else {
				$("#studentOnly").hide("slow", null);
				$("#yearncourse").attr("required", false);
				$("#nickname").attr("required", false);
				$("#birthday").attr("required", false);
				$("#yearncourse").attr("disabled", true);
				$("#nickname").attr("disabled", true);
				$("#birthday").attr("disabled", true);
				account_type = true;
			}
		}
	);
	
	$("#signup").submit(function(event){
		event.preventDefault();
		
		var email = $("#email").val();
		var password = $("#password").val();
		var cpassword = $("#cpassword").val();
		var fname = $("#fname").val();
		var lname = $("#lname").val();
		var phone = $("#phone").val();
		
		if(password!==cpassword)
		{
			alert("Passwords Mismatch")
		}	
		
		var newUser = new User();
		newUser.set("email", email);
		newUser.set("username", email);
		newUser.set("password", password);
		newUser.set("contact_number", phone);
		newUser.set("first_name", fname);
		newUser.set("last_name", lname);
		newUser.set("account_type", account_type);
		newUser.signUp(null, {
			success: function(user) {
				if(account_type) {
					var newT = new Teacher();
					newT.set("userId", newUser);
					newT.save({
						success: function() {
							// sumthing
						}, error: function() {
							console.log("Teacher Creation Error: " + error.message);
						}
					});
				} else {
					var ync = $("#yearncourse").val();
					var nickname = $("#nickname").val();
					var bday = new Date($("#bday").val());
					
					var newS = new Student();
					newS.set("year_course", ync);
					newS.set("nickname", nickname);
					newS.set("birthday", bday);
					newS.set("userId", newUser);
					newS.save({
						success: function() {
							// sumthing
						}, error: function() {
							console.log("Student Creation Error: " + error.message);
						}
					});
				}
				
				window.location.href = "home.html";
			}, error: function(user, error) {
				console.log("Sign Up Error: " + error.message);
			}
		});
	});
});

