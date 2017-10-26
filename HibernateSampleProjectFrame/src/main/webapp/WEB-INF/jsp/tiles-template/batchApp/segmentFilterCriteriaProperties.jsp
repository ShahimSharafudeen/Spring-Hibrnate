<%-- <%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%> --%>

<script
	src="${pageContext.request.contextPath}/resources/js/sift/batchApp/segmentFilterCriteriaProperties.js"></script>

<div id="filterCriteriaPropertiesModalDiv" style="display: none">
	<div class="modal hide fade" id="filterCriteriaPropertiesModal"
		style="">
		<div class="modal-header">
			<div class="navbar-inner">
				<table border="0" width="100%">
					<tr>
						<td width="50%" align="left">
							<div id="triggerHeaderId"></div>
							<h6>Filter Criteria</h6>
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
					<div class="span2">
						<label class="control-label span12"> Campaign ID </label>
					</div>
					<div class="span10">
						<input type="text" class="span12" id="campaignId"
							name="campaignId" class="span12" rows="3" cols="100"
							placeholder="CampaignIDs" />
					</div>
				</div>
			</div>
			<br />
			<div class="row-fluid">
				<div class="span6">
					<div class="span4">
						<label class="control-label span12"> Filter Start Date </label>
					</div>
					<div class="span8">
						<input type="text" class="span12" id="filterStartDate"
							name="filterStartDate" class="span12" rows="3" cols="100"
							placeholder="yyyy-MM-dd" />
					</div>
				</div>
				<div class="span6">
					<div class="span4">
						<label class="control-label span12"> Filter End Date </label>
					</div>
					<div class="span8">
						<input type="text" class="span12" id="filterEndDate"
							name="filterEndDate" class="span12" rows="3" cols="100"
							placeholder="yyyy-MM-dd" />
					</div>
				</div>
			</div>
			<br />
			<div class="row-fluid">
				<div class="span12">
					<div class="span2">
						<label class="control-label span12"> Contact Status </label>
					</div>
					<div class="span10">
						<input type="text" class="span12" id="contactStatus"
							name="contactStatus" class="span12" rows="3" cols="100"
							placeholder="Contact Status" />
					</div>
				</div>
			</div>
			<br />
			<div class="row-fluid" id="filterCriteriaOutputFilePathMainDiv">
				<div class="span12">
					<div class="span3">
						<label class="control-label span12"> Exception Message </label>
					</div>
					<div class="span9" id="filterCriteriaOutputFilePathDiv"
						style="color: #FF0000">
						<!-- <input type="text" class="span12" name="triggerCategory" id="triggerCategory" placeholder="5" readonly /> -->
					</div>
				</div>
			</div>
			<br />
			<div align="center">
				<b><span class="text-success segmentSuccessMsg"
					style="display: none" id="segmentSuccessMsg"></span></b> <b><span
					class="text-error segmentFailureMsg" style="display: none"
					id="segmentFailureMsg"></span></b>
			</div>
		</div>
		<div class="modal-footer">
			<div class="row-fluid">
				<div class="control-group">
					<div class="span2 left">
						<button type="button" id="filterCriteriaCancelButton"
							class="btn btn-block btn-warning" data-dismiss="modal">
							Cancel</button>
					</div>
					<div class="span2 left">
						<button type="button" id="filterCriteriaResetButton"
							class="btn btn-block btn-danger">Reset</button>
					</div>
					<div class="span2 left">
						<button type="button" id="filterCriteriaSaveButton"
							class="btn btn-block btn-primary">Save</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>