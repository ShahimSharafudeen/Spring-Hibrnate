var triggerTypeMap = [{id : 0, text : 'Behavioural Trigger'}, {id : 1, text : 'Monitoring Trigger'}];
var siftTriggerNameMap = [];

$(function() {
	
	loadJoinData();
	
	
	$('#joinDataTemporaryTableName').on("change", function(e) {
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
				$('#joinDataQuery').val(data);
				$("#Spinner").spin(false);
			},
			error : function(request, status, error) {
				$("#Spinner").spin(false);
			}
		});
	});
	
	$('#joinDataResetButton').click(function(e) {
		resetJoinDataProperties();
	});
	
	$('#joinDataSaveButton').click(function(e) {
		var token = $("meta[name='_csrf']").attr("content");
		if ($('#joinDataDatabaseName').val() == ''
			|| $('#joinDataTemporaryTableName').val() == ''
			|| $('#joinDataQuery').val() == '' ){
		e.preventDefault();
		$('.joinSuccessMsg').hide();
		$('.joinFailureMsg').hide();
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
					if ($('#joinDataDatabaseName').val() == '') {
						$('.joinFailureMsg')
								.html(
										'<strong>Please Select Database Name</strong>');
						$('.joinFailureMsg').show();
					} else if ($(
							'#joinDataTemporaryTableName')
							.val() == '') {
						$('.joinFailureMsg')
								.html(
										'<strong>Please Enter/Select Join Id</strong>');
						$('.joinFailureMsg').show();
					} else if ($('#segmentCriteriaQuery')
							.val() == '') {
						$('.joinFailureMsg')
								.html(
										'<strong>Please Enter Join Query</strong>');
						$('.joinFailureMsg').show();
					} 
				})
		
		}
		else
			{
		updateModelFromUI('joinDataQuery', $('#joinDataQuery').val());
		updateModelFromUI('joinDataDatabaseName', $('#joinDataDatabaseName').val());
		updateModelFromUI('joinDataTemporaryTableName', $('#joinDataTemporaryTableName').val());

		$.ajax({
			url : window.rootContext +"secure/saveSegmentIdAndQuery.do",
			type : "post",
			headers: {
		  		"X-CSRF-TOKEN":token
		  	},
			data : {
				segmentId : $('#joinDataTemporaryTableName').val(),
				segmentQuery : $('#joinDataQuery').val()
			},
			async : false,
			success : function(data, textStatus, jqXHR) {
			},
			error : function(jqXHR, textStatus, errorThrown) {
			}
		});
		$('#joinDataPropertiesModal').modal('toggle');
			}
	});
});

function loadJoinData() {
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
			$('#joinDataDatabaseName').select2({
				multiple: false,
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
			$("#joinDataTemporaryTableName").select2({
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

function populateJoinDataPropertiesModal(node) {
	var token = $("meta[name='_csrf']").attr("content");
	$("#joinDataPropertiesModalDiv").css('display', 'block');
	$("#joinDataPropertiesModal").modal(propertiesObj);
	resetJoinDataProperties();

	if (node.data) {
		var query = node.data.joinDataQuery;
		var database = node.data.joinDataDatabaseName;
		var tempTable=node.data.joinDataTemporaryTableName;
		$('#joinDataDatabaseName').val(database).trigger('change');
		$('#joinDataTemporaryTableName').val(tempTable).trigger('change');
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
				$('#joinDataQuery').val(data);
				$("#Spinner").spin(false);
			},
			error : function(request, status, error) {
				$("#Spinner").spin(false);
			}
		});
		console.log('outputFilePath');
		if(node.data.description != undefined && node.data.description != '' && node.data.error=='true') {
			$('#joinDataOutputFilePathDiv').html(node.data.description);
			$('#joinDataOutputFilePathMainDiv').show();
		}else {
			$('#joinDataOutputFilePathDiv').html('');
			$('#joinDataOutputFilePathMainDiv').hide();
		}
			
		//populateTriggerDetails(selectedTriggerId);
	}
}

function resetJoinDataProperties() {
	$('#joinDataQuery').val('');
	$('#joinDataDatabaseName').val('').trigger('change');
	$('#joinDataTemporaryTableName').val('');
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