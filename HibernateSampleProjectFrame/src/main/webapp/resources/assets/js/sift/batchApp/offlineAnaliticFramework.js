
$(function() {
	var token = $("meta[name='_csrf']").attr("content");
	loadModelDeployment();
	
	$("#modelExecutor-form").validationEngine({
		promptPosition : "topRight:-130,-5"
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
		
	$("#execute").click(function (event) {
		if(($('#version').val() != $('#oldVersion').val()) || ($('#modelName').val().replace(" ", "").toLowerCase() != $('#oldModelName').val().replace(" ", "").toLowerCase())) {
			$('#id').val('');
		}
		event.preventDefault();
		$('.successMsg').hide();
		$('.failureMsg').hide();
		
        var form = $(this);
        
        if ($("#modelExecutor-form").validationEngine()) {
       
		
		// This to create cron expression base on cronInput values ...Start.
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
		cronInput.timeZone = "UTC";
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
				//$('#scheduleInterval').val(data);
				$('#scheduleInterval').val(data);
			}
		});
		//Cron Expression set in "#scheduleInterval" hidden input field...
		// This to create cron expression base on cronInput values ...End.
		
		
		$('#modelExecutor-form').ajaxForm({
			dataType:"text",
			success : function() {
				//$('#modelExecutor-form').clearForm();
				//$('#successMsg').html('The model has been deployed successfully');
				//$('.successMsg').show();
				window.location = window.rootContext + "secure/offlineAnalyticFrameworkModelLibrary?modelId=" +  $('#modelName').val().replace(" ", "").toLowerCase()
			},
			error: function() {
				$('#failureMsg').html('Some internal error has occured');
				$('.failureMsg').show();
			}
		  }).submit();
        }

    });
	
	if($('#idToEdit').val() != undefined) {
		var url = window.rootContext + 'secure/getModelDeploymentById/' + $('#idToEdit').val()
		$.get( url, function( data ) {
			  jsonData = JSON.parse( data );
			  $('#id').val(jsonData.id);
			  $('#modelId').val(jsonData.modelId);
			  $('#modelName').val(jsonData.modelName);
			  $('#oldModelName').val(jsonData.modelName);
			  $('#modelDescription').val(jsonData.modelDescription);
			  $('#version').val(jsonData.version);
			  $('#oldVersion').val(jsonData.version);
			  $('#versionDescription').val(jsonData.versionDescription);
			  $('#dataPrepContext').val(jsonData.dataPrepContext);
			  $('#modelContext').val(jsonData.modelContext);
			  $('#viewGenerationContext').val(jsonData.viewGenerationContext);
			  $('#startDate').val(jsonData.startDate);
			  $('#scheduleInterval').val(jsonData.scheduleInterval);
			  $('#endDate').val(jsonData.endDate);
			  $('#emailOn').val(jsonData.emailOn);
			  $('#cronValue').html(jsonData.scheduleInterval);
			  $('#cronDiv').show();
			  $.each(jsonData.emailOn.split(','), function (index, value) {
				  $('input[name="emailOn"][value="' + value.toString() + '"]').prop("checked", true);
			  });
			  $('#emailId').val(jsonData.emailId);
			  //$('#taskDependency').val(jsonData.taskDependency);
			  $.each(jsonData.taskDependency.split(','), function (index, value) {
				  $('input[name="taskDependency"][value="' + value.toString() + '"]').prop("checked", true);
			  });
			  
			  if(jsonData.activate == 'true') {
				  $('#activate').prop("checked", true);
			  }
			  
			});
		$('#execute').html('Update &amp; Execute');
	}
	
	$('#newModelLink').addClass('active');

});

function loadModelDeployment() {
	$("#startDate").datepicker({
		dateFormat : 'dd/mm/yy'
	});
	$("#endDate").datepicker({
		dateFormat : 'dd/mm/yy'
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
