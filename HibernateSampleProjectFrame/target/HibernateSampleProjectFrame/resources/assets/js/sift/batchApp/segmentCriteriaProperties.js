var triggerTypeMap = [{id : 0, text : 'Behavioural Trigger'}, {id : 1, text : 'Monitoring Trigger'}];
var siftTriggerNameMap = [];
var existingDiagramDataJson;
var startNode = {};
var existingDiagramData;
$(function() {
	 
	loadSegmentCriteria();
	
	$('#segmentCriteriaTemporaryTableName').on("change", function(e) {
		var token = $("meta[name='_csrf']").attr("content");
		$("#Spinner").spin(spinnerOptions);
		var selectedSegmentid = e.val;
		var url = window.rootContext +'secure/getSegmentQuery';
		$.ajax({
			type : 'get',
			url : url,
			headers: {
		  		"X-CSRF-TOKEN":token
		  	},
			data : {
				selectedSegmentId : selectedSegmentid,		
			},
			async : true,
			success : function(data) {
				$('#segmentCriteriaQuery').val(data);
				$("#Spinner").spin(false);
			},
			error : function(request, status, error) {
				$("#Spinner").spin(false);
			}
		});
	});
	
	$('#segmentCriteriaResetButton').click(function(e) {
		resetSegmentCriteriaProperties();
	});
	
	$('#segmentCriteriaSaveButton').click(function(e) {
		var token = $("meta[name='_csrf']").attr("content");
		if ($('#segmentCriteriaDatabaseName').val() == ''
			|| $('#segmentCriteriaTemporaryTableName').val() == ''
			|| $('#segmentCriteriaQuery').val() == '' ){
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
					if ($('#segmentCriteriaDatabaseName').val() == '') {
						$('.segmentFailureMsg')
								.html(
										'<strong>Please Select Database Name</strong>');
						$('.segmentFailureMsg').show();
					} else if ($(
							'#segmentCriteriaTemporaryTableName')
							.val() == '') {
						$('.segmentFailureMsg')
								.html(
										'<strong>Please Enter/Select Segment Id</strong>');
						$('.segmentFailureMsg').show();
					} else if ($('#segmentCriteriaQuery')
							.val() == '') {
						$('.segmentFailureMsg')
								.html(
										'<strong>Please Enter Segment Query</strong>');
						$('.segmentFailureMsg').show();
					} 
				})
		
		}
		else
			{
			$('.segmentSuccessMsg').hide();
			$('.segmentFailureMsg').hide();
		updateModelFromUI('segmentCriteriaQuery', $('#segmentCriteriaQuery').val());
		updateModelFromUI('segmentCriteriaDatabaseName', $('#segmentCriteriaDatabaseName').val());
		updateModelFromUI('segmentCriteriaTemporaryTableName', $('#segmentCriteriaTemporaryTableName').val());
		updateModelFromUI('text', $('#segmentCriteriaTemporaryTableName').val());
		$.ajax({
			url : window.rootContext +"secure/saveSegmentIdAndQuery.do",
			headers: {
		  		"X-CSRF-TOKEN":token
		  	},
			type : "post",
			data : {
				segmentId : $('#segmentCriteriaTemporaryTableName').val(),
				segmentQuery : $('#segmentCriteriaQuery').val()
			},
			async : false,
			success : function(data, textStatus, jqXHR) {
			},
			error : function(jqXHR, textStatus, errorThrown) {
			}
		});
		$('#segmentCriteriaPropertiesModal').modal('toggle');
			}
	});
});

function loadSegmentCriteria() {
	var token = $("meta[name='_csrf']").attr("content");
	var url = window.rootContext +'secure/listBatchServerName/json';
	var url1 = window.rootContext +'secure/getSegmentId';
	
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
			$('#segmentCriteriaDatabaseName').select2({
				data : testCaseArray,
				placeholder : '---- DATABASES ----'
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
					'text' : data[i],
					'newOption' : true
				};
				testCaseArray1.push(testCaseObj);
			}
			$("#segmentCriteriaTemporaryTableName").select2({
			    createSearchChoice:function(term, data) { 
			        if ($(data).filter(function() { 
			            return this.text.localeCompare(term)===0; 
			        }).length===0) 
			        {return {id:term, text:term};} 
			    },
			    multiple: false,
			    data: testCaseArray1
			});
			$("#Spinner").spin(false);
		},
		error : function(request, status, error) {
			$("#Spinner").spin(false);
		}
	});

}

function populateSegmentCriteriaPropertiesModal(node) {
	var token = $("meta[name='_csrf']").attr("content");
	$("#segmentCriteriaPropertiesModalDiv").css('display', 'block');
	$("#segmentCriteriaPropertiesModal").modal(propertiesObj);
	resetSegmentCriteriaProperties();

	if (node.data) {
		var query = node.data.segmentCriteriaQuery;	
		var database = node.data.segmentCriteriaDatabaseName;	
		var tempTable=node.data.segmentCriteriaTemporaryTableName;
		$('#segmentCriteriaDatabaseName').val(database).trigger('change');
		$('#segmentCriteriaTemporaryTableName').val(tempTable).trigger('change');
		var url = window.rootContext +'secure/getSegmentQuery';
		$.ajax({
			type : 'get',
			url : url,
			headers: {
		  		"X-CSRF-TOKEN":token
		  	},
			data : {
				selectedSegmentId : tempTable,		
			},
			async : true,
			success : function(data) {
				$('#segmentCriteriaQuery').val(data);
				$("#Spinner").spin(false);
			},
			error : function(request, status, error) {
				$("#Spinner").spin(false);
			}
		});
		if(node.data.description != undefined && node.data.description != '' && node.data.error=='true') {
			$('#segmentCriteriaOutputFilePathDiv').html(node.data.description);
			$('#segmentCriteriaOutputFilePathMainDiv').show();
		}else {
			$('#segmentCriteriaOutputFilePathDiv').html('');
			$('#segmentCriteriaOutputFilePathMainDiv').hide();
		}
			
		//populateTriggerDetails(selectedTriggerId);
	}
}

function resetSegmentCriteriaProperties() {
	$('#segmentCriteriaQuery').val('');
	$('#segmentCriteriaDatabaseName').val('').trigger('change');
	$('#segmentCriteriaTemporaryTableName').val('');
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