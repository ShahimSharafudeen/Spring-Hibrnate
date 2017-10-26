<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ page isELIgnored="false" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Expires" content="0">
		<meta name="_csrf" content="${_csrf.token}"/>
		<meta name="_csrf_header" content="${_csrf.headerName}"/>

		<title><tiles:insertAttribute name="title"/></title> 

		<link rel="shortcut icon" href="${pageContext.request.contextPath}/resources/images/favicon.ico">
		
		<script type="text/javascript">
			window.rootContext = '${pageContext.servletContext.contextPath}/';
		</script>

		<link href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.css" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/css/main.css"	rel="stylesheet" type="text/css" />
		<link href="${pageContext.request.contextPath}/resources/css/bootstrap-wizard.css" rel="stylesheet" type="text/css" />
		<link href="${pageContext.request.contextPath}/resources/css/glyphicons.css" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/css/nv.d3.css"	rel="stylesheet" type="text/css">
		<link href="${pageContext.request.contextPath}/resources/css/jquery.custom.css"	rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/js/plugins/select2/select2.css" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/js/plugins/jquery-textcomplete-master/dist/jquery.textcomplete.css" rel="stylesheet" />
		<link href="${pageContext.request.contextPath}/resources/css/common.css" rel="stylesheet" />
		
		<link type="text/css" href="${pageContext.request.contextPath}/resources/js/jquery.tools.dateinput.css" rel="stylesheet"></link>
    	<link type="text/css" href="${pageContext.request.contextPath}/resources/js/jquery.tools.overlay.css" rel="stylesheet"></link>
		<link type="text/css" href="${pageContext.request.contextPath}/resources/js/jquery.recurrenceinput.css" rel="stylesheet"></link>
        <link type="text/css" href="${pageContext.request.contextPath}/resources/js/gentleSelect/jquery-gentleSelect.css" rel="stylesheet" />
        <link type="text/css" href="${pageContext.request.contextPath}/resources/js/cron/jquery-cron.css" rel="stylesheet" />
        
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery/jquery-1.11.2.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery.tmpl.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery-ui-1.11.4/jquery-ui.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plugins/ui/jquery.collapsible.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery.uniform.min.js"></script>
		<%-- <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/main.js"></script> --%>
		<%-- <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jiraticket.js"></script> --%>

		<!-- DataTables CSS -->
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/js/plugins/tables/DataTables-1.10.7/media/css/jquery.dataTables.css">
		<script type="text/javascript" charset="utf8" src="${pageContext.request.contextPath}/resources/js/plugins/tables/DataTables-1.10.7/media/js/jquery.dataTables.js"></script>

		<!-- Tables Demo Script -->
		<%-- <script src="${pageContext.request.contextPath}/resources/js/tables.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/highcharts.js"></script> --%>

		<!--  Flot Charts Plugin -->
		<script	src="${pageContext.request.contextPath}/resources/theme/scripts/plugins/charts/flot/jquery.flot.js"></script>
		<script	src="${pageContext.request.contextPath}/resources/theme/scripts/plugins/charts/flot/jquery.flot.tooltip.js"></script>
		<script	src="${pageContext.request.contextPath}/resources/theme/scripts/plugins/charts/flot/jquery.flot.selection.js"></script>
		<script	src="${pageContext.request.contextPath}/resources/theme/scripts/plugins/charts/flot/jquery.flot.resize.js"></script>
		<script	src="${pageContext.request.contextPath}/resources/theme/scripts/plugins/charts/flot/jquery.flot.orderBars.js"></script>

		<%-- <script	src="${pageContext.request.contextPath}/resources/js/nvd3/d3.v3.js"></script> --%>

		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plugins/select2/select2.js"></script>

		<!-- JQuery Validation -->
		<script	src="${pageContext.request.contextPath}/resources/js/jquery.validate.min.js"></script>
		<script	src="${pageContext.request.contextPath}/resources/js/bootstrap-wizard.js"></script>
		<script src="${pageContext.request.contextPath}/resources/js/jquery.validation.js"></script>
		<script	src="${pageContext.request.contextPath}/resources/js/jquery.validationEngine-en.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/plugins/jquery-textcomplete-master/dist/jquery.textcomplete.js"></script>
		<script src="${pageContext.request.contextPath}/resources/js/jquery-ui-timepicker/jquery-ui-sliderAccess.js"></script>
		<script src="${pageContext.request.contextPath}/resources/js/jquery-ui-timepicker/jquery-ui-timepicker-addon.js"></script>
		<link href="${pageContext.request.contextPath}/resources/js/jquery-ui-timepicker/jquery-ui-timepicker-addon.css" rel="stylesheet" />
	
		<script src="${pageContext.request.contextPath}/resources/js/sift/mainTemplate.js"></script>
		<script src="${pageContext.request.contextPath}/resources/js/plugins/spin/spin.min.js"></script>
		<script src="${pageContext.request.contextPath}/resources/js/plugins/spin/jquery.spin.js"></script>
		<%-- <script src="${pageContext.request.contextPath}/resources/js/sift/ajaxsessiontimeout.js"></script> --%>	
		
		<script src="${pageContext.request.contextPath}/resources/js/plugins/input-limiter/jquery.inputlimiter.1.3.1.min.js"></script> 
		
		<script src="${pageContext.request.contextPath}/resources/js/plugins/bootbox/bootbox.min.js"></script>	
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/ajax-form/jquery.form.min.js"></script>
		
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery.tools.dateinput.js"></script>
    	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery.tools.overlay.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery.recurrenceinput.js"></script>
	</head>
	<body>
		<div>
			<div id="top">
				<tiles:insertAttribute name="header" />
			</div>
			<div id="container">
				<tiles:insertAttribute name="sidebar"/>
				<tiles:insertAttribute name="content" />
			</div>
			<!-- <div id="Spinner"></div> -->
		</div>
	</body>
</html>