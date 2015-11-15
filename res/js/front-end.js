Parse.initialize("typ8IpsCsDFlcmktAhyBZ7ICRysjKZP6Ko3y1TQa", "iKZ5oKs3dbndXfba1khGWZwmcffgulNN4SCUj0ia");

var User = Parse.User;
var Teacher = Parse.Object.extend("Teacher");
var Student = Parse.Object.extend("Student");
var Class_ = Parse.Object.extend("Class_");
var Enrollment = Parse.Object.extend("Enrollment");


$(document).ready(function() {
	if(!Parse.User.current()){
		$("#collapse").hide();
	}	
});