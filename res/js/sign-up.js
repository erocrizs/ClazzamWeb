$("#studentOnly").hide();

$("input:radio[name='account-type']").change(
	function(){  
		if(this.value == '2' && this.checked){
			$("#studentOnly").show("slow", null);
			$("#yearncourse").attr("required", true);
			$("#nickname").attr("required", true);
			$("#birthday").attr("required", true);
			$("#yearncourse").attr("disabled", false);
			$("#nickname").attr("disabled", false);
			$("#birthday").attr("disabled", false);
		}else {
			$("#studentOnly").hide("slow", null);
			$("#yearncourse").attr("required", false);
			$("#nickname").attr("required", false);
			$("#birthday").attr("required", false);
			$("#yearncourse").attr("disabled", true);
			$("#nickname").attr("disabled", true);
			$("#birthday").attr("disabled", true);
		}
	}
);