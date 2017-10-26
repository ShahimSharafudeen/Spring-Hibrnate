$(function () {
	$("#form-login").validationEngine({
		promptPosition : "topRight:-122,-5"
	});
	
	$("#resetButton").click(function(e) {
		$('#username').val('');
		$('#password').val('');
	});
});