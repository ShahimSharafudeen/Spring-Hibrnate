$(function () {
	$("#form-createNewPassword").validationEngine({
		promptPosition : "topRight:-122,-5"
	});
	
	$('#form-createNewPassword').submit(function(e) {
        e.preventDefault();
        var form = $(this);
        
        if (form.validationEngine('validate')) {
        	createNewPassword(form);
        }
	});
});

function createNewPassword(form) {
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
				  window.location = window.rootContext + data['id'];
			  } else if (data.status == "fail") {
				  
				  $('#failureMsg').html(data['message']);
				  $('#failureMsg').show();
				  $('#failureMsg').focus();
			  }
			  $("#Spinner").spin(false);
		  },
		  error: function (request, status, error) {
		
		  }
    });
}