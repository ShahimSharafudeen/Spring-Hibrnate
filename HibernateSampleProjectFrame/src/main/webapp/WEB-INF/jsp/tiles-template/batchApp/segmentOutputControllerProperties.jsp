<%-- <%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%> --%>

<script
	src="${pageContext.request.contextPath}/resources/js/sift/batchApp/segmentOutputControllerProperties.js"></script>

<div id="outputControllerPropertiesModalDiv" style="display: none">
	<div class="modal hide fade" id="outputControllerPropertiesModal"
		style="">
		<div class="modal-header">
			<div class="navbar-inner">
				<table border="0" width="100%">
					<tr>
						<td width="50%" align="left">
							<div id="triggerHeaderId"></div>
							<h6>Output Controller Criteria</h6>
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
						<label class="control-label span12"> OutPut Destination </label>
					</div>
					<div class="span9">
						Queue <input type="radio" name="yesno" id="yesCheck" value="queue">
						File <input type="radio" name="yesno" id="noCheck" value="file"><br>
					</div>
				</div>
			</div>
			<br />
			<div class="row-fluid" id="ifYes" style="visibility: hidden">
				<div class="span12">
					<div class="span3">
						<label class="control-label span12"> OutPut Queue Name </label>
					</div>
					<div class="span9">
						<input id='outputControllerQueue' name='outputControllerQueue'
							class="span12" rows="3" cols="100"
							placeholder="Select output queue name"></input>
					</div>
				</div>
			</div>
			<br />
			<div class="row-fluid" id="ifNo" style="visibility: hidden">
				<div class="span12">
					<div class="span4">
						<label class="control-label span12"> Split Across Days </label>
					</div>
					<div class="span8">
						<input type="checkbox" id="splitAcrossDays" name="splitAcrossDays"></input><br />
					</div>
				</div>
				<div class="span12">
					<div class="span4">
						<label class="control-label span12"> Total Segment Count
							Per Run </label>
					</div>
					<div class="span8">
						<input type="number" id="totalSegmentCountPerRun"
							name="totalSegmentCountPerRun" class="span12" rows="3" cols="100"
							placeholder="Enter Total Segment Count Per Run"></input><br />
					</div>
				</div>

				<div class="span12">
					<div class="span4">
						<label class="control-label span12"> Number of Entries Per
							File </label>
					</div>
					<div class="span8">
						<input type="number" id="outputControllerNoOfEntry"
							name="outputControllerNoOfEntry" class="span12" rows="3"
							cols="100" placeholder="Enter Number of Entries Per File"></input><br />
					</div>
				</div>
				<div class="span12">
					<div class="span4">
						<label class="control-label span12"> Sift Input File Path
						</label>
					</div>
					<div class="span8">
						<input type="text" id="outputControllerSiftFilePath"
							name="outputControllerSiftFilePath" class="span12" rows="3"
							cols="100" placeholder="Type sift input file path here"></input>
					</div>
				</div>
			</div>
			<br />
			<div class="row-fluid" id="outputControllerOutputFilePathMainDiv">
				<div class="span12">
					<div class="span3">
						<label class="control-label span12"> Output File </label>
					</div>
					<div class="span9" id="outputControllerOutputFilePathDiv">
						<!-- <input type="text" class="span12" name="triggerCategory" id="triggerCategory" placeholder="5" readonly /> -->
					</div>
				</div>
			</div>
			<br />
			<div class="row-fluid" id="outputControllerOutputExceptionMainDiv">
				<div class="span12">
					<div class="span3">
						<label class="control-label span12"> Exception Message </label>
					</div>
					<div class="span9" id="outputControllerOutputExceptionDiv"
						style="color: #FF0000">
						<!--<input type="text" class="span12" name="triggerStatus" id="triggerStatus" placeholder="6" readonly />-->
					</div>
				</div>
			</div>
			<br />
			<div align="center">
				<b><span class="text-success controlSuccessMsg"
					style="display: none" id="controlSuccessMsg"></span></b> <b><span
					class="text-error controlFailureMsg" style="display: none"
					id="controlFailureMsg"></span></b>
			</div>
		</div>
		<div class="modal-footer">
			<div class="row-fluid">
				<div class="control-group">
					<div class="span2 left">
						<button type="button" id="outputControllerCancelButton"
							class="btn btn-block btn-warning" data-dismiss="modal">
							Cancel</button>
					</div>
					<div class="span2 left">
						<button type="button" id="outputControllerResetButton"
							class="btn btn-block btn-danger">Reset</button>
					</div>
					<div class="span2 left">
						<button type="button" id="outputControllerSaveButton"
							class="btn btn-block btn-primary">Save</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>