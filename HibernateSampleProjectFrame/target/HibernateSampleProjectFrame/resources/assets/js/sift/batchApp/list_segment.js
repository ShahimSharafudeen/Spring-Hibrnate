var programListTable;

$(function () {
	
	programListTable = $('#programListTable').DataTable({
	});
	
	$('#programListTable').on('click', '.btn7', function(e) {
		var id = $(this).attr('id');
		var n = id.indexOf("-");
	   id = id.substring(n + 1);
	   stopProgram(window.rootContext + "secure/segmentRunStop/" + id, id);
	    return false;
	});
	
	$('#programListTable').on('click', '.btn6', function(e) {
		var id = $(this).attr('id');
		var n = id.indexOf("-");
	    id = id.substring(n + 1);
		window.location = window.rootContext + "secure/segmentEdit/" + id;
	});
	
	$('#programListTable').on('click', '.btn8', function(e) {
		
		bootbox.confirm("Are you sure on Deleting Program?", function(result) {
			if (result) {
				var id = e.currentTarget.id;
				var n = id.indexOf("-");
				id = id.substring(n + 1);
				deleteProgram(window.rootContext + "secure/segmentDelete/" + id, id);
			}
		}); 
	});
	
	$('#programListTable').on('click', '.btn10', function(e) {
		var id = $(this).attr('id');
		var n = id.indexOf("-");
		var m = id.indexOf(",");
		var l = id.indexOf("_");
	    var segmentName = id.substring(n + 1,m);
	    var startDate = id.substring(m + 1,l);
	    var runTime = id.substring(l + 1)
	    
	    console.log(" segment name "+segmentName);
	    console.log(" segment date "+startDate);
	    console.log(" segment runTime "+runTime);
	    
	    //convert startDate "dd/mm/yyyy" to "mm/dd/yyyy"
   
	    var datearray = startDate.split("/");
	    var newStartDate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
	    
	    console.log(" segment newStartDate "+newStartDate);
	    
	    runProgram(window.rootContext + "secure/segmentRun/" + segmentName, segmentName, newStartDate, runTime);
	    return false;
	});
	
	$('#programListTable').on('click', '.btn9', function(e) {
		var id = $(this).attr('id');
		var n = id.indexOf("-");
	   id = id.substring(n + 1);
	   pauseProgram(window.rootContext + "secure/segmentRunPause/" + id, id);
	    return false;
	});

});

function updateProgramStatus(url, id) {
	
	var token = $("meta[name='_csrf']").attr("content");
	$("#Spinner").spin(spinnerOptions);
    $.ajax({
  	  	type: 'post',
  	  	url: url,
  	  	headers: {
	  		"X-CSRF-TOKEN":token
	  	},
  	  	dataType: 'json',
  		
  	  	success: function(data) {
  	  	
  	  		
			if (data.status == 'validationError') {
				var errors = data.errors;
			} else if (data.status == 'timeout') {
				window.location = window.rootContext + "logout/";
			} else if (data.status == 'locked') {
				window.location = window.rootContext + "logout/?reason=LOCKED";
			} else if (data.status == 'success') {
				$('#successMsg').html(data['message']);
				$('#successMsg').show();
				$('#createOrUpdateProgramList-successMsg').hide();
				$('#failureMsg').hide();
  
				if ($("#status-" + id).hasClass('btn btn5')) {
  					$("#status-" + id).removeClass('btn btn5');
  					$("#status-" + id).addClass('btn btn5b');
  					
				} else {
  					$("#status-" + id).removeClass('btn btn5b');
  					$("#status-" + id).addClass('btn btn5');
				}
			} else if (data.status == "fail") {
				$('#failureMsg').html(data['message']);
				$('#failureMsg').show();
				$('#createOrUpdateProgramList-successMsg').hide();
				$('#successMsg').hide();
			}
			$("#Spinner").spin(false);
  	  	},
  	  	error: function (request, status, error) {
	  	
  	  	}
    });
}

function deleteProgram(url, id) {
	var token = $("meta[name='_csrf']").attr("content");
	$("#Spinner").spin(spinnerOptions);

    $.ajax({
  	  	type: 'post',
  	  	url: url,
  	  	headers: {
	  		"X-CSRF-TOKEN":token
	  	},
  		
  	  	success: function(data) {
		    if (data == 'success') {
				window.location = window.rootContext + "secure/listOfSegments";
			} else if (data == "fail") {
				$('#failureMsg').html(data['message']);
				$('#failureMsg').show();
			}
			$("#Spinner").spin(false);
  	  	},
  	  	error: function (request, status, error) {
	  	
  	  	}
    });
}
    function runProgram(url,segmentName,date,runTime) {
    	var token = $("meta[name='_csrf']").attr("content");
    	var status = null;
    	var todayDate = new Date();
    	var startDate = new Date(date+" "+runTime);
    	
    	 console.log(" segment todate "+todayDate);
 	    console.log(" segment startdate "+startDate);
    	
    	$("#Spinner").spin(spinnerOptions);
    	
    	$.ajax({
      	  	type: 'post',
      	  	url: window.rootContext + "secure/segmentRunStatus/" + segmentName,
      	    async : false,
      	  	headers: {
    	  		"X-CSRF-TOKEN":token
    	  	},
      		
      	  	success: function(data) {
      	  	status = data; 
      	  	},
      	  	error: function (request, status, error) {
    	  	
      	  	}
        });
    	console.log(" segment status "+status);
    	if(status == "stoped" && startDate<todayDate)
    		{
    		$('#failureMsg').html("Segment Run Start Date can't be less than current date , Please reset the Segment Run Start Date/Segment Process Time... ");
			$('#failureMsg').show();
			$("#Spinner").spin(false);
    		}
    	else
    		{
    		$.ajax({
          	  	type: 'post',
          	  	url: url,
          	  	headers: {
        	  		"X-CSRF-TOKEN":token
        	  	},
          		
          	  	success: function(data) {
        		    if (data == 'success') {
        		    	window.location = window.rootContext + "secure/listOfSegments";
        			} else if (data == "fail") {
        				$('#failureMsg').html(data['message']);
        				$('#failureMsg').show();
        			}
        			$("#Spinner").spin(false);
          	  	},
          	  	error: function (request, status, error) {
        	  	
          	  	}
            });
    		}
}
    
    function pauseProgram(url, id) {
    	var token = $("meta[name='_csrf']").attr("content");
    	$("#Spinner").spin(spinnerOptions);

        $.ajax({
      	  	type: 'post',
      	  	url: url,
      	  	headers: {
    	  		"X-CSRF-TOKEN":token
    	  	},
      		
      	  	success: function(data) {
    		    if (data == 'success') {
    		    	window.location = window.rootContext + "secure/listOfSegments";
    			} else if (data == "fail") {
    				$('#failureMsg').html(data['message']);
    				$('#failureMsg').show();
    			}
    			$("#Spinner").spin(false);
      	  	},
      	  	error: function (request, status, error) {
    	  	
      	  	}
        });
}
    
    function stopProgram(url, id) {
    	var token = $("meta[name='_csrf']").attr("content");
    	$("#Spinner").spin(spinnerOptions);

        $.ajax({
      	  	type: 'post',
      	  	url: url,
      	  	headers: {
    	  		"X-CSRF-TOKEN":token
    	  	},
      		
      	  	success: function(data) {
    		    if (data == 'success') {
    		    	window.location = window.rootContext + "secure/listOfSegments";
    				$('#successMsg').html(id+" flow is Stop Now");
    				$('#successMsg').show();
    			} else if (data == "fail") {
    				$('#failureMsg').html(data['message']);
    				$('#failureMsg').show();
    			}
    			$("#Spinner").spin(false);
      	  	},
      	  	error: function (request, status, error) {
    	  	
      	  	}
        });
}