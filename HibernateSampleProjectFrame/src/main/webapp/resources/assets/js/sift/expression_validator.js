var expressionValidationFailureMessageVar;
var expressionValidationSuccessMessageVar;
var expressionFieldNameVar;
var expressionTypeVar;

$(function () {
	
	$('#validateExpressionButton').click(function(){
		validateExpression();
	});
});

function validateExpression() {
	var token = $("meta[name='_csrf']").attr("content");
	
	if (expressionFieldNameVar == undefined || expressionFieldNameVar == '') {
		expressionFieldNameVar = 'expression';
	}

	if (expressionTypeVar == undefined || expressionTypeVar == '') {
		expressionTypeVar = 'expressionType';
	}

	$("#Spinner").spin(spinnerOptions);
	
	if (expressionValidationFailureMessageVar == undefined || expressionValidationFailureMessageVar == '') {
		expressionValidationFailureMessageVar = 'expressionValidation-FailureMessage';
	}

	if (expressionValidationSuccessMessageVar == undefined || expressionValidationSuccessMessageVar == '') {
		expressionValidationSuccessMessageVar = 'expressionValidation-SuccessMessage';
	}
	$('#' + expressionValidationFailureMessageVar).hide();
	$('#' + expressionValidationSuccessMessageVar).hide();

	var id = $('#id').val();
	var expressionType = $('#' + expressionTypeVar).select2('val');
	if (typeof expressionType === 'object') {
		expressionType = $('#' + expressionTypeVar).val();

		if (expressionType == undefined) {
			expressionType = 'boolean';
		}
	}
	
	var url = window.rootContext + "secure/expression/validate";
	var isValidExpression = false;
		
    $.ajax({
  	  	type: 'post',
  	  	url: url,
  	  	headers: {
	  		"X-CSRF-TOKEN":token
	  	},
  	  	dataType: 'json',
  	    data: {id: id, expression : $('#' + expressionFieldNameVar).val(), expressionType : expressionType},
		async : false,
  		
  	  	success: function(data) {
  	  		
			if (data.status == 'timeout') {
				window.location = window.rootContext + "logout/";
			} else if (data.status == 'locked') {
				window.location = window.rootContext + "logout/?reason=LOCKED";
			} else if (data.status == 'success') {
				$('#' + expressionValidationFailureMessageVar).hide();
				$('#' + expressionValidationSuccessMessageVar).html(data['message']);
				$('#' + expressionValidationSuccessMessageVar).show();

				isValidExpression = true;
			} else if (data.status == "fail") {
				$('#' + expressionValidationSuccessMessageVar).hide();
				$('#' + expressionValidationFailureMessageVar).html(data['message']);
				$('#' + expressionValidationFailureMessageVar).show();
			}
			
			$("#Spinner").spin(false);
  	  	},
  	  	error: function (request, status, error) {
	  	
  	  	}
    });

	return isValidExpression;
}