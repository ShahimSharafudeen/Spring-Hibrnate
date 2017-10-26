var spinnerOptions = {
	lines: 10 // The number of lines to draw
	, length: 20 // The length of each line
	, width: 52 // The line thickness
	, radius: 42 // The radius of the inner circle
	, scale: 1 // Scales overall size of the spinner
	, corners: 1 // Corner roundness (0..1)
	, color: '#0000FF' // #rgb or #rrggbb or array of colors
	, opacity: 0.25 // Opacity of the lines
	, rotate: 0 // The rotation offset
	, direction: 1 // 1: clockwise, -1: counterclockwise
	, speed: 1 // Rounds per second
	, trail: 60 // Afterglow percentage
	, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
	, zIndex: 2e9 // The z-index (defaults to 2000000000)
	, top: '50%' // Top position relative to parent
	, left: '50%' // Left position relative to parent
	, shadow: true // Whether to render a shadow
	, hwaccel: false // Whether to use hardware acceleration
	, position: 'absolute' // Element positioning};
}

/*var entityMap = {
	"&" : "&amp;",
	"<" : "&lt;",
	">" : "&gt;",
	'"' : '&quot;',
	"'" : '&#39;',
	"/" : '&#x2F;'
};

function escapeHtml(string) {
	return String(string).replace(/[&<>"'\/]/g, function(s) {
		return entityMap[s];
	});
}

$(function () {

	try
	{ 
		top.document.domain 
	} catch (e) {
		var f = function()
		{ document.body.innerHTML = ''; }

		setInterval(f, 1);
		
		if (document.body)
			document.body.onload = f;
	}
	
	$( document ).on( 'focus', ':input', function(){
        $( this ).attr( 'autocomplete', 'off' );
    });
	
	$.datepicker.setDefaults($.datepicker.regional['']);
	$('#form-createEvent').find('#eventStartTime').datetimepicker({
		onSelect: function(theDate) {
	    	$('#form-createEvent').find('#eventEndTime')
	    		.datepicker('option', 'minDate', convertDateTime(theDate))
	    		.datetimepicker('option', 'minDateTime', convertDateTime(theDate));
	    	
	    },
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	$('#form-createEvent').find('#eventEndTime').datetimepicker({ 
		onSelect: function(theDate) {
	    	$('#form-createEvent').find('#eventStartTime')
	    		.datepicker('option', 'maxDate', convertDateTime(theDate))
	    		.datetimepicker('option', 'maxDateTime', convertDateTime(theDate));
	    },
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	$('#form-editEvent').find('#eventStartTime').datetimepicker({ 
		onSelect: function(theDate) {
			var currentEndTime = $('#form-editEvent').find('#eventEndTime').val();
			
	    	$('#form-editEvent').find('#eventEndTime')
	    		.datepicker('option', 'minDate', convertDateTime(theDate))
	    		.datetimepicker('option', 'minDateTime', convertDateTime(theDate));

			if (convertDateTime(currentEndTime) <= convertDateTime(theDate)) {
				$('#form-editEvent').find('#eventEndTime').val('');
			} else {
				$('#form-editEvent').find('#eventEndTime').val(currentEndTime);
			}
			
	    },
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	$('#form-editEvent').find('#eventEndTime').datetimepicker({
		onSelect: function(theDate) {
			
			var currentStartTime = $('#form-editEvent').find('#eventStartTime').val();
			
	    	$('#form-editEvent').find('#eventStartTime')
	    		.datepicker('option', 'maxDate', convertDateTime(theDate))
	    		.datetimepicker('option', 'maxDateTime', convertDateTime(theDate));
	    	
			if (convertDateTime(currentStartTime) >= convertDateTime(theDate)) {
				$('#form-editEvent').find('#eventStartTime').val('');
			} else {
				$('#form-editEvent').find('#eventStartTime').val(currentStartTime);
			}
	    },
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	
	$('#form-createProgram').find('#programStartDateTime').datetimepicker({
		onSelect: function(theDate) {
	    	$('#form-createProgram').find('#programEndDateTime')
	    		.datepicker('option', 'minDate', convertDateTime(theDate))
	    		.datetimepicker('option', 'minDateTime', convertDateTime(theDate));
	    	
	    },
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	$('#form-createProgram').find('#programEndDateTime').datetimepicker({ 
		onSelect: function(theDate) {
	    	$('#form-createProgram').find('#programStartDateTime')
	    		.datepicker('option', 'maxDate', convertDateTime(theDate))
	    		.datetimepicker('option', 'maxDateTime', convertDateTime(theDate));
	    },
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	
	$('#form-editProgram').find('#programStartDateTime').datetimepicker({
		onSelect: function(theDate) {

			var currentEndTime = $('#form-editProgram').find('#programEndDateTime').val();
			
	    	$('#form-editProgram').find('#programEndDateTime')
	    		.datepicker('option', 'minDate', convertDateTime(theDate))
	    		.datetimepicker('option', 'minDateTime', convertDateTime(theDate));

			if (convertDateTime(currentEndTime) < convertDateTime(theDate)) {
				$('#form-editProgram').find('#programEndDateTime').val('');
				
			} else {
				$('#form-editProgram').find('#programEndDateTime').val(currentEndTime);
			}
	    },
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	$('#form-editProgram').find('#programEndDateTime').datetimepicker({ 
		onSelect: function(theDate) {
			var currentStartTime = $('#form-editProgram').find('#programStartDateTime').val();
			
	    	$('#form-editProgram').find('#programStartDateTime')
	    		.datepicker('option', 'maxDate', convertDateTime(theDate))
	    		.datetimepicker('option', 'maxDateTime', convertDateTime(theDate));
	  
			if (convertDateTime(currentStartTime) > convertDateTime(theDate)) {
				$('#form-editProgram').find('#programStartDateTime').val('');
				
			} else {
				$('#form-editProgram').find('#programStartDateTime').val(currentStartTime);
			}
	    	
	    },
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	
	$('#form-createTrigger').find('#validityStartTime').datetimepicker({
		onSelect: function(theDate) {
	    	$('#form-createTrigger').find('#validityEndTime')
	    		.datepicker('option', 'minDate', convertDateTime(theDate))
	    		.datetimepicker('option', 'minDateTime', convertDateTime(theDate));
	    	
	    },
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	$('#form-createTrigger').find('#validityEndTime').datetimepicker({ 
		onSelect: function(theDate) {
	    	$('#form-createTrigger').find('#validityStartTime')
	    		.datepicker('option', 'maxDate', convertDateTime(theDate))
	    		.datetimepicker('option', 'maxDateTime', convertDateTime(theDate));
	    },
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	
	$('#form-editTrigger').find('#validityStartTime').datetimepicker({
		onSelect: function(theDate) {
	    	$('#form-editTrigger').find('#validityEndTime')
	    		.datepicker('option', 'minDate', convertDateTime(theDate))
	    		.datetimepicker('option', 'minDateTime', convertDateTime(theDate));
	    	
	    },
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	$('#form-editTrigger').find('#validityEndTime').datetimepicker({ 
		onSelect: function(theDate) {
	    	$('#form-editTrigger').find('#validityStartTime')
	    		.datepicker('option', 'maxDate', convertDateTime(theDate))
	    		.datetimepicker('option', 'maxDateTime', convertDateTime(theDate));
	    },
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	
	$('#form-createProgram').find('#offerStartDateTime').datetimepicker({
		onSelect: function(theDate) {
	    	$('#form-createProgram').find('#offerEndDateTime')
	    		.datepicker('option', 'minDate', convertDateTime(theDate))
	    		.datetimepicker('option', 'minDateTime', convertDateTime(theDate));
	    	
	    },
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	$('#form-createProgram').find('#offerEndDateTime').datetimepicker({ 
		onSelect: function(theDate) {
	    	$('#form-createProgram').find('#offerStartDateTime')
	    		.datepicker('option', 'maxDate', convertDateTime(theDate))
	    		.datetimepicker('option', 'maxDateTime', convertDateTime(theDate));
	    },
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	
	$('#form-editProgram').find('#offerStartDateTime').datetimepicker({
		onSelect: function(theDate) {
	    	$('#form-editProgram').find('#offerEndDateTime')
	    		.datepicker('option', 'minDate', convertDateTime(theDate))
	    		.datetimepicker('option', 'minDateTime', convertDateTime(theDate));
	    	
	    },
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	$('#form-editProgram').find('#offerEndDateTime').datetimepicker({ 
		onSelect: function(theDate) {
	    	$('#form-editProgram').find('#offerStartDateTime')
	    		.datepicker('option', 'maxDate', convertDateTime(theDate))
	    		.datetimepicker('option', 'maxDateTime', convertDateTime(theDate));
	    },
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	
	$('#form-createProduct').find('#expiryDate').datetimepicker({
		minDate: new Date(),
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});
	$('#form-editProduct').find('#expiryDate').datetimepicker({
		dateFormat: "dd/mm/yy",
		timeFormat: "HH:mm"
	});

	$('#form-createOffer').find('#offerMessageContactWindowFromTime').timepicker({
		timeFormat: "HH:mm"
	});
	$('#form-createOffer').find('#offerMessageContactWindowToTime').timepicker({
		timeFormat: "HH:mm"
	});
	$('#form-editOffer').find('#offerMessageContactWindowFromTime').timepicker({
		timeFormat: "HH:mm"
	});
	$('#form-editOffer').find('#offerMessageContactWindowToTime').timepicker({
		timeFormat: "HH:mm"
	});
	$('#form-createOffer').find('#fulfillmentMessageContactWindowFromTime').timepicker({
		timeFormat: "HH:mm"
	});
	$('#form-createOffer').find('#fulfillmentMessageContactWindowToTime').timepicker({
		timeFormat: "HH:mm"
	});
	$('#form-editOffer').find('#fulfillmentMessageContactWindowFromTime').timepicker({
		timeFormat: "HH:mm"
	});
	$('#form-editOffer').find('#fulfillmentMessageContactWindowToTime').timepicker({
		timeFormat: "HH:mm"
	});
});*/

/*function convertDateTime(dateTime){
    dateTime = dateTime.split(" ");

    var date = dateTime[0].split("/");
    var dd = date[0];
    var mm = date[1]-1;
    var yyyy = date[2];
    

    var time = dateTime[1].split(":");
    var h = time[0];
    var m = time[1]; //get rid of that 00.0;

    return new Date(yyyy,mm,dd,h,m,0);
}*/

/*function displayErrors(form, errors) {
    for (field in errors) {
    	error = $('<p class="ui-error"><a for="'+ field +'" class="text-error" generated="true" href="#'+field+'">' + errors[field] + '</a></p>');
    	$('[name=' + field + ']', form).nextAll('p.ui-error').remove();
    	$('[name=' + field + ']', form).after(error).find("a").click(function(){return false;});
    }
    $('.ui-error:visible,.ui-success:visible:first', form).children(':first').focus();
    $('input', form).placeholder();
}*/


/*function changeType(thisElement, inputType) { 
	thisElement.type = inputType; 
	return true; 
} */

	/**
	* Checks time Format
	* @param {jqObject} field name
	* @return an error string if validation failed
	*/

/*function validTime(field, rules, i, options){
	if(!isTime(field.val())){
		return "Invalid Time, must be in HH:MM format";
	}
}*/

	/**
	* Checks time range
	*
	* @param {jqObject} first field name
	* @param {jqObject} second field name
	* @return an error string if validation failed
	*/

/*function validTimeRange(field, rules, i, options){
	var form = $(field.closest("form, .validationEngineContainer"));
	var classGroup = "["+options.validateAttribute+"*=" + rules[i + 1] + "]";
	options.firstOfGroup = form.find(classGroup).eq(0);
						options.secondOfGroup = form.find(classGroup).eq(1);
	if (options.firstOfGroup[0].value || options.secondOfGroup[0].value) {
		if ((!options.firstOfGroup[0].value && options.secondOfGroup[0].value) || (options.firstOfGroup[0].value && !options.secondOfGroup[0].value)) {
			return "Invalid Time Range";
		}
		//are not both times
		if (!isTime(options.firstOfGroup[0].value) || !isTime(options.secondOfGroup[0].value)) {
			return "Invalid Time Range";
		}
		//are both dates but range is off
		if (!timeCompare(options.firstOfGroup[0].value, options.secondOfGroup[0].value)) {
			return "Invalid Time Range";
		}
	}
}*/

	/**
	* Checks if valid time format
	*
	* @param {string} date string
	* @return a bool based on determination of valid time format
	*/

/*function isTime(value){
	var timeRegEx = new RegExp(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);
	return timeRegEx.test(value);
}*/

	/**
	*Checks if the start time is before the end time
	*returns true if end is later than start
	*/
	
/*function timeCompare(start, end) {
	var startDate ="01/01/2000 " +start +":00";
	var endDate ="01/01/2000 " +end +":00";
	return (new Date(startDate.toString()) < new Date(endDate.toString()));
}

function validateWhiteSpace(field, rules, i, options){
    if(!hasWhiteSpace(field.val())){
        return "User Id should not contain white spaces";
    }
}

function hasWhiteSpace(value){
    var spaceRegEx = new RegExp(/^([^\s])*$/);
    return spaceRegEx.test(value);
}*/
