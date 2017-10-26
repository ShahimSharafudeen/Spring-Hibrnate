<%-- <%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%> --%>

<script
	src="${pageContext.request.contextPath}/resources/js/sift/batchApp/segmentJoinDataProperties.js"></script>

<div id="joinDataPropertiesModalDiv" style="display: none">
	<div class="modal hide fade" id="joinDataPropertiesModal" style="">
		<div class="modal-header">
			<div class="navbar-inner">
				<table border="0" width="100%">
					<tr>
						<td width="50%" align="left">
							<div id="triggerHeaderId"></div>
							<h6>Join Criteria</h6>
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
						<label class="control-label span12"> Database </label>
					</div>
					<div class="span9">
						<input type="text" class="span12" id="joinDataDatabaseName"
							name="joinDataDatabaseName" />
					</div>
				</div>
			</div>
			<br />
			<div class="row-fluid">
				<div class="span12">
					<div class="span3">
						<label class="control-label span12"> Join Id </label>
					</div>
					<div class="span9">
						<input type="text" class="span12" id="joinDataTemporaryTableName"
							name="joinDataTemporaryTableName"
							placeholder="Type temporary table name  here" />
					</div>
				</div>
			</div>
			<br />
			<div class="row-fluid">
				<div class="span12">
					<div class="span3">
						<label class="control-label span12"> Join Query </label>
					</div>
					<div class="span9">
						<textarea id="joinDataQuery" name="joinDataQuery" class="span12"
							rows="3" cols="100" placeholder="Type join query here"></textarea>
					</div>
				</div>
			</div>
			<br />
			<div class="row-fluid" id="joinDataOutputFilePathMainDiv">
				<div class="span12">
					<div class="span3">
						<label class="control-label span12"> Exception Message </label>
					</div>
					<div class="span9" id="joinDataOutputFilePathDiv"
						style="color: #FF0000">
						<!-- <input type="text" class="span12" name="triggerCategory" id="triggerCategory" placeholder="5" readonly /> -->
					</div>
				</div>
			</div>
			<br />
			<div align="center">
				<b><span class="text-success joinSuccessMsg"
					style="display: none" id="joinSuccessMsg"></span></b> <b><span
					class="text-error joinFailureMsg" style="display: none"
					id="joinFailureMsg"></span></b>
			</div>
		</div>
		<div class="modal-footer">
			<div class="row-fluid">
				<div class="control-group">
					<div class="span2 left">
						<button type="button" id="joinDataCancelButton"
							class="btn btn-block btn-warning" data-dismiss="modal">
							Cancel</button>
					</div>
					<div class="span2 left">
						<button type="button" id="joinDataResetButton"
							class="btn btn-block btn-danger">Reset</button>
					</div>
					<div class="span2 left">
						<button type="button" id="joinDataSaveButton"
							class="btn btn-block btn-primary">Save</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>