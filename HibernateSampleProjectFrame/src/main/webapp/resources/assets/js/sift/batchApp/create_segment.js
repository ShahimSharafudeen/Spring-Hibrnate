var isProgramBuilderModalOn = false;

$(function() {
	var token = $("meta[name='_csrf']").attr("content");
	loadTestcaseList();
	var gotoJobList = ""; // Used as a marker to go to jobList
	$('#timeZone').timezones();
	$("<option></option>").insertBefore($('#timeZone option:first-child'));
	$("#timeZone").select2({
		placeholder : 'Select timezone',
		allowClear : true
	}).on(
			'select2-open',
			function() {
				// Adding Custom Scrollbar
				$(this).data('select2').results.addClass('overflow-hidden')
						.perfectScrollbar();
			});

	$("#frequency").select2({
		placeholder : 'Select frequency',
		allowClear : true,
		minimumResultsForSearch : -1
	}).on(
			'select2-open',
			function() {
				// Adding Custom Scrollbar
				$(this).data('select2').results.addClass('overflow-hidden')
						.perfectScrollbar();
			}).on("change", function(e) {
		$('input[name=selectOne]').attr("checked", false);
		$('input[name=weekDay]').attr("checked", false);
		$('#interval').val("");
		$('input[name=startTime]').val("");
		$('#which').val("");
		$('#day').val("");
		$('#date').val("");
		$('#monthInterval').val("");
		$('#month').val("");
		$('#monthAndDateMonth').val("");
		$('#monthAndDateDate').val("");
		$('#startTime').timepicker();
		showDisplayLogic(e.val)
	});
//To check Segment flow name contain special character 
	$("#segmentName")
			.keyup(
					function() {
						$('.successMsg').hide();
						$('.failureMsg').hide();
						var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
						var flowName = $(this).val();

						if (format.test(flowName)) {
							$('.failureMsg')
									.html(
											'<strong>Special charactor is not allowed in Segment Name ...</strong>');
							$('.failureMsg').show();
						}

					});

	//To check Segment flow name already present or not 
	$("#segmentName")
			.blur(
					function() {
						$('.successMsg').hide();
						$('.failureMsg').hide();
						var segmentFlowName = {
							"segmentName" : $('#segmentName').val()
						};
						var token = $("meta[name='_csrf']").attr("content");
						$
								.ajax(
										{
											method : "POST",
											headers : {
												"X-CSRF-TOKEN" : token
											},
											url : window.rootContext
													+ "secure/segmentNameValidation",
											dataType : 'json',
											data : segmentFlowName
										})
								.done(
										function(msg) {
											if (msg == true) {
												$('.failureMsg')
														.html(
																'<strong>Segment Name Already present ...</strong>');
												$('.failureMsg').show();
											}
										})

					});

	// Save/Execute segment flow 
	$('#saveButton,#executeTestcase')
			.on(
					'click',
					function(e) {
						var archivalFormData = {
							"startDate" : "",
							"endDate" : "",
							"frequency" : "",
							"timeZone" : "",
							"tables" : [],
							"tableColumnMap" : {},
							"oozieJobId" : ""
						};
						var cronInput = {};
						cronInput.frequency = $('#frequency').val();
						cronInput.selectOne = $('input[name=selectOne]:checked')
								.val();
						cronInput.interval = $('#interval').val();
						cronInput.weekDay = $(
								"input[name=weekDay]:checkbox:checked").map(
								function() {
									return $(this).val();
								}).toArray();
						cronInput.startTime = $('input[name=startTime]').val();
						cronInput.which = $('#which').val();
						cronInput.day = $('#day').val();
						cronInput.date = $('#date').val();
						cronInput.monthOrYearInterval = $('#monthInterval')
								.val();
						cronInput.month = $('#month').val();
						cronInput.monthAndDateMonth = $('#monthAndDateMonth')
								.val();
						cronInput.monthAndDateDate = $('#monthAndDateDate')
								.val();
						cronInput.timeZone = $('#timeZone').val();
						var token = $("meta[name='_csrf']").attr("content");
						$.ajax({
							type : "POST",
							url : window.rootContext
									+ "secure/createCronExpression",
							headers : {
								"X-CSRF-TOKEN" : token
							},
							contentType : "application/json",
							async : false,
							data : JSON.stringify(cronInput),
							success : function(data) {
								$('#segmentCronExpression').val(data);
							}
						});
						if ($('#segmentName').val() == ''
								|| $('#segmentDescription').val() == ''
								|| $('#segmentCategory').val() == ''
								|| $('#segmentCreationStartDate').val() == ''
								|| $('#segmentCreationEndDate').val() == ''
								|| $('#segmentCreationEndDate').val() <= $(
										'#segmentCreationStartDate').val()
								|| $('#segmentRunFrequency').val() == ''
								|| $('#segmentRunTime').val() == ''
								|| $('#segmentProcessTime').val() == ''
								|| $('#segmentCronExpression').val() == ''
								|| existingDiagramData == undefined) {
							e.preventDefault();
							$('.successMsg').hide();
							$('.failureMsg').hide();
							actionType = e.target
									.getAttribute('data-actionType');
							var token = $("meta[name='_csrf']").attr("content");
							$
									.ajax(
											{
												method : "POST",
												headers : {
													"X-CSRF-TOKEN" : token
												},
												url : window.rootContext
														+ "secure/validateNewBatchcase/json.do"
											})
									.done(
											function(msg) {
												if ($('#segmentName').val() == '') {
													$('.failureMsg')
															.html(
																	'<strong>Please Enter Segment Name</strong>');
													$('.failureMsg').show();
												} else if ($(
														'#segmentDescription')
														.val() == '') {
													$('.failureMsg')
															.html(
																	'<strong>Please Enter Segment Descripion</strong>');
													$('.failureMsg').show();
												} else if ($(
														'#segmentCreationStartDate')
														.val() == '') {
													$('.failureMsg')
															.html(
																	'<strong>Please Enter Segment Run Start Date</strong>');
													$('.failureMsg').show();
												} else if ($(
														'#segmentCreationEndDate')
														.val() == '') {
													$('.failureMsg')
															.html(
																	'<strong>Please Enter Segment Run End Date</strong>');
													$('.failureMsg').show();
												} else if ($(
														'#segmentCreationEndDate')
														.val() <= $(
														'#segmentCreationStartDate')
														.val()) {
													$('.failureMsg')
															.html(
																	'<strong>Segment Run End Date cannot be less than/equal to Segment Run Start Date , Please reset the Segment Run End Date... </strong>');
													$('.failureMsg').show();

												} else if ($('#segmentCategory')
														.val() == '') {
													$('.failureMsg')
															.html(
																	'<strong>Please Enter Segment Category</strong>');
													$('.failureMsg').show();
												} else if ($(
														'#segmentRunFrequency')
														.val() == '') {
													$('.failureMsg')
															.html(
																	'<strong>Please Enter Segment Run Frequency</strong>');
													$('.failureMsg').show();
												} else if ($('#segmentRunTime')
														.val() == '') {
													$('.failureMsg')
															.html(
																	'<strong>Please Enter Segment Run Time</strong>');
													$('.failureMsg').show();
												} else if ($(
														'#segmentProcessTime')
														.val() == '') {
													$('.failureMsg')
															.html(
																	'<strong>Please Enter Segment Process Time</strong>');
													$('.failureMsg').show();
												} else if ($(
														'#segmentCronExpression')
														.val() == '') {
													$('.failureMsg')
															.html(
																	'<strong>Please Enter Input Values for Create Cron Expression</strong>');
													$('.failureMsg').show();
												} else if (existingDiagramData == undefined) {
													$('.failureMsg')
															.html(
																	'<strong>Please Create Flow Builder</strong>');
													$('.failureMsg').show();
												}
											})
						} else {
							e.preventDefault();
							$('.successMsg').hide();
							$('.failureMsg').hide();
							actionType = e.target
									.getAttribute('data-actionType');
							var histories = JSON.stringify(runhistory);
							var batchcase = {
								"actionType" : actionType,
								"name" : $('#segmentName').val(),
								"description" : $('#segmentDescription').val(),
								"category" : $('#segmentCategory').val(),
								"creationStartDate" : $(
										'#segmentCreationStartDate').val(),
								"creationEndDate" : $('#segmentCreationEndDate')
										.val(),
								/*
								 * "runFrequency" : $('#segmentRunFrequency')
								 * .val(), "runTime" :
								 * $('#segmentRunTime').val(),
								 */
								"cronInput" : JSON.stringify(cronInput),
								"processTime" : $('#segmentProcessTime').val(),
								"flowdata" : existingDiagramData,
								"rrule" : actionType,
								"cronExpression" : $('#segmentCronExpression')
										.val(),
								"history" : histories
							};
							var token = $("meta[name='_csrf']").attr("content");
							$
									.ajax(
											{
												method : "POST",
												headers : {
													"X-CSRF-TOKEN" : token
												},
												url : window.rootContext
														+ "secure/saveBatchcase/json.do",
												dataType : 'json',
												data : batchcase
											})
									.done(
											function(msg) {
												if (actionType == 'save') {
													$('.successMsg')
															.html(
																	'<strong>Batch case saved successfully</strong>');
													$('.successMsg').show();
												}
												if (actionType == 'execute') {
													$('.successMsg')
															.html(
																	'<strong>Batch case execution scheduled successfully</strong>');
													$('.successMsg').show();
												}
											})
						}
					});

	$('#checkForCustId').on("change", function(e) {
		if ($(this).is(":checked")) {
			$('#newCustomerIdDiv').fadeIn();
		} else {
			$('#newCustomerIdDiv').fadeOut();
			$('#newCustomerId').val('');
		}
	});

	$('input#connected_start').dateinput({
		selectors : true
	});

	/*
	 * $("textarea[name=connected]").recurrenceinput({ startField :
	 * "connected_start", ajaxURL : 'recurrenceinput.do' });
	 */

});

function loadTestcaseList() {
	var token = $("meta[name='_csrf']").attr("content");
	var url = window.rootContext + 'secure/listBatchcases/json';
	var segmentCategoryUrl = window.rootContext
			+ 'secure/listSegmentCategory/json';
	var segmentRunFrequencyUrl = window.rootContext
			+ 'secure/listSegmentRunFrequency/json';
	var testCaseArray = [];
	var segmentCategoryArray = [];
	var segmentRunFrequencyArray = [];
	$('#segmentRunTime').timepicker();
	$('#segmentProcessTime').timepicker();
	$("#segmentCreationStartDate").datepicker({
		dateFormat : 'dd/mm/yy'
	});
	$("#segmentCreationEndDate").datepicker({
		dateFormat : 'dd/mm/yy'
	});
	// $("#Spinner").spin(spinnerOptions);
	$.ajax({
		type : 'get',
		url : url,
		headers : {
			"X-CSRF-TOKEN" : token
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
			$('#batchCases').select2({
				data : testCaseArray,
				placeholder : '---- BATCH CASES ----'
			});
			$("#Spinner").spin(false);
		},
		error : function(request, status, error) {
			$("#Spinner").spin(false);
		}
	});
	var token = $("meta[name='_csrf']").attr("content");
	$.ajax({
		type : 'get',
		url : segmentCategoryUrl,
		headers : {
			"X-CSRF-TOKEN" : token
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
				segmentCategoryArray.push(testCaseObj);
			}
			$("#segmentCategory").select2({
				createSearchChoice : function(term, data) {
					if ($(data).filter(function() {
						return this.text.localeCompare(term) === 0;
					}).length === 0) {
						return {
							id : term,
							text : term
						};
					}
				},
				multiple : false,
				data : segmentCategoryArray
			});
			$("#Spinner").spin(false);
		},
		error : function(request, status, error) {
			$("#Spinner").spin(false);
		}
	});
	showDisplayLogic();
}
function showDisplayLogic(frequencyValue) {
	$('#startTime').timepicker();
	if (frequencyValue == 'minutes') {
		$('#minHourDayLabel').html('Minute(s)');
		$('.minHourDaySelector').fadeIn();
		$('.atSelector').fadeOut();
		$('.everyWeekDaySelector').fadeOut();
		$('input[name=selectOne][value=every]').click();
		$('.weekDaySelector').fadeOut();
		$('.monthly').fadeOut();
		$('#other').fadeIn();
		$('.whichDayOfWeekSelector').fadeOut();
		$('.yearly').fadeOut();
		$('#monthlyInterval').hide();
	} else if (frequencyValue == 'hourly') {
		$('#minHourDayLabel').html('Hour(s)');
		$('.minHourDaySelector').fadeIn();
		$('.atSelector').fadeIn();
		$('.everyWeekDaySelector').fadeOut();
		$('.atOrStartTimeRadio').fadeIn();
		$('#atOrStartTimeLabel').html('At');
		$('.weekDaySelector').fadeOut();
		$('.monthly').fadeOut();
		$('#other').fadeIn();
		$('.whichDayOfWeekSelector').fadeOut();
		$('.yearly').fadeOut();
		$('#monthlyInterval').hide();
	} else if (frequencyValue == 'daily') {
		$('#minHourDayLabel').html('Day(s)');
		$('.minHourDaySelector').fadeIn();
		$('.atSelector').fadeIn();
		$('.everyWeekDaySelector').fadeIn();
		$('.atOrStartTimeRadio').fadeOut();
		$('#atOrStartTimeLabel').html('Segment Run Start Time');
		$('.weekDaySelector').fadeOut();
		$('.monthly').fadeOut();
		$('#other').fadeIn();
		$('.whichDayOfWeekSelector').fadeOut();
		$('.yearly').fadeOut();
		$('#monthlyInterval').hide();
	} else if (frequencyValue == 'weekly') {
		$('.atSelector').fadeIn();
		$('.weekDaySelector').fadeIn();
		$('.everyWeekDaySelector').fadeOut();
		$('.atOrStartTimeRadio').fadeOut();
		$('#atOrStartTimeLabel').html('Segment Run Start Time');
		$('.minHourDaySelector').fadeOut();
		$('.monthly').fadeOut();
		$('#other').fadeIn();
		$('.whichDayOfWeekSelector').fadeOut();
		$('.yearly').fadeOut();
		$('#monthlyInterval').hide();
	} else if (frequencyValue == 'monthly') {
		$('.atSelector').fadeIn();
		$('.everyWeekDaySelector').fadeOut();
		$('.atOrStartTimeRadio').fadeOut();
		$('#atOrStartTimeLabel').html('Segment Run Start Time');
		$('.weekDaySelector').fadeOut();
		$('#minHourDayLabel').html('Month(s)');
		$('.monthly').show();
		$('#other').hide();
		$('.minHourDaySelector').fadeIn();
		$('.whichDayOfWeekSelector').fadeIn();
		$('#monthlyInterval').show();
		$('.yearly').fadeOut();
	} else if (frequencyValue == 'yearly') {
		$('.minHourDaySelector').fadeOut();
		$('.atSelector').fadeIn();
		$('.everyWeekDaySelector').fadeOut();
		$('.atOrStartTimeRadio').fadeOut();
		$('#atOrStartTimeLabel').html('Segment Run Start Time');
		$('.weekDaySelector').fadeOut();
		$('.whichDayOfWeekSelector').fadeIn();
		$('#monthlyInterval').hide();
		$('.yearly').fadeIn();
	} else {
		$('.minHourDaySelector').hide();
		$('#minHourDayLabel').html('Hour(s)');
		$('.atSelector').hide();
		$('.everyWeekDaySelector').hide();
		$('.atOrStartTimeRadio').hide();
		$('.weekDaySelector').hide();
		$('.whichDayOfWeekSelector').fadeOut();
		$('.yearly').fadeOut();
	}
}
