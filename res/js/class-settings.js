var currClass = null;

// filler content
var classID = "ymGikcegXa";
function setFields() {
	var query = new Parse.Query(Class_);
	query.equalTo("objectId", classID);
	query.find({
		success: function(results) {
			currClass = results[0];
			var classname = currClass.get("cat_no");
			var section = currClass.get("section");
			var venue = currClass.get("venue");
			var sched = currClass.get("schedule");
			var inst = currClass.get("instruction");
			$("#classname").attr("disabled", false);
			$("#section").attr("disabled", false);
			$("#venue").attr("disabled", false);
			$("#sched").attr("disabled", false);
			$("#instruction").attr("disabled", false);
			
			$("#classname").attr("value", classname);
			$("#section").attr("value", section);
			$("#venue").attr("value", venue);
			$("#sched").attr("value", sched);
			$("#instruction").html(inst);
			
		}, error: function(error) {
			console.log("Class Query Error: " + error.message);
		}
	});
}
	
setFields();

$("#class-setting").submit( function(event) {
	event.preventDefault();
	var classname = $("#classname").val();
	var section = $("#section").val();
	var sched = $("#sched").val();
	var venue = $("#venue").val();
	var inst = $("#instruction").val();
	if(currClass!=null) {
		currClass.set("cat_no", classname);
		currClass.set("section", section);
		currClass.set("schedule", sched);
		currClass.set("venue", venue);
		currClass.set("instruction", inst);
		console.log("Pop");
		currClass.save({
			success: function(){
				$("#classname").attr("value", classname);
				$("#section").attr("value", section);
				$("#venue").attr("value", venue);
				$("#sched").attr("value", sched);
				$("#instruction").html(inst);
				
				$("#confirmation").html("Changes saved");
				$("#confirmation").show();
				setTimeout(function() {
					$("#confirmation").hide();
				}, 2000);
				
			}, error: function(error){
				console.log("Class Save Error: " + error.message);
			}
		});
	}
});
