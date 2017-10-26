var expression;
var siftFieldsCategoriesMap = [{id: 0, text: 'Indicators'}, {id: 1, text: 'Events'}, {id: 2, text: 'Sift Fields'}, {id: 3, text: 'Sift Functions'}];

function handleFieldCategoryChange(fieldPrefix) {
	var selectedFieldCategory = $('#' + fieldPrefix + 'FieldCategoryId').select2('data').text;
	
	populateFieldNames(selectedFieldCategory, fieldPrefix);
	$('#' + fieldPrefix + 'FieldNameId').show();
	$('#' + fieldPrefix + 'AddItSpanId').show();
}

function populateFieldNames(selectedFieldCategory, fieldPrefix) {

	var data;
	var placeholder;
	
	if (selectedFieldCategory == 'Indicators') {
		data = siftIndicatorsMap,
	  	placeholder = '--Select Indicator--'
	  		
	} else if (selectedFieldCategory == 'Events') {
		data = siftEventsMap,
	  	placeholder = '--Select Events--'
		
	} else if (selectedFieldCategory == 'Sift Fields') {
		data = siftFieldsMap,
	  	placeholder = '--Select Sift Field--'
	  		
	} else if (selectedFieldCategory == 'Sift Functions') {
		data = siftFunctionsMap,
	  	placeholder = '--Select Sift Function--'
	}
	
	$('#' + fieldPrefix + 'FieldNameId').empty();
	
	$('#' + fieldPrefix + 'FieldNameId').select2({
  		multiple: false,
  	    data: data,
  	    placeholder: placeholder
  	});
	
	$('#' + fieldPrefix + 'FieldNameId').select2('val', '');
}

function handleAddItButtonClick(expressionField, fieldPrefix) {
	expression = $('#' + expressionField).val();
	var selectedFieldName = $('#' + fieldPrefix + 'FieldNameId').select2('data').text;
	var index = selectedFieldName.lastIndexOf('(');

	if (index != -1) {
		selectedFieldName = selectedFieldName.substring(0, index - 1);
	}

	$('#' + expressionField).val(expression + ' ' +  selectedFieldName);
}