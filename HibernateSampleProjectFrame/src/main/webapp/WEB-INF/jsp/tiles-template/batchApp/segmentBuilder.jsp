<%@ page isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<script
	src="${pageContext.request.contextPath}/resources/js/sift/batchApp/segmentBuilder.js"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/sift/batchApp/programValidation.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/gojs/go.js"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/gojs/icons.js"></script>

<link
	href="${pageContext.request.contextPath}/resources/js/plugins/bootstrap-modal/css/bootstrap-modal.css"
	rel="stylesheet" />
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/plugins/bootstrap-modal/js/bootstrap-modal.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/plugins/bootstrap-modal/js/bootstrap-modalmanager.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/plugins/printer/jquery.printelement.min.js"></script>

<div class="modal hide" id="programBuilderModal" tabindex="-1"
	style="width: 1250px; margin-left: -620px">
	<div class="modal-header">
		<div class="navbar-inner">
			<table border="0" width="100%">
				<tr>
					<td width="50%" align="left">
						<h6>Testcase Builder</h6>
					</td>
					<td width="50%" align="right">
						<button type="button" id="modalRunButton" class="btn btn-success">
							Run</button>
						<button type="button" id="modalPreviewButton"
							class="btn btn-default">Print</button>
						<button type="button" id="modalSaveButton" class="btn btn-primary">
							Save</button>
						<button type="button" id="modalResetButton"
							class="btn btn-warning">Reset</button>
						<button type="button" id="modalCancelButton"
							class="btn btn-danger" data-dismiss="modal">X</button>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<div class="modal-body" style="max-height: 800px;">
		<table border="1">
			<thead>
				<tr>
					<th style="width: 10%; text-align: center"><h6>Palette</h6></th>
					<th style="width: 90%; text-align: center"><h6>Diagram</h6></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td width="12%"><div id="myPalette"
							style="width: 160px; height: 530px"></div></td>
					<td width="88%" align="left"><div id='loaderImage'
							style="position: fixed; left: 50%; top: 50%; display: none;">
							<%-- <img src="${pageContext.request.contextPath}/resources/img/ajax-loader.gif"> --%>
						</div>
						<div id="myDiagram" style="width: 1030px; height: 530px"></div></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<%@ include file="segmentControlGroupProperties.jsp"%>
<%@ include file="segmentFilterCriteriaProperties.jsp"%>
<%@ include file="segmentJoinDataProperties.jsp"%>
<%@ include file="segmentOutputControllerProperties.jsp"%>
<%@ include file="segmentCriteriaProperties.jsp"%>
<%@ include file="segmentPreviewDiagram.jsp"%>