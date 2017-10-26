<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<script
	src="${pageContext.request.contextPath}/resources/js/sift/batchApp/segmentPreviewDiagram.js"></script>

<div class="modal hide" id="programDiagramPrinterModal" tabindex="-1"
	style="width: 1250px; margin-left: -620px">
	<div class="modal-header">
		<div class="navbar-inner">
			<table border="0" width="100%">
				<tr>
					<td width="50%" align="left">
						<h6>Preview Diagram</h6>
					</td>
					<td width="50%" align="right">
						<button type="button" id="modalPrintButton"
							class="btn btn-default">Print</button>
						<button type="button" id="modalCancelButton"
							class="btn btn-danger" data-dismiss="modal">X</button>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<div class="modal-body" style="max-height: 800px;">
		<div id="printableDiagram"></div>
	</div>
</div>