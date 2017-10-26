var expression;
var expressionFieldVar;

var isModalOn = false;

var siftFieldsCategoriesMap = [{id: 0, text: 'Indicators'}, {id: 1, text: 'Events'}, {id: 2, text: 'Sift Fields'}, {id: 3, text: 'Sift Functions'}];

var stringOperators = [{id: 0, text: 'equal'}, {id: 1, text: 'not_equal'}, {id: 2, text: 'begins_with'}, {id: 3, text: 'not_begins_with'}, {id: 4, text: 'contains'}, {id: 5, text: 'not_contains'}, {id: 6, text: 'ends_with'}, {id: 7, text: 'not_ends_with'}, {id: 8, text: 'is_empty'}, {id: 9, text: 'is_not_empty'}, {id: 10, text: 'is_null'}, {id: 11, text: 'is_not_null'}];
var doubleOperators = [{id: 0, text: 'equal'}, {id: 1, text: 'not_equal'}, {id: 2, text: 'lessthan'}, {id: 3, text: 'lessthan_or_equal'}, {id: 4, text: 'greaterthan'}, {id: 5, text: 'greaterthan_or_equal'}, {id: 6, text: 'is_empty'}, {id: 7, text: 'is_not_empty'}, {id: 8, text: 'is_null'}, {id: 9, text: 'is_not_null'}];
var integerOperators = [{id: 0, text: 'equal'}, {id: 1, text: 'not_equal'}, {id: 2, text: 'lessthan'}, {id: 3, text: 'lessthan_or_equal'}, {id: 4, text: 'greaterthan'}, {id: 5, text: 'greaterthan_or_equal'}, {id: 6, text: 'is_empty'}, {id: 7, text: 'is_not_empty'}, {id: 8, text: 'is_null'}, {id: 9, text: 'is_not_null'}];
var dateTimeOperators = [{id: 0, text: 'equal'}, {id: 1, text: 'not_equal'}, {id: 2, text: 'lessthan'}, {id: 3, text: 'lessthan_or_equal'}, {id: 4, text: 'greaterthan'}, {id: 5, text: 'greaterthan_or_equal'}, {id: 6, text: 'is_null'}, {id: 7, text: 'is_not_null'}];
var booleanOperators = [{id: 0, text: 'equal'}, {id: 1, text: 'not_equal'}];
var siftFunctionsOperators = [{id: 0, text: 'equal'}, {id: 1, text: 'not_equal'}, {id: 2, text: 'lessthan'}, {id: 3, text: 'lessthan_or_equal'}, {id: 4, text: 'greaterthan'}, {id: 5, text: 'greaterthan_or_equal'}, {id: 6, text: 'is_null'}, {id: 7, text: 'is_not_null'}];
var otherOperators = [{id: 0, text: 'equal'}, {id: 1, text: 'not_equal'}, {id: 2, text: 'is_empty'}, {id: 3, text: 'is_not_empty'}, {id: 4, text: 'is_null'}, {id: 5, text: 'is_not_null'}];

$(function () {	
	$('#expressionBuilderButton').click(function(e) {
		$("#expressionBuilderModal").modal({
			backdrop : 'static',
			show : true,
			width : '1400px'
		});
	});
	
	$('#expressionBuilderModal').on('shown', function(e) {
		if (!isModalOn) {
			var rowId = 'T_0';
			var ruleGroupTable = createRuleGroup(rowId);
			$('#expressionDivId').html(ruleGroupTable);
			populateFieldCategories('T_0_R_1_FC');
			isModalOn = true;
		}	
	});
	
	$('#expressionDivId').on('click', '.FC', function(e) { 
		handleFieldCategoryChange(e.currentTarget.id);
	});
	
	$('#expressionDivId').on('click', '.FN', function(e) { 
		handleFieldNameChange(e.currentTarget.id);
	});
	
	$('#expressionDivId').on('click', '.FO', function(e) { 
		handleFieldOperatorChange(e.currentTarget.id);
	});
	
	$('#expressionDivId').on('click', '.FV', function(e) { 
		handleFieldValueChange(e.currentTarget.id);
	});
	
	$('#expressionDivId').on('click', '.ADDR', function(e) { 
		handleAddRuleButtonClick(e.currentTarget.id)
	});
	
	$('#expressionDivId').on('click', '.ADDG', function(e) { 
		handleAddGroupButtonClick(e.currentTarget.id);
	});
	
	$('#expressionDivId').on('click', '.DR', function(e) { 
		handleDeleteRuleButtonClick(e.currentTarget.id);
	});
	
	$('#expressionDivId').on('click', '.DG', function(e) { 
		handleDeleteGroupButtonClick(e.currentTarget.id);
	});
	
	$('#expressionDivId').on('click', '.AND', function(e) { 
		handleANDButtonClick(e.currentTarget.id);
	});
	
	$('#expressionDivId').on('click', '.OR', function(e) { 
		handleORButtonClick(e.currentTarget.id);
	});
	
	$('#modalExpressionResetButton').click(function(e) {
		handleResetButtonClick();
	});
	
	$('#modalExpressionSaveButton').click(function(e) {
		handleSaveButtonClick();
	});
});

function populateFieldCategories(fieldCategoryId) {
  	$('#' + fieldCategoryId).select2({
  		multiple: false,
  	    data: siftFieldsCategoriesMap,
  	    placeholder: '--Select Field Category--'
  	});
}

function populateFieldNames(selectedFieldCategory, fieldNameId) {
	
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
	
	$('#' + fieldNameId).empty();
	
	$('#' + fieldNameId).select2({
  		multiple: false,
  	    data: data,
  	    placeholder: placeholder
  	});
	
	$('#' + fieldNameId).select2('val', '');
}

function populateFieldOperatorAndValue(selectedFieldCategory, selectedFieldName, fieldOperatorId, fieldValueId) {
	
	var dataType;
	
	dataType = getDataTypeFromFieldNameLabel(selectedFieldName);
	
	populateFieldOperator(dataType, fieldOperatorId);
	populateFieldValue(dataType, fieldValueId);
}

function populateFieldOperator(dataType, fieldOperatorId) {
	var fieldOperators;
	
	if (dataType == 'String') {
		fieldOperators = stringOperators;
		
	} else if (dataType == 'Double') {
		fieldOperators = doubleOperators;
		
	} else if (dataType == 'Integer') {
		fieldOperators = integerOperators;
		
	} else if (dataType == 'Boolean') {
		fieldOperators = booleanOperators;
		
	} else if (dataType == 'DateTime') {
		fieldOperators = dateTimeOperators;
		
	} else {
		fieldOperators = otherOperators;
	}
	
	$('#' + fieldOperatorId).empty();
	
	$('#' + fieldOperatorId).select2({
  		multiple: false,
  	    data: fieldOperators,
  	    placeholder: '--Select Operator--',
  	});
	
	$('#' + fieldOperatorId).select2("val", "");
}

function populateFieldValue(dataType, fieldValueId) {
	
	$('#' + fieldValueId).empty();
	
	var fieldValuesMap = [];
	
	var placeholderVal = '--Select or Enter ' + dataType + ' Value--'; 
	
	if (dataType == 'Boolean') {
		var item = {};
		item['id'] = 0;
		item['text'] = 'true ( Boolean )';
		fieldValuesMap.push(item);
		
		item = {};
		item['id'] = 1;
		item['text'] = 'false ( Boolean )';
		fieldValuesMap.push(item);
		
	} else if (dataType == 'DateTime') {
		placeholderVal = 'dd/MM/yyyy HH24:MI:SS';
	}
	
	populateFieldValuesMap('Indicator', dataType, siftIndicatorsMap, fieldValuesMap);
	populateFieldValuesMap('Event', dataType, siftEventsMap, fieldValuesMap);
	populateFieldValuesMap('Sift Field', dataType, siftFieldsMap, fieldValuesMap);
	populateFieldValuesMap('Sift Functions', dataType, siftFunctionsMap, fieldValuesMap);
	
  	$('#' + fieldValueId).select2({
  		createSearchChoice:function(term, data) { 
  	        if ($(data).filter(function() { 
  	            return this.text.localeCompare(term)===0; 
  	        }).length===0) 
  	        {return {id:term, text:term};} 
  	    },
  	    multiple: false,
  	    data: fieldValuesMap,
  	    placeholder: placeholderVal
  	});
  	
  	$('#' + fieldValueId).select2("val", "");
}

function populateFieldValuesMap(fieldCategoryType, dataType, data, fieldValuesMap) {
	
	var count = fieldValuesMap.length;
	var item;
	var currentType;
	var fieldNameLabel;
	
	$.each(data, function(key, value) {
		fieldNameLabel = value.text;
		currentType = getDataTypeFromFieldNameLabel(fieldNameLabel);
		if (currentType == dataType) {
			item = {};
			item['id'] = count;
			item['text'] = value.text + ' - ' + fieldCategoryType;
			fieldValuesMap.push(item);
			count ++;
		}
	});
}

function getType(type) {
	var returnType;
	
	if (type == 'java.lang.String' || type == 'java.lang.string') {
		returnType = 'String';
	} else if (type == 'int') {
		returnType = 'Integer';
	} else if (type == 'double') {
		returnType = 'Double';
	} else if (type == 'long' || type == 'java.util.Date') {
		returnType = 'DateTime';
	} else if (type == 'boolean') {
		returnType = 'Boolean';
	} else {
		returnType = type;
	}
	
	return returnType;
		
}

function getDataTypeFromFieldNameLabel(selectedFieldName) {
	
	var index = selectedFieldName.lastIndexOf('(');
	var selectedType = selectedFieldName.substr(index + 2);
		
	index = selectedType.lastIndexOf(')');
	selectedType = selectedType.substr(0, index - 1);
	
	return selectedType;
}

function printObject(o) {
	var out = '';
	for (var p in o) {
		out += p + ': ' + o[p] + '\n';
	}
	alert(out);
}

function createRuleGroup(tableId) {
	var rowId = tableId + '_R_0';
	var andConditionButtonId = tableId + '_R_0_AND';
	var orConditionButtonId = tableId + '_R_0_OR';
	var addRuleButtonId = tableId + '_R_0_ADDR';
	var addGroupButtonId = tableId + '_R_0_ADDG';
	var deleteGroupButtonId = tableId + '_R_0_DG';
	
	var row = '<table class="table table-vertical-center table-pricing table-pricing-2" id="' + tableId + '">';
		row += '<tbody>';
			row += '<tr id="' + rowId + '">';
				row += '<td colspan="3">';
					row += '<button type="button" id="' + andConditionButtonId + '" class="btn btn-default AND">';
						row += 'AND';
					row += '</button>';
					row += '<button type="button" id="' + orConditionButtonId + '" class="btn btn-info OR">';
						row += 'OR';
					row += '</button>';
				row += '</td>';
				row += '<td colspan="2" align="right">';
					row += '<button class="btn btn-xs btn-success ADDR" id="' + addRuleButtonId + '" type="button">Add Rule</button>';
					row += '<button class="btn btn-xs btn-success ADDG" id="' + addGroupButtonId + '" type="button">Add Group</button>';
					if (tableId != 'T_0') {
						row += '<button class="btn btn-xs btn-danger DG" id="' + deleteGroupButtonId + '" type="button">Delete Group</button>';
					}
				row += '</td>';
			row += '</tr>';
			
			rowId = tableId + '_R_1';
			row += createRule(rowId);

		row += '</tbody>'
	row += '</table>';
	
	return row;
}

function createRule(rowId) {

	var fieldCategoryId = rowId + '_FC';
	var fieldNameId = rowId + '_FN';
	var fieldOperatorDivId = rowId + '_FOD';
	var fieldOperatorId = rowId + '_FO';
	var fieldValueDivId = rowId + '_FVD';
	var fieldValueId = rowId + '_FV';
	var deleteButtonId = rowId + '_DR';
	var deleteSpanId = rowId + '_DS';
	
	var	row = '<tr id="' + rowId + '">';
		row += '<td width="10%">';
			row += '<div class="row-fluid">';
				row += '<input type="text" id="' + fieldCategoryId +'" class="FC" style="width: 100%;" />';
			row += '</div>';
		row += '</td>';
		row += '<td width="35%">';
			row += '<div class="row-fluid">';
				row += '<input type="text" id="' + fieldNameId +'" class="FN" style="width: 100%; display: none;" />';
			row += '</div>';
		row += '</td>';
		row += '<td width="10%">';
			row += '<div class="row-fluid" id="' + fieldOperatorDivId + '" style="display: none;">';
				row += '<input type="text" id="' + fieldOperatorId +'" class="FO" style="width: 100%;"/>';
			row += '</div>';
		row += '</td>';
		row += '<td width="35%">';
			row += '<div class="row-fluid" id="' + fieldValueDivId + '" style="display: none;">';
				row += '<input type="text" id="' + fieldValueId +'" class="FV" style="width: 100%;"/>';
			row += '</div>';
		row += '</td>';
		row += '<td width="10%">';
			row += '<span id="' + deleteSpanId +'" style="display:block">';
				row += '<button id="' + deleteButtonId +'" class="btn btn-danger DR" type="button">';
					row += 'X';
				row += '</button>';
			row += '</span>';
		row += '</td>';
	row += '</tr>';
	
	return row;
}

function representJsonStringDataTypeInJava(id, operator, value, inputType) {
	var expression;
	
	if (operator == 'equal') {
		if (inputType == 'userInput') {
			expression = ' ' + id + '.equals("' + value + '")';
		} else {
			expression = ' ' + id + '.equals(' + value + ')';
		}
	} else if (operator == 'not_equal') {
		if (inputType == 'userInput') {
			expression = ' !(' + id + '.equals("' + value + '"))';
		} else {
			expression = ' !(' + id + '.equals(' + value + '))';
		}
	} else if (operator == 'begins_with') {
		if (inputType == 'userInput') {
			expression = ' ' + id + '.startsWith("' + value + '")';
		} else {
			expression = ' ' + id + '.startsWith(' + value + ')';
		}
	} else if (operator == 'not_begins_with') {
		if (inputType == 'userInput') {
			expression = ' !(' + id + '.startsWith("' + value + '"))';
		} else {
			expression = ' !(' + id + '.startsWith(' + value + '))';
		}
	} else if (operator == 'contains') {
		if (inputType == 'userInput') {
			expression = ' ' + id + '.contains("' + value + '")';
		} else {
			expression = ' ' + id + '.contains(' + value + ')';
		}
	} else if (operator == 'not_contains') {
		if (inputType == 'userInput') {
			expression = ' !(' + id + '.contains("' + value + '"))';
		} else {
			expression = ' !(' + id + '.contains(' + value + '))';
		}
	} else if (operator == 'ends_with') {
		if (inputType == 'userInput') {
			expression = ' ' + id + '.endsWith("' + value + '")';
		} else {
			expression = ' ' + id + '.endsWith(' + value + ')';
		}
	} else if (operator == 'not_ends_with') {
		if (inputType == 'userInput') {
			expression = ' !(' + id + '.endsWith("' + value + '"))';
		} else {
			expression = ' !(' + id + '.endsWith(' + value + '))';
		}
	} else if (operator == 'is_empty') {
		expression = ' ' + id + '.equals("")';
	} else if (operator == 'is_not_empty') {
		expression = ' !(' + id + '.equals(""))';
	} else if (operator == 'is_null') {
		expression = ' ' + id + ' == null';
	} else if (operator == 'is_not_null') {
		expression = ' ' + id + ' != null';
	}
	
	return expression;
}

function representJsonDoubleDataTypeInJava(id, operator, value) {
	
	var expression;
	
	if (operator == 'equal') {
		expression = ' ' + id + ' == ' + value;
	} else if (operator == 'not_equal') {
		expression = ' ' + id + ' != ' + value;
	} else if (operator == 'lessthan') {
		expression = ' ' + id + ' < ' + value;
	} else if (operator == 'lessthan_or_equal') {
		expression = ' ' + id + ' <= ' + value;
	} else if (operator == 'greaterthan') {
		expression = ' ' + id + ' > ' + value;
	} else if (operator == 'greaterthan_or_equal') {
		expression = ' ' + id + ' >= ' + value;
	} else if (operator == 'between') {
		expression = ' (' + id + ' >= ' + value[0] + ' && ' + id + ' <= ' + value[1] + ')';
	} else if (operator == 'is_null') {
		expression = ' ' + id + ' == null';
	} else if (operator == 'is_not_null') {
		expression = ' ' + id + ' != null';
	}
	
	return expression;
}

function representJsonIntegerDataTypeInJava(id, operator, value) {
	var expression;
	
	if (operator == 'equal') {
		expression = ' ' + id + ' == ' + value;
	} else if (operator == 'not_equal') {
		expression = ' ' + id + ' != ' + value;
	} else if (operator == 'lessthan') {
		expression = ' ' + id + ' < ' + value;
	} else if (operator == 'lessthan_or_equal') {
		expression = ' ' + id + ' <= ' + value;
	} else if (operator == 'greaterthan') {
		expression = ' ' + id + ' > ' + value;
	} else if (operator == 'greaterthan_or_equal') {
		expression = ' ' + id + ' >= ' + value;
	} else if (operator == 'is_null') {
		expression = ' ' + id + ' == null';
	} else if (operator == 'is_not_null') {
		expression = ' ' + id + ' != null';
	}
	
	return expression;
}

function representJsonDateDataTypeInJava(id, operator, value) {
	var expression;
	
	if (isValidDate(value)) {
		value = getTimestamp(value) + 'L';
	}
	
	if (operator == 'equal') {
		expression = ' ' + id + ' == ' + value;
	} else if (operator == 'not_equal') {
		expression = ' ' + id + ' != ' + value;
	} else if (operator == 'lessthan') {
		expression = ' ' + id + ' < ' + value;
	} else if (operator == 'lessthan_or_equal') {
		expression = ' ' + id + ' <= ' + value;
	} else if (operator == 'greaterthan') {
		expression = ' ' + id + ' > ' + value;
	} else if (operator == 'greaterthan_or_equal') {
		expression = ' ' + id + ' >= ' + value;
	} else if (operator == 'is_null') {
		expression = ' ' + id + ' == null';
	} else if (operator == 'is_not_null') {
		expression = ' ' + id + ' != null';
	}
	
	return expression;
}

function getTimestamp(inputDate) {
    var parts = inputDate.split(' ');
    var dateParts = parts[0].split('/');
    var timeParts = parts[1].split(':');
    
    var year = dateParts[2];
    var month = (dateParts[1] - 1);
    var date = dateParts[0];
    var hour = timeParts[0];
    var minute = timeParts[1];
    var second = timeParts[2];

    var date = new Date(year, month, date, hour, minute, second);
    
    return date.getTime();
}

function representSiftFunction(id, operator, value) {
	
	var expression;
	
	if (operator == 'equal') {
		expression = ' ' + id + ' == ' + value;
	} else if (operator == 'not_equal') {
		expression = ' ' + id + ' != ' + value;
	} else if (operator == 'lessthan') {
		expression = ' ' + id + ' < ' + value;
	} else if (operator == 'lessthan_or_equal') {
		expression = ' ' + id + ' <= ' + value;
	} else if (operator == 'greaterthan') {
		expression = ' ' + id + ' > ' + value;
	} else if (operator == 'greaterthan_or_equal') {
		expression = ' ' + id + ' >= ' + value;
	} else if (operator == 'is_null') {
		expression = ' ' + id + ' == null';
	} else if (operator == 'is_not_null') {
		expression = ' ' + id + ' != null';
	}
	
	return expression;
}

function representJsonBooleanDataTypeInJava(id, operator, value) {
	var expression;
	
	if (operator == 'equal') {
		expression = ' ' + id + ' == ' + value;
	} else if (operator == 'not_equal') {
		expression = ' ' + id + ' != ' + value;
	}
	
	return expression;
}

function representOtherDataTypes(id, operator, value) {
	var expression;
	
	if (operator == 'equal') {
		expression = ' ' + id + ' == ' + value;
	} else if (operator == 'not_equal') {
		expression = ' ' + id + ' != ' + value;
	} else if (operator == 'is_null') {
		expression = ' ' + id + ' == null';
	} else if (operator == 'is_not_null') {
		expression = ' ' + id + ' != null';
	}
	
	return expression;
}

function getSiftFunctionSignature(id) {
	var returnId = '';
	$.each(siftFunctionsMap, function(key, value) {
		if (value.name == id) {
			returnId += value.signature;
		}
	});
	return returnId;
}

function constructRule(data) {
	var condition = data.condition;
	if (condition == 'AND') {
		condition = '&&';
	} else if (condition == 'OR') {
		condition = '||';
	}

	var rules = data.rules;
	var ruleObj;
	
	expression += ' ( ';

	for (var i = 0; i < rules.length; i ++) {
		ruleObj = rules[i];
		
		if (ruleObj.condition == undefined) {
			if (ruleObj.type == 'String') {
				expression += representJsonStringDataTypeInJava(ruleObj.id, ruleObj.operator, ruleObj.value, ruleObj.inputType);
			} else if (ruleObj.type == 'Double') {
				expression += representJsonDoubleDataTypeInJava(ruleObj.id, ruleObj.operator, ruleObj.value);
			} else if (ruleObj.type == 'Integer') {
				expression += representJsonIntegerDataTypeInJava(ruleObj.id, ruleObj.operator, ruleObj.value);
			} else if (ruleObj.type == 'Boolean') {
				expression += representJsonBooleanDataTypeInJava(ruleObj.id, ruleObj.operator, ruleObj.value);
			} else if (ruleObj.type == 'DateTime') {
				expression += representJsonDateDataTypeInJava(ruleObj.id, ruleObj.operator, ruleObj.value);
			} else if (ruleObj.type == 'Sift Function') {
				expression += representSiftFunction(ruleObj.id, ruleObj.operator, ruleObj.value);
			} else {
				expression += representOtherDataTypes(ruleObj.id, ruleObj.operator, ruleObj.value);
			}
		} else {
			constructRule(ruleObj);
		}

		if ((i + 1) < rules.length) {
			expression += ' ' + condition + ' ';
		}
	}

	expression += ' ) ';
}

function handleFieldCategoryChange(id) {
	var selectedFieldCategory = $('#' + id).select2('data').text;
	var index = id.lastIndexOf('_');
	var rowId = id.substr(0, index);
	var fieldNameId = rowId + '_FN';
	var fieldOperatorDivId = rowId + '_FOD';
	var fieldOperatorId = rowId + '_FO';
	var fieldValueDivId = rowId + '_FVD';
	var fieldValueId = rowId + '_FV';
	var deleteSpanId = rowId + '_DS';
	var fieldCategoryErrorMessageId = 's2id_' + id + '_ER';
	var fieldNameErrorMessageId = 's2id_' + rowId + '_FN_ER';
	var fieldOperatorErrorMessageId = 's2id_' + rowId + '_FO_ER';
	var fieldValueErrorMessageId = 's2id_' + rowId + '_FV_ER';
	
	populateFieldNames(selectedFieldCategory, fieldNameId);
	$('#' + fieldNameId).show();
	$('#' + deleteSpanId).show();
	$('#' + fieldOperatorId).empty();
	$('#' + fieldValueId).empty();
	
	$('#' + fieldOperatorDivId).hide();
	$('#' + fieldValueDivId).hide();
	
	$('#' + fieldCategoryErrorMessageId).remove();
	$('#' + fieldNameErrorMessageId).remove();
	$('#' + fieldOperatorErrorMessageId).remove();
	$('#' + fieldValueErrorMessageId).remove();
}

function handleFieldNameChange(id) {
	var selectedFieldName = $('#' + id).select2('data').text;
	var index = id.lastIndexOf('_');
	var rowId = id.substr(0, index);
	
	var fieldCategoryId = rowId + '_FC';
	var fieldOperatorDivId = rowId + '_FOD';
	var fieldOperatorId = rowId + '_FO';
	var fieldValueDivId = rowId + '_FVD';
	var fieldValueId = rowId + '_FV';
	var deleteSpanId = rowId + '_DS';
	var fieldNameErrorMessageId = 's2id_' + id + '_ER';
	var fieldOperatorErrorMessageId = 's2id_' + rowId + '_FO_ER';
	var fieldValueErrorMessageId = 's2id_' + rowId + '_FV_ER';
	
	var selectedFieldCategory = $('#' + fieldCategoryId).select2('data').text;
	
	populateFieldOperatorAndValue(selectedFieldCategory, selectedFieldName, fieldOperatorId, fieldValueId);
	$('#' + fieldOperatorDivId).show();
	$('#' + fieldValueDivId).show();
	
	$('#' + fieldNameErrorMessageId).remove();
	$('#' + fieldOperatorErrorMessageId).remove();
	$('#' + fieldValueErrorMessageId).remove();
}

function handleFieldOperatorChange(id) {
	var selectedFieldOperator = $('#' + id).select2('data').text;
	var index = id.lastIndexOf('_');
	var rowId = id.substr(0, index);
	var fieldValueId = rowId + '_FV';
	var fieldValueDivId = rowId + '_FVD';
	var fieldOperatorErrorMessageId = 's2id_' + id + '_ER';
	var fieldValueErrorMessageId = 's2id_' + rowId + '_FV_ER';
	
	if (selectedFieldOperator == 'is_empty' 
		|| selectedFieldOperator == 'is_not_empty' 
			|| selectedFieldOperator == 'is_null' 
				|| selectedFieldOperator == 'is_not_null') {
		
		$('#' + fieldValueDivId).hide();
		$('#' + fieldValueId).select2("val", "");
	} else {
		$('#' + fieldValueDivId).show();
	}
	
	$('#' + fieldOperatorErrorMessageId).remove();
	$('#' + fieldValueErrorMessageId).remove();
}

function handleFieldValueChange(id) {
	var fieldValueErrorMessageId = 's2id_' + id + '_ER';
	
	$('#' + fieldValueErrorMessageId).remove();
}

function handleAddRuleButtonClick(id) {
	var index = id.lastIndexOf('_');
	var rowId = id.substr(0, index);
	index = rowId.lastIndexOf('_R');
	var tableId = rowId.substr(0, index);
	
	var lastRowId = $('#' + tableId + ' tr:last').attr('id');
	index = lastRowId.lastIndexOf('_R_');
	var lastRowCount = lastRowId.substr(index + 3);
	lastRowCount ++;
	var rowId = tableId + '_R_' + lastRowCount;
	
	var row = createRule(rowId);
	$('#' + tableId +  '> tbody:last').append(row);
	
	populateFieldCategories(rowId + '_FC');
}

function handleAddGroupButtonClick(id) {
	var index = id.lastIndexOf('_');
	var rowId = id.substr(0, index);
	index = rowId.lastIndexOf('_R');
	var tableId = rowId.substr(0, index);
	var lastRowId = $('#' + tableId).children('tbody').children('tr:last').attr('id');
	index = lastRowId.lastIndexOf('_R_');
	var lastRowCount = lastRowId.substr(index + 3);
	lastRowCount ++;
	
	var rowId = tableId + '_R_' + lastRowCount;
	var childTableId = rowId + '_T_0';
	
	var row = '<tr id="' + rowId + '">';
			row += '<td colspan="5">';
				row += createRuleGroup(childTableId);
			row += '</td>';
		row += '</tr>';
	
	$('#' + tableId + ' > tbody:last').append(row);
	
	populateFieldCategories(childTableId + '_R_1_FC');
}

function handleDeleteRuleButtonClick(id) {
	var index = id.lastIndexOf('_');
	var rowId = id.substr(0, index);
	$('#' + rowId).remove();
}

function handleDeleteGroupButtonClick(id) {
	var index = id.lastIndexOf('_');
	var rowId = id.substr(0, index);
	
	index = id.lastIndexOf('_T');
	rowId = id.substr(0, index);
	$('#' + rowId).remove();
}

function handleANDButtonClick(id) {
	var index = id.lastIndexOf('_');
	var rowId = id.substr(0, index);
	
	$('#' + id).removeClass('btn btn-default AND');
	$('#' + id).addClass('btn btn-info AND');
		
	$('#' + rowId + '_OR').removeClass('btn btn-info OR');
	$('#' + rowId + '_OR').addClass('btn btn-default OR');
}

function handleORButtonClick(id) {
	var index = id.lastIndexOf('_');
	var rowId = id.substr(0, index);
	
	$('#' + id).removeClass('btn btn-default OR');
	$('#' + id).addClass('btn btn-info OR');
		
	$('#' + rowId + '_AND').removeClass('btn btn-info AND');
	$('#' + rowId + '_AND').addClass('btn btn-default AND');
}

function handleResetButtonClick() {
	var rowId = 'T_0';
	var ruleGroupTable = createRuleGroup(rowId);
	$('#expressionDivId').html(ruleGroupTable);
	populateFieldCategories('T_0_R_1_FC');
	isModalOn = true;
}

function handleSaveButtonClick() {
	
	var errorMap = validateRuleMap();
	
	if (errorMap.length > 0) {
		var errorMessage = '';
		var errorHtml;
		var errorDivId;
		
		$.each(errorMap, function(key, value) {
			errorDivId = $('#' + value.id + '_ER');
			if (errorDivId) {
				errorDivId.remove();
			}
			
			errorHtml = getErrorHtml(value.id, value.errorMessage);
			$('#' + value.id).before(errorHtml);
		});
	} else {
		var tableObj = $('#T_0').children('tbody').children();
		var ruleMap = generateRuleMap(tableObj);
		
		var actionType = $('#actionType').val();
		
		if (expressionFieldVar == undefined) {
			expressionFieldVar = 'expression';
		}
		
		if ((actionType == 'edit' || actionType == 'copy' || actionType == 'import') && ($('#' + expressionFieldVar).val() != '')) {
			
			var conditionVar = ruleMap['condition'];
			
			if (conditionVar == 'OR') {
				conditionVar = ' || ';
			} else {
				conditionVar = ' && ';
			}
			
			expression = $('#' + expressionFieldVar).val() + ' ' + conditionVar;
		} else {
			expression = '';
		}
		
		constructRule(ruleMap);
		$('#' + expressionFieldVar).val(expression.trim());
		$("#expressionBuilderModal").modal('hide');
	}
}

function validateRuleMap() {
	var id;
	var text;
	var value;
	var error;
	var errorMap = [];
	
	$.each($('#expressionDivId .select2-container'), function () {
		id = this.id;
		var selectObj = $('#' + id).select2('data');
		var text;
		
		if (selectObj == null) {
			text = '';
		} else {
			text = $('#' + id).select2('data').text;
			value = $('#' + id).select2('data').id;
		}
		
		if (id.indexOf('_FC') != -1) {
			if (text == '') {
				error = {};
				error['id'] = id;
				error['errorMessage'] = 'Please select Field Category!';
				errorMap.push(error);
			}
		} else if (id.indexOf('_FN') != -1) {
			if (text == '') {
				error = {};
				error['id'] = id;
				error['errorMessage'] = 'Please select Field Name!';
				errorMap.push(error);
			}
		} else if (id.indexOf('_FO') != -1) {
			if (text == '') {
				error = {};
				error['id'] = id;
				error['errorMessage'] = 'Please select Field Operator!';
				errorMap.push(error);
			}
		} else if (id.indexOf('_FV') != -1) {
			var tempId = id.substr(id.indexOf('_') + 1) + 'D';
			var tempStyle = $('#' + tempId).attr('style');
			
			if (tempStyle.indexOf('none') == -1) {
				if (text == '') {
					error = {};
					error['id'] = id;
					error['errorMessage'] = 'Please select or enter Field Value!';
					errorMap.push(error);
					
				} else {
					var index = id.indexOf('_');
					var lastIndex = id.lastIndexOf('_');
					var rowId = id.substring(index + 1, lastIndex);
					var fieldCategoryId = rowId + '_FC'; 
					var fieldNameId = rowId + '_FN'; 
					
					var fieldCategory = $('#' + fieldCategoryId).select2('data').text;
					var fieldName = $('#' + fieldNameId).select2('data').text;
					
					if (fieldCategory == 'Sift Functions') {
						
					} else {
						var dataType = getDataTypeFromFieldNameLabel(fieldName);
						
						var isUserManuallyEnteredFieldValue = false;
						
						if (text == value) {
							isUserManuallyEnteredFieldValue = true;
						}
						
						if (dataType == 'Integer') {
							if (isUserManuallyEnteredFieldValue == true) {
								if (isInteger(value) == false) {
									error = {};
									error['id'] = id;
									error['errorMessage'] = 'Please enter Integer Value!';
									errorMap.push(error);
								}
							}
						} else if (dataType == 'Double') {
							if (isUserManuallyEnteredFieldValue == true) {
								if ($.isNumeric(value) == false) {
									error = {};
									error['id'] = id;
									error['errorMessage'] = 'Please enter Double Value!';
									errorMap.push(error);
								}
							}
						} else if (dataType == 'DateTime') {
							if (isUserManuallyEnteredFieldValue == true) {
						        if (!isValidDate(value)) {
									error = {};
									error['id'] = id;
									error['errorMessage'] = 'Please enter DateTime in "dd/MM/yyyy HH24:MI:SS" format!';
									errorMap.push(error);
								}
							}
						} else if (dataType == 'Boolean') {
							if (isUserManuallyEnteredFieldValue == true) {
								if (value != 'true' && value != 'false') {
									error = {};
									error['id'] = id;
									error['errorMessage'] = 'Please enter either true or false or select Any Boolean value.';
									errorMap.push(error);
								}
							}
						}
					}
				}
			}
		}
	});
	
	return errorMap;
}

function generateRuleMap(tableObj) {
	var rowId;
	var condition;
	var selectedFieldCategory;
	var selectedFieldName;
	var selectedFieldOperator;
	var selectedFieldValue;
	var item;
	var rulesArray;
	var andCondition;
	var orCondition;
	var ruleObj;
	
	$.each(tableObj, function(key, value) {
		rowId = value.id;
		if (key == 0) {
			
			andCondition = $('#' + rowId + '_AND');
			orCondition = $('#' + rowId + '_OR');
			
			if (andCondition.hasClass('btn btn-info AND')) {
				condition = 'AND';
			} else if (orCondition.hasClass('btn btn-info OR')) {
				condition = 'OR';
			}
			
			item = {};
			rulesArray = [];
			item['condition'] = condition;
			item['rules'] = rulesArray;
			
		} else {
			var childCount = $('#' + rowId).children('td').children('table').length;
			
			if (childCount > 0) {
				tableObj = $('#' + rowId).children('td').children('table').children('tbody').children();
				item['rules'].push(generateRuleMap(tableObj));
			} else {
				selectedFieldCategory = $('#' + rowId + '_FC').select2('data').text;
				selectedFieldName = $('#' + rowId + '_FN').select2('data').text;
				selectedFieldOperator = $('#' + rowId + '_FO').select2('data').text;
					
				if (selectedFieldOperator != 'is_empty' 
					&& selectedFieldOperator != 'is_not_empty' 
						&& selectedFieldOperator != 'is_null' 
							&& selectedFieldOperator != 'is_not_null') {
					
					selectedFieldValue = $('#' + rowId + '_FV').select2('data').text;
				} else {
					selectedFieldValue = '';
				}
				
				ruleObj = getRuleObj(selectedFieldCategory, selectedFieldName, selectedFieldOperator, selectedFieldValue);
				item['rules'].push(ruleObj);
			}
		}
	});
	
	return item;
}

function getRuleObj(fieldCategory, fieldName, fieldOperator, fieldValue) {
	var index;
	var id;
	var type;
	var value = '';
	var inputType;
	
	index = fieldName.lastIndexOf(' (');
	id = fieldName.substring(0, index);
	type = getDataTypeFromFieldNameLabel(fieldName);
	
	if (fieldValue != '') {
		index = fieldValue.indexOf(' - Sift Function');
		
		if (index != -1) {
			value = fieldValue.substr(0, index);
			inputType = 'userSelected';
			
		} else {
			index = fieldValue.indexOf(' (');
			if (index != -1) {
				value = fieldValue.substr(0, index);
				inputType = 'userSelected';
			} else {
				value = fieldValue;
				inputType = 'userInput';
			}
		}
	}
	
	var ruleObj = {};
	ruleObj['id'] = id;
	ruleObj['type'] = type;
	ruleObj['operator'] = fieldOperator;
	ruleObj['value'] = value;
	ruleObj['inputType'] = inputType;
	
	return ruleObj;
}

function rebuildRuleTree() {
	
}

function getErrorHtml(id, error) {
    var position = $('#' + id).position();
    
    var marginTop = position.top - 40;
    var errorMessageWidth = error.length * 6 + 'px';
    var style = 'opacity: 0.87; position: absolute; top: ' + marginTop + 'px; left: ' + position.left + 'px; display: block;';
    	
    var html = '<div id="' + id + '_ER" class="formError" style="' + style + '">';
		html += '<div class="formErrorContent" style="width: ' + errorMessageWidth + '">';
			html += error;
		html += '</div>';
		html += '<div class="formErrorArrow">';
			html += '<div class="line10"><!-- --></div>';
			html += '<div class="line9"><!-- --></div>';
			html += '<div class="line8"><!-- --></div>';
			html += '<div class="line7"><!-- --></div>';
			html += '<div class="line6"><!-- --></div>';
			html += '<div class="line5"><!-- --></div>';
			html += '<div class="line4"><!-- --></div>';
			html += '<div class="line3"><!-- --></div>';
			html += '<div class="line2"><!-- --></div>';
			html += '<div class="line1"><!-- --></div>';
		html += '</div>';
	html += '</div>';
    	
    return html;
	
}

function isInteger(value) {
	return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

function isValidDate(value) {
	// RegEx for dd/MM/yyyy HH24:MI:SS format
	var pattern = '^(0[1-9]|[12][0-9]|3[01])/([0]?[1-9]|1[0-2])/(19|20)[0-9][0-9] ([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$';
	var rx = new RegExp( pattern, "g" );
	return rx.test(value);
}