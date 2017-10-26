<%-- <%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%> --%>

<script
	src="${pageContext.request.contextPath}/resources/js/sift/batchApp/segmentControlGroupProperties.js"></script>

<div id="controlGroupPropertiesModalDiv" style="display: none">
	<div class="modal hide fade" id="controlGroupPropertiesModal" style="">
		<div class="modal-header">
			<div class="navbar-inner">
				<table border="0" width="100%">
					<tr>
						<td width="50%" align="left">
							<div id="triggerHeaderId"></div>
							<h6>Query Builder</h6>
						</td>
						<td width="50%" align="right">
							<button type="button" id="modalCancelButton"
								class="btn btn-danger" data-dismiss="modal">X</button>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="modal-body">
			<div class="row-fluid">
				<div class="span12">
					<div class="span3">
						<label class="control-label span12"> Query </label>
					</div>
					<div class="span9">
						<textarea id="controlGroupQuery" name="controlGroupQuery"
							class="span12" rows="3" cols="100" placeholder="Type query here"></textarea>
					</div>
				</div>
			</div>
			<br />
			<div class="row-fluid" id="controlGroupOutputFilePathMainDiv">
				<div class="span12">
					<div class="span3">
						<label class="control-label span12"> Output File </label>
					</div>
					<div class="span9" id="controlGroupOutputFilePathDiv">
						<!-- <input type="text" class="span12" name="triggerCategory" id="triggerCategory" placeholder="5" readonly /> -->
					</div>
				</div>
			</div>
			<br />
		</div>
		<div class="modal-footer">
			<div class="row-fluid">
				<div class="control-group">
					<div class="span2 left">
						<button type="button" id="controlGroupCancelButton"
							class="btn btn-block btn-warning" data-dismiss="modal">
							Cancel</button>
					</div>
					<div class="span2 left">
						<button type="button" id="controlGroupResetButton"
							class="btn btn-block btn-danger">Reset</button>
					</div>
					<div class="span2 left">
						<button type="button" id="controlGroupSaveButton"
							class="btn btn-block btn-primary">Save</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>