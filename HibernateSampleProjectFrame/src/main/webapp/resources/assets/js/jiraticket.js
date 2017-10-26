/**
 * Created by ajithkumar on 7/5/14.
 */

// Requires jQuery!
jQuery.ajax({
    url: $('#jiraTicketUrl').val(),
    type: 'get',
    cache: true,
    dataType: 'script'
});

window.ATL_JQ_PAGE_PROPS =  {
    'triggerFunction': function(showCollectorDialog) {
        //Requries that jQuery is available!
        jQuery('#siftJIRATrigger').click(function(e) {
            e.preventDefault();
            showCollectorDialog();
        });
    }};
