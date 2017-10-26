
$(function() {
	
	$('#activemqsendmsgButton').on('click' , function() {
		$('#activemqsendmsgForm').ajaxSubmit({
			success: function(responseText, statusText, xhr, $form){
				$('#successMsg').html("The message has been successfully sent to queue :  <span style=\"color:red\">"+responseText+"</span><br />");
				$('#successMsg').show();
				$('#message').val('');
			}
		});
	});
});

