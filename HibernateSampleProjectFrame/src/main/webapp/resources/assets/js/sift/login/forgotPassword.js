$(function () {
	$("#form-forgotPassword").validationEngine({
		promptPosition : "topRight:-122,-5"
	});
	
	$('#form-forgotPassword').submit(function(e) {
        e.preventDefault();
        var form = $(this);
        
        if (form.validationEngine('validate')) {
        	forgotPassword(form);
        }
	});
	
	$('#cancelButton').click(function(){
		parent.history.back();
	    return false;
	});
});

function forgotPassword(form) {
	var token = $("meta[name='_csrf']").attr("content");
	$("#Spinner").spin(spinnerOptions);
	$.ajax({
		  type: form.attr('method'),
		  url: form.attr('action'),
		  headers: {
		  		"X-CSRF-TOKEN":token
		  },
		  dataType: 'json',
		  data: form.serialize(),
	    
		  success: function(data) {
			  if (data.status == 'validationError') {
				  var errors = data.errors;
				  displayErrors(form, errors)
			  } else if (data.status == 'timeout') {
				  window.location = window.rootContext + "logout/";
			  } else if (data.status == 'locked') {
				  window.location = window.rootContext + "logout/?reason=LOCKED";
			  } else if (data.status == 'success') {
				  $('#successMsg').html(data['message'] + ', password=' + data['id']);
				  $('#successMsg').show();
				  $('#successMsg').focus();
				  $('#failureMsg').hide();
				  
			  } else if (data.status == "fail") {
				  
				  $('#failureMsg').html(data['message']);
				  $('#failureMsg').show();
				  $('#failureMsg').focus();
				  $('#successMsg').hide();
			  }
			  $("#Spinner").spin(false);
		  },
		  error: function (request, status, error) {
		
		  }
    });
}