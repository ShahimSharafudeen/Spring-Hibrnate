var siftFunctionsArray = [];
var siftFieldsArray = [];
var siftEventsArray = [];
var siftIndicatorsArray = [];

var siftIndicatorsMap = [];
var siftEventsMap = [];
var siftFieldsMap = [];
var siftFunctionsMap = [];

var criteriaContextFieldOptions = [{
	match: /(^|\s)(\w{2,})$/,
	search: function (term, callback) {
		var words = siftFunctionsArray.concat(siftFieldsArray.concat(siftEventsArray.concat(siftIndicatorsArray)));
		callback($.map(words, function (word) {
			return word.indexOf(term) === 0 ? word : null;
		}));
	},
	replace: function (word) {
		return ' ' + word;
	}
}];

$(function () {
	
	// Initialize select boxes with .select2(). Refer https://select2.github.io/examples.html
	loadSiftIndicatorsArray();
	loadSiftFieldsArray();
	loadSiftFunctionsArray();
	loadSiftEventsArray();
	
	$('#expression').textcomplete([{
	    match: /(^|\s)(\w{2,})$/,
	    search: function (term, callback) {
	        var words = siftFunctionsArray.concat(siftFieldsArray.concat(siftEventsArray.concat(siftIndicatorsArray)));
	        callback($.map(words, function (word) {
	            return word.indexOf(term) === 0 ? word : null;
	        }));
	    },
	    replace: function (word) {
	        return ' ' + word;
	    }
	}]);
});

function loadSiftFieldsArray() {
	var token = $("meta[name='_csrf']").attr("content");
	var url = window.rootContext + "secure/siftField/json";
		
	$.ajax({
  	  	type: 'get',
  	  	url: url,
  	  	headers: {
	  		"X-CSRF-TOKEN":token
	  	},
  	  	dataType: 'json',
  	    async: false,
  		
  	  	success: function(data) {
  	  		var item = {};
  	  		for (i = 0; i < data.length; i++) {
	  	  		siftFieldsArray.push(data[i].name);
	  	  		item = {};
	  	  		item['id'] = i;
	  	  		item['text'] = data[i].name + ' ( ' + getType(data[i].type) + ' )';
	  	  	
	  	  		siftFieldsMap.push(item);
			}
  	  	},
  	  	error: function (request, status, error) {
	  	
  	  	}
    });
}

function loadSiftFunctionsArray() {
	var token = $("meta[name='_csrf']").attr("content");
	var url = window.rootContext + "secure/siftFunction/json";
		
	$.ajax({
  	  	type: 'get',
  	  	url: url,
  	  	headers: {
	  		"X-CSRF-TOKEN":token
	  	},
  	  	dataType: 'json',
  		
  	  	success: function(data) {
  	  		var item = {};
  	  		for (i = 0; i < data.length; i++) {
	  	  		siftFunctionsArray.push(data[i].name);
	  	  		
	  	  		item = {};
		  		item['id'] = i;
		  		item['text'] = data[i].signature + ' ( ' + getType(data[i].returnType) + ' )';
		  		
		  		siftFunctionsMap.push(item);
			}
  	  	},
  	  	error: function (request, status, error) {
	  	
  	  	}
    });
}

function loadSiftEventsArray() {
	var token = $("meta[name='_csrf']").attr("content");
	var url = window.rootContext + "secure/event/json";
		
	$.ajax({
  	  	type: 'get',
  	  	url: url,
  	  	headers: {
	  		"X-CSRF-TOKEN":token
	  	},
  	  	dataType: 'json',
  		
  	  	success: function(data) {
  	  		var item = {};
  	  		for (i = 0; i < data.length; i++) {
	  	  		siftEventsArray.push(data[i].id);
	  	  		
	  	  		if (data[i].status == 'Active') {
	  	  		  	item = {};
			  	  	
			  	  	item['id'] = i;
		  	  		item['text'] = data[i].id + ' ( ' + getType(data[i].expressionType) + ' )';
			  	
			  		siftEventsMap.push(item);
	  	  		}
			}
  	  	},
  	  	error: function (request, status, error) {
	  	
  	  	}
    });
}

function loadSiftIndicatorsArray() {
	var token = $("meta[name='_csrf']").attr("content");
	var url = window.rootContext + "secure/indicator/json";
		
	$.ajax({
  	  	type: 'get',
  	  	url: url,
  	  	headers: {
	  		"X-CSRF-TOKEN":token
	  	},
  	  	dataType: 'json',
  	    async: false,
  		success: function(data) {
  			var item = {};
  			for (i = 0; i < data.length; i++) {
  				if (data[i].status == 'Active') {
  					siftIndicatorsArray.push(data[i].id);
  					item = {};
	  				
	  				item['id'] = i;
		  	  		item['text'] = data[i].id + ' ( ' + getType(data[i].expressionType) + ' )';
			  	
			  		siftIndicatorsMap.push(item);
  				}
  			};
  	  	},
  	  	error: function (request, status, error) {
	  	
  	  	}
    });
}