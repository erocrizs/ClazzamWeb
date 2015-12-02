var curr = Parse.User.current();
var isTeacher = curr.get("account_type");

var email = curr.get("username");
var fname = curr.get("first_name");
var lname = curr.get("last_name");
var contact = curr.get("contact_number");

var ync = null;
var nickname = null;
var birthday = null;
var currStud = null;

if(!isTeacher) {
}

$(document).ready(function(){
	$("#email").attr("value", email);
	$("#email").attr("type", "email");
	$("#email").attr("disabled", false);
	$("#email").attr("required", true);
	
	$("#fname").attr("disabled", false);
	$("#fname").attr("value", fname);
	$("#fname").attr("required", true);
	
	$("#lname").attr("disabled", false);
	$("#lname").attr("value", lname);
	$("#lname").attr("required", true);
	
	$("#phone").attr("value", contact);
	$("#phone").attr("type", "tel");
	$("#phone").attr("disabled", false);
	$("#phone").attr("required", true);
	
	if(!isTeacher) {
		var query = new Parse.Query(Student);
		query.equalTo("userId", curr);
		query.find({
			success: function(results) {
				currStud = results[0];
				ync = currStud.get("year_course");
				nickname = currStud.get("nickname");
				birthday = currStud.get("birthday");
				
				$("#yearncourse").attr("disabled", false);
				$("#yearncourse").attr("value", ync);
				$("#yearncourse").attr("required", true);
				
				$("#nickname").attr("disabled", false);
				$("#nickname").attr("value", nickname);
				$("#nickname").attr("required", true);
				
				$("#bday").attr("value", birthday.getFullYear() + "-" + (birthday.getMonth()+1) + "-" + birthday.getDate());
				$("#bday").attr("type", "date");
				$("#bday").attr("disabled", false);
				$("#bday").attr("required", true);
			}, error: function(error) {
				console.log("Student Query Error: " + error.message);
			}
		});
	}
	
	$("#account-setting").submit( function(event){
		event.preventDefault();
		
		email = $("#email").val();
		fname = $("#fname").val();
		lname = $("#lname").val();
		contact = $("#phone").val();
		curr.set("email", email);
		curr.set("username", email);
		curr.set("first_name", fname);
		curr.set("last_name", lname);
		curr.set("contact", contact);
		curr.save({
			success: function() {
				if(!isTeacher) {
					ync = $("#yearncourse").val();
					nickname = $("#nickname").val();
					birthday = $("#bday").val();
					
					currStud.set("year_course", ync);
					currStud.set("nickname", nickname);
					currStud.set("birthday", new Date(birthday));
					currStud.save({	
						success: function() {
							$("#yearncourse").attr("value", ync);
							$("#nickname").attr("value", nickname);
							$("#bday").attr("value", birthday);
						}, error: function(error) {
							console.log("Saving Error: " + error.message);
						}
					});
				}
				
				$("#email").attr("value", email);
				$("#fname").attr("value", fname);
				$("#lname").attr("value", lname);
				$("#phone").attr("value", contact);
				
				$("#confirmation").html("Changes saved");
				$("#confirmation").show();
				setTimeout(function() {
					$("#confirmation").hide();
				}, 2000);
			}, error: function(user, error) {
				console.log("Saving Error: " + error.message);
			}
		});
		
		
	});
});