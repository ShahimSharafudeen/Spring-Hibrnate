
$(function() {
	
	loadFilterCriteria();
	
	$('#filterCriteriaResetButton').click(function(e) {
		resetFilterCriteriaProperties();
	});
	
	$('#filterCriteriaSaveButton').click(function(e) {
		var token = $("meta[name='_csrf']").attr("content");
		if ($('#campaignId').val() == ''
			|| $('#filterStartDate').val() == ''
			|| $('#filterEndDate').val() == ''
			|| $('#contactStatus').val() == '' ){
		e.preventDefault();
		$('.segmentSuccessMsg').hide();
		$('.segmentFailureMsg').hide();
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
					if ($('#campaignId').val() == '') {
						$('.segmentFailureMsg')
								.html(
										'<strong>Please Select Campaign Id</strong>');
						$('.segmentFailureMsg').show();
					} else if ($(
							'#filterStartDate')
							.val() == '') {
						$('.segmentFailureMsg')
								.html(
										'<strong>Please Enter Filter StartDate</strong>');
						$('.segmentFailureMsg').show();
					} else if ($(
					'#filterEndDate')
					.val() == '') {
				$('.segmentFailureMsg')
						.html(
								'<strong>Please Enter Filter EndDate</strong>');
				$('.segmentFailureMsg').show();
			} else if ($('#contactStatus')
							.val() == '') {
						$('.segmentFailureMsg')
								.html(
										'<strong>Please Select Contact Status</strong>');
						$('.segmentFailureMsg').show();
					} 
				})
		
		}
		else
			{
			$('.segmentSuccessMsg').hide();
			$('.segmentFailureMsg').hide();
		updateModelFromUI('campaignId', $('#campaignId').val());
		updateModelFromUI('filterStartDate', $('#filterStartDate').val());
		updateModelFromUI('filterEndDate', $('#filterEndDate').val());
		updateModelFromUI('contactStatus', $('#contactStatus').val());
		$('#filterCriteriaPropertiesModal').modal('toggle');
			}
	});
});

function loadFilterCriteria() {
	var token = $("meta[name='_csrf']").attr("content");
	
	var url = window.rootContext +'secure/listCampaignId';
	var url1 = window.rootContext +'secure/listContactStatus';
		
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
				$('#campaignId').select2({
					multiple: true,
					data : testCaseArray,
					placeholder : '---- Campaign Id ----'
				});
				$("#Spinner").spin(false);
			},
			error : function(request, status, error) {
				$("#Spinner").spin(false);
			}
		});
		
		var testCaseArray1 = [];
		$("#Spinner").spin(spinnerOptions);
		$.ajax({
			type : 'get',
			url : url1,
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
					testCaseArray1.push(testCaseObj);
				}
				$('#contactStatus').select2({
					multiple: true,
					data : testCaseArray1,
					placeholder : '---- Contact Status  ----'
				});
				$("#Spinner").spin(false);
			},
			error : function(request, status, error) {
				$("#Spinner").spin(false);
			}
		});

}

function populateFilterCriteriaPropertiesModal(node) {
	$("#filterCriteriaPropertiesModalDiv").css('display', 'block');
	$("#filterCriteriaPropertiesModal").modal(propertiesObj);
	resetFilterCriteriaProperties();

	if (node.data) {
		var campaignId = node.data.campaignId;
		var filterStartDate = node.data.filterStartDate;
		var filterEndDate = node.data.filterEndDate;
		var contactStatus = node.data.contactStatus;
		$('#campaignId').val(campaignId).trigger('change');
		$('#filterStartDate').val(filterStartDate);
		$('#filterEndDate').val(filterEndDate);
		$('#contactStatus').val(contactStatus).trigger('change');
		if(node.data.description != undefined && node.data.description != '') {
			$('#filterCriteriaOutputFilePathDiv').html(node.data.description);
			$('#filterCriteriaOutputFilePathMainDiv').show();
		}else {
			$('#filterCriteriaOutputFilePathDiv').html('');
			$('#filterCriteriaOutputFilePathMainDiv').hide();
		}
			
		//populateTriggerDetails(selectedTriggerId);
	}
}

function resetFilterCriteriaProperties() {
	$('#campaignId').val('').trigger('change');
	$('#filterStartDate').val('');
	$('#filterEndDate').val('');
	$('#contactStatus').val('').trigger('change');
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