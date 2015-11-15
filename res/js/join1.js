$(document).ready(function() {
	$("#find-class").submit(function(event) {
		event.preventDefault();
		var classCode = $("#classCode").val();
		sessionStorage.setItem("class-code", classCode);
		window.location.href = "join2.html";
	});
	
});
