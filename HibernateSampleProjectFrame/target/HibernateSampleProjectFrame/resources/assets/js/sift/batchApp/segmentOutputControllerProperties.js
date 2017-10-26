var triggerTypeMap = [{id : 0, text : 'Behavioural Trigger'}, {id : 1, text : 'Monitoring Trigger'}];
var siftTriggerNameMap = [];
var splitAcrossDays = false;
var fileChecked=null;

$(function() {
	
	loadOutputController();
	
	$('#outputControllerResetButton').click(function(e) {
		resetOutputControllerProperties();
	});
	$('#splitAcrossDays').change(function(e){
		if($(this).is(':checked')){
			splitAcrossDays = true;
		}
		else
			{
			splitAcrossDays = false;
			}
	});

	$('input[name=yesno]').change(function(e){
		if (document.getElementById('yesCheck').checked) {
			$('.controlSuccessMsg').hide();
			$('.controlFailureMsg').hide();
	        document.getElementById('ifYes').style.visibility = 'visible';
	        document.getElementById('ifNo').style.visibility = 'hidden';
	        $('#splitAcrossDays').attr('checked', false);
	        $('#totalSegmentCountPerRun').val('');
	    	$('#outputControllerNoOfEntry').val('');
	    	$('#outputControllerSiftFilePath').val('');
	    }
	    else
	    	{
	    	$('.controlSuccessMsg').hide();
			$('.controlFailureMsg').hide();
	    	 document.getElementById('ifNo').style.visibility = 'visible';
	    	 document.getElementById('ifYes').style.visibility = 'hidden';
	    	 $('#outputControllerQueue').val('').trigger('change');
	    	}
	});
	
	
	$('#outputControllerSaveButton').click(function(e) {
		var token = $("meta[name='_csrf']").attr("content");
		if (document.getElementById('yesCheck').checked) {
			if ($('#outputControllerQueue').val() == ''){
			e.preventDefault();
			$('.controlSuccessMsg').hide();
			$('.controlFailureMsg').hide();
			$.ajax(
					{
						method : "POST",
						headers: {
					  		"X-CSRF-TOKEN":token
					  	},
						url : window.rootContext
								+ "secure/validateNewBatchcase/json.do"
					})
			.done(
					function(msg) {
						if ($('#outputControllerQueue').val() == '') {
							$('.controlFailureMsg')
									.html(
											'<strong>Please Select Queue Name</strong>');
							$('.controlFailureMsg').show();
						} 
					})
			
			}
			else
				{
				$('.controlSuccessMsg').hide();
				$('.controlFailureMsg').hide();
				updateModelFromUI('splitAcrossDays', false);
				updateModelFromUI('fileChecked', false);
				updateModelFromUI('totalSegmentCountPerRun', $('#totalSegmentCountPerRun').val());
				updateModelFromUI('outputControllerQueue', $('#outputControllerQueue').val());
				updateModelFromUI('outputControllerNoOfEntry', $('#outputControllerNoOfEntry').val());
				updateModelFromUI('outputControllerSiftFilePath', $('#outputControllerSiftFilePath').val());
				$('#outputControllerPropertiesModal').modal('toggle');
				}
	       
	    }
	    else
	    	{
	    	if ($('#totalSegmentCountPerRun').val() == ''
				|| $('#outputControllerNoOfEntry').val() == ''
				|| $('#outputControllerSiftFilePath').val() == '' ){
			e.preventDefault();
			$('.controlSuccessMsg').hide();
			$('.controlFailureMsg').hide();
			$.ajax(
					{
						method : "POST",
						headers: {
					  		"X-CSRF-TOKEN":token
					  	},
						url : window.rootContext
								+ "secure/validateNewBatchcase/json.do"
					})
			.done(
					function(msg) {
						if ($('#totalSegmentCountPerRun').val() == '') {
							$('.controlFailureMsg')
									.html(
											'<strong>Please Enter Total Segment Count Per Run</strong>');
							$('.controlFailureMsg').show();
						} else if ($(
								'#outputControllerNoOfEntry')
								.val() == '') {
							$('.controlFailureMsg')
									.html(
											'<strong>Please Enter Number of Entries Per File</strong>');
							$('.controlFailureMsg').show();
						} else if ($('#outputControllerSiftFilePath')
								.val() == '') {
							$('.controlFailureMsg')
									.html(
											'<strong>Please Enter Sift File Path</strong>');
							$('.controlFailureMsg').show();
						} 
					})
			
			}
			else
				{
				$('.controlSuccessMsg').hide();
				$('.controlFailureMsg').hide();
				updateModelFromUI('splitAcrossDays', splitAcrossDays);
				updateModelFromUI('fileChecked', true);
				updateModelFromUI('totalSegmentCountPerRun', $('#totalSegmentCountPerRun').val());
				updateModelFromUI('outputControllerQueue', $('#outputControllerQueue').val());
				updateModelFromUI('outputControllerNoOfEntry', $('#outputControllerNoOfEntry').val());
				updateModelFromUI('outputControllerSiftFilePath', $('#outputControllerSiftFilePath').val());
				$('#outputControllerPropertiesModal').modal('toggle');
				}
	    	}
	});
});

function loadOutputController() {
	var token = $("meta[name='_csrf']").attr("content");
var url = window.rootContext +'secure/listSegmentQueues/json';
	
	var testCaseArray = [];
	$("#Spinner").spin(spinnerOptions);
	$.ajax({
		type : 'get',
		url : url,
		headers: {
	  		"X-CSRF-TOKEN":token
	  	},
		dataType : 'json',
		async : true,
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				testCaseObj = {
					'id' : data[i],
					'text' : data[i]
				};
				testCaseArray.push(testCaseObj);
			}
			$('#outputControllerQueue').select2({
				data : testCaseArray,
				placeholder : '---- QUEUES ----'
			});
			$("#Spinner").spin(false);
		},
		error : function(request, status, error) {
			$("#Spinner").spin(false);
		}
	});
}

function populateOutputControllerPropertiesModal(node) {
	$("#outputControllerPropertiesModalDiv").css('display', 'block');
	$("#outputControllerPropertiesModal").modal(propertiesObj);
	//resetOutputControllerProperties();
	$('#totalSegmentCountPerRun').val('');
	$('#outputControllerNoOfEntry').val('');
	$('#outputControllerSiftFilePath').val('');
	$('#outputControllerQueue').val('').trigger('change');

	if (node.data) {
		fileChecked=node.data.fileChecked;
	    splitAcrossDays=node.data.splitAcrossDays;
		var query = node.data.totalSegmentCountPerRun;
		var outputControllerNoOfEntry = node.data.outputControllerNoOfEntry;
		var outputControllerSiftFilePath = node.data.outputControllerSiftFilePath;
		var queue = node.data.outputControllerQueue;
		if(fileChecked!=null)
			{
		if(fileChecked == true)
			{
			$('#noCheck').prop('checked',true);
			}
		else
			{
			$('#yesCheck').prop('checked',true);
			}
		$('input[name=yesno]').change();
			}
		$('#splitAcrossDays').attr('checked',splitAcrossDays);
		$('#totalSegmentCountPerRun').val(query);
		$('#outputControllerNoOfEntry').val(outputControllerNoOfEntry);
		$('#outputControllerSiftFilePath').val(outputControllerSiftFilePath);
		$('#outputControllerQueue').val(queue).trigger('change');
		console.log('outputFilePath');
		if(node.data.outputFile != undefined && node.data.outputFile != '') {
			$('#outputControllerOutputFilePathDiv').html(node.data.outputFile);
			$('#outputControllerOutputFilePathMainDiv').show();
		}else {
			$('#outputControllerOutputFilePathDiv').html('');
			$('#outputControllerOutputFilePathMainDiv').hide();
		}
		if(node.data.description != undefined && node.data.description != '' && node.data.error=='true') {
			$('#outputControllerOutputExceptionDiv').html(node.data.description);
			$('#outputControllerOutputExceptionMainDiv').show();
		}else {
			$('#outputControllerOutputExceptionDiv').html('');
			$('#outputControllerOutputExceptionMainDiv').hide();
		}
			
		//populateTriggerDetails(selectedTriggerId);
	}
}

function resetOutputControllerProperties() {
	$('#splitAcrossDays').attr('checked',false);
	$('#totalSegmentCountPerRun').val('');
	$('#outputControllerNoOfEntry').val('');
	$('#outputControllerSiftFilePath').val('');
	$('#outputControllerQueue').val('').trigger('change');
}

/*
 * Format the timestamp value into dd/MM/yyyy HH:mm:ss format.
 */
function formatTimestampWithOffset(longTimestamp) {
	var returnStr = '';
	
	if ($.isNumeric(longTimestamp)) {

		var currentDate = new Date();
		var timezoneOffset = currentDate.getTimezoneOffset();
	
		longTimestamp += (1000 * 60 * timezoneOffset);
		
		var dateFormatted = $.datepicker.formatDate('dd/mm/yy', new Date(longTimestamp));
		var timeFormatted = new Date(longTimestamp).toString().substr(16,8);
		
		returnStr = dateFormatted + ' ' + timeFormatted;
	}
	
	return returnStr;
}

function replaceAll(find, replace, str) {
	return str.replace(new RegExp(find, 'g'), replace);
}