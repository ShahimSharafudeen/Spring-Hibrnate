<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<script src="${pageContext.request.contextPath}/resources/js/gojs/go.js"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/gojs/icons.js"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/sift/batchApp/segmentDiagram.js"></script>
<div class="widget" id="programDIagramDiv" style="display: none;">

	<div class="well" style="display: none">
		<div id="programDiagram" style="display: none"></div>

	</div>
	<div class="well">
		<div id="programDiagramImg" style="height: 500px"></div>
	</div>
</div>