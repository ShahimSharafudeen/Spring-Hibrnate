var triggerTypeMap = [{id : 0, text : 'Behavioural Trigger'}, {id : 1, text : 'Monitoring Trigger'}];
var siftTriggerNameMap = [];

$(function() {
	
	//loadProgramTriggers();
	
	$('#controlGroupResetButton').click(function(e) {
		resetControlGroupProperties();
	});
	
	$('#controlGroupSaveButton').click(function(e) {
		updateModelFromUI('controlGroupQuery', $('#controlGroupQuery').val());
		$('#controlGroupPropertiesModal').modal('toggle');
	});
});

function populateControlGroupPropertiesModal(node) {
	$("#controlGroupPropertiesModalDiv").css('display', 'block');
	$("#controlGroupPropertiesModal").modal(propertiesObj);
	resetControlGroupProperties();

	if (node.data) {
		var query = node.data.controlGroupQuery;	
		$('#controlGroupQuery').val(query);
		console.log('outputFilePath');
		if(node.data.outputFile != undefined && node.data.outputFile != '') {
			$('#controlGroupOutputFilePathDiv').html(node.data.outputFile);
			$('#controlGroupOutputFilePathMainDiv').show();
		}else {
			$('#controlGroupOutputFilePathDiv').html('');
			$('#controlGroupOutputFilePathMainDiv').hide();
		}
			
		//populateTriggerDetails(selectedTriggerId);
	}
}

function resetControlGroupProperties() {
	$('#controlGroupQuery').val('');
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