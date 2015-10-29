$(document).ready(function(){

    $("#studentOnly").hide();

    $("input:radio[name='account-type']").change(function(){  

            if(this.value == '2' && this.checked){
              $("#studentOnly").show();
			  $("#yearncourse").attr("required", true);
			  $("#nickname").attr("required", true);
			  $("#birthday").attr("required", true);
            }else{
              $("#studentOnly").hide();
			  $("#yearncourse").attr("required", false);
			  $("#nickname").attr("required", false);
			  $("#birthday").attr("required", false);
            }

    });

});