$(function () {
	getCampaignsListForEventStats();
});


function getCampaignsListForEventStats() {
	
	var token = $("meta[name='_csrf']").attr("content");
	var url = window.rootContext + 'secure/insights/event/stats/campaigns/json';
	$("#Spinner").spin(spinnerOptions);
	$.ajax({
		type: 'get',
		url: url,
  	  	headers: {
	  		"X-CSRF-TOKEN":token
	  	},
  	  	dataType: 'json',
  		
  	  	success: function(data) {
  	  			  		  	  			
  	  		if (!data['failureMessage']) {
  	  		
		  		populateEventStatisticsSideMenu(data);
		  	}
  	  		$("#Spinner").spin(false);
  	  		
  	  	},
  	  	error: function (request, status, error) {
	  	
  	  	}
    });
}

function populateEventStatisticsSideMenu(data) {
	var numberOfCampaigns = Object.keys(data).length;
	
	if (numberOfCampaigns > 0) {
		$('#eventStatsCampaignSizeId').text(numberOfCampaigns);
		var liststr = '';
		$.each(data, function(key, value) {
			liststr += '<li><a id="listCampaignId-' + value.id + '" href="?' + value.id + '">' + value.id + '</a></li>';
			
		});
		$('#eventStatsCampaignSubId').html(liststr);
	}
}