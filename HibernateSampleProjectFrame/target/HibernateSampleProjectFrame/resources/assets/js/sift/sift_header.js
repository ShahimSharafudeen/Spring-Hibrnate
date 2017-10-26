$(function () {
	
    var url = window.location.href;
    if (url.indexOf("/insights") > -1) {
     	$('#nav1').addClass('activ');
     	$('#helpId').attr('href', url.substr(0, url.indexOf('/insights') + 9) + '/help');
    } else if (url.indexOf("/siftField") > -1) {
     	$('#nav2').addClass('activ');
     	$('#helpId').attr('href', url.substr(0, url.indexOf('/siftField') + 10) + '/help');
    } else if (url.indexOf("/siftFunction") > -1) {
     	$('#nav3').addClass('activ');
     	$('#helpId').attr('href', url.substr(0, url.indexOf('/siftFunction') + 13) + '/help');
    } else if (url.indexOf("/administration") > -1) {
     	$('#nav8').addClass('activ');
     	$('#helpId').attr('href', url.substr(0, url.indexOf('/administration') + 15) + '/help');
    }  else if (url.indexOf("/indicator") > -1) {   
     	$('#nav4').addClass('activ');
     	$('#helpId').attr('href', url.substr(0, url.indexOf('/indicator') + 10) + '/help');
    } else if (url.indexOf("/event") > -1) {
     	$('#nav5').addClass('activ');
     	$('#helpId').attr('href', url.substr(0, url.indexOf('/event') + 6) + '/help');
    } else if (url.indexOf("/program") > -1 || url.indexOf("/programTemplate") > -1 || url.indexOf("/offer") > -1 || url.indexOf("/trigger") > -1 || url.indexOf("/product") > -1) {
     	$('#nav6').addClass('activ');
     	$('#helpId').attr('href', url.substr(0, url.indexOf('/program') + 8) + '/help');
    } else if (url.indexOf("/geofence") > -1) {
     	$('#nav7').addClass('activ');
     	$('#helpId').attr('href', url.substr(0, url.indexOf('/geofence') + 9) + '/help');
    } else if (url.indexOf("/dataLoader") > -1) {
     	$('#nav9').addClass('activ');
     	$('#helpId').attr('href', url.substr(0, url.indexOf('/dataLoader') + 15) + '/help');
    } 
    
	$('#cancelButton').click(function() {
		
		if ($('#failureMsg')) {
			$('#failureMsg').html('');
		}
		
		if ($('#failureMessage')) {
			$('#failureMessage').html('');
		}
		
		if ($('#successMsg')) {
			$('#successMsg').html('');
		}
		
		if ($('#successMessage')) {
			$('#successMessage').html('');
		}
		
		window.history.back();
				
	    return false;
	});

	
});