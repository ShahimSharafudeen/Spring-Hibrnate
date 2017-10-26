<%@ page isELIgnored="false" %>
<script>
var segmentName='${segmentName}';
</script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/sift/batchApp/edit_segment.js"></script>
	<script
	src="${pageContext.request.contextPath}/resources/js/sift/batchApp/timezones.full.min.js"></script>
	
	
<div id="content">
	<div class="wrapper">
		<div class="crumbs">
			<ul id="breadcrumbs" class="breadcrumb">
				<li><a href="#"> Segmentation Builder </a></li>
			</ul>
		</div>
		<div class="page-header">
			<div class="page-title">
				<h5>Segmentation Builder</h5>
				<span> Build work Segment flows </span>
			</div>
		</div>

		<div class="actions-wrapper">
			
			<div align="center">
				<b><span class="text-success successMsg" style="display: none"
					id="successMsg"></span></b> <b><span class="text-error failureMsg"
					style="display: none" id="failureMsg"></span></b>
			</div>

			<div class="row-fluid">
				<div class="span12">

					<form class="form-horizontal form-Program"
						id="testcaseBuilder-form"
						method="post">
						<div class="widget">
							<div class="navbar">
								<div class="navbar-inner">
									<h6>Configure Segment Cases</h6>
								</div>
							</div>
							<div class="well">

								<div class=" control-group">
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Segment Name</label>
										</div>
										<div class="span7">
											<input class="span12" type="text" size="50"
												name="segmentName" id="segmentName"
												placeholder="Segment Name" />
										</div>
									</div>
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Segment Description</label>
										</div>
										<div class="span7">
											<textarea id="segmentDescription"
												name="segmentDescription" class="span12" rows="3"
												cols="50" placeholder="Segment Description"></textarea>
										</div>
									</div>
									</div>
									<div class=" control-group">
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Segment Run Start Date</label>
										</div>
										<div class="span7">
											<input class="span12" type="text" size="50"
												name="segmentCreationStartDate" id="segmentCreationStartDate"
												placeholder="Segment Creation Start Date" />
										</div>
									</div>
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Segment Run End Date</label>
										</div>
										<div class="span7">
											<input class="span12" type="text" size="50"
												name="segmentCreationEndDate" id="segmentCreationEndDate"
												placeholder="Segment Creation End Date" />
										</div>
									</div>
									</div>
									<div class=" control-group">
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Segment Category</label>
										</div>
										<div class="span7">
											<input class="span12" type="text" size="50"
												name="segmentCategory" id="segmentCategory"
												placeholder="Segment Category" />
										</div>
									</div>
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Time Zone</label>
										</div>
										<div class="span7">
											<select class="span12" id="timeZone" name="timeZone"></select>
											<span id="timeZone-error"></span>
										</div>
									</div>
									
									</div>
								<input type="hidden" name="segmentCronExpression"
									id="segmentCronExpression"
									placeholder="Segment Cron Expression" />
								<div class=" control-group span12">
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Segment Run
												Frequency</label>
										</div>
										<div class="span7">

											<select class="span12" id="frequency" name="frequency">
												<option></option>
												<option value="minutes">Minutes</option>
												<option value="hourly">Hourly</option>
												<option value="daily">Daily</option>
												<option value="weekly">Weekly</option>
												<option value="monthly">Monthly</option>
												<option value="yearly">Yearly</option>
											</select> <span id="frequency-error"></span>
										</div>
									</div>
								</div>
								<div class=" control-group">
									<div class="span6">
										<div class="minHourDaySelector">
											<label class="radio-inline"> <input type="radio"
												name="selectOne" class="cbr cbr-success" value="every">
												<span class="monthly">Day <input type="text"
													class="form-control radio-inline" style="width: 60px;"
													id="date" /> of every
											</span> <span id="other">Every</span> <input type="text"
												class="form-control radio-inline" style="width: 60px;"
												id="interval" /> <span id="minHourDayLabel"></span>
											</label>
										</div>
										<div class="monthAndDateSelector yearly">
											<label class="radio-inline"> <input type="radio"
												name="selectOne" class="cbr cbr-success"
												value="monthAndDate"> Every <select
												class="form-control radio-inline" id="monthAndDateMonth"
												style="width: 115px;">
													<option value="1">January</option>
													<option value="2">February</option>
													<option value="3">March</option>
													<option value="4">April</option>
													<option value="5">May</option>
													<option value="6">June</option>
													<option value="7">July</option>
													<option value="8">August</option>
													<option value="9">September</option>
													<option value="10">October</option>
													<option value="11">November</option>
													<option value="12">December</option>
											</select> <input type="text" class="form-control radio-inline"
												style="width: 60px;" id="monthAndDateDate" />
											</label>
										</div>
										<div class="whichDayOfWeekSelector">
											<label class="radio-inline"> <input type="radio"
												name="selectOne" class="cbr cbr-success" value="which"> The <select
												class="form-control radio-inline" id="which"
												style="width: 115px;">
													<option value="1">First</option>
													<option value="2">Second</option>
													<option value="3">Third</option>
													<option value="4">Fourth</option>
											</select> <select class="form-control radio-inline" id="day"
												style="width: 115px;">
													<option value="MON">Monday</option>
													<option value="TUE">Tuesday</option>
													<option value="WED">Wednesday</option>
													<option value="THU">Thursday</option>
													<option value="FRI">Friday</option>
													<option value="SAT">Saturday</option>
													<option value="SUN">Sunday</option>
											</select> <span id="monthlyInterval"> of every <input
													type="text" class="form-control radio-inline"
													style="width: 60px;" id="monthInterval" /> Months(s)
											</span> <span class="yearly"> of <select
													class="form-control radio-inline" id="month"
													style="width: 115px;">
														<option value="1">January</option>
														<option value="2">February</option>
														<option value="3">March</option>
														<option value="4">April</option>
														<option value="5">May</option>
														<option value="6">June</option>
														<option value="7">July</option>
														<option value="8">August</option>
														<option value="9">September</option>
														<option value="10">October</option>
														<option value="11">November</option>
														<option value="12">December</option>
												</select>
											</span>
											</label>
										</div>
										<div class="everyWeekDaySelector">
											<label class="radio-inline"> <input type="radio"
												name="selectOne" class="cbr cbr-success"
												value="everyWeekDay"> Every Week Day
											</label>
										</div>
										<!-- Weekday selector -->
										<div class="weekDaySelector">
											<div class="form-group">
												<div class="span3">
													<div class="form-block">
														<label> <input type="checkbox" class="cbr"
															name="weekDay" value="MON"> Monday
														</label> <br /> <label> <input type="checkbox"
															class="cbr" name="weekDay" value="THU"> Thursday
														</label> <br /> <label> <input type="checkbox"
															class="cbr" name="weekDay" value="SUN"> Sunday
														</label>
													</div>
												</div>
												<div class="span3">
													<div class="form-block">
														<label> <input type="checkbox" class="cbr"
															name="weekDay" value="TUE"> Tuesday
														</label> <br /> <label> <input type="checkbox"
															class="cbr" name="weekDay" value="FRI"> Friday
														</label>
													</div>
												</div>
												<div class="span3">
													<div class="form-block">
														<label> <input type="checkbox" class="cbr"
															name="weekDay" value="WED"> Wednesday
														</label> <br /> <label> <input type="checkbox"
															class="cbr" name="weekDay" value="SAT"> Saturday
														</label>
													</div>
												</div>
											</div>
										</div>
										</div>
										<!-- Timepicker -->
										<div class="span6">
										<div class="atSelector">
										<div class="span5">
											<label class="radio-inline"> <span
												class="atOrStartTimeRadio"> <input type="radio"
													name="selectOne" class="cbr cbr-success" value="at">
											</span> <span id="atOrStartTimeLabel">Segment Run Start Time</span>
											</label> </div><div class="span7"><label class="radio-inline"> <input class="span12" name="startTime"
												id="startTime" type="text" class="form-control timepicker"
												data-template="dropdown" data-show-seconds="false"
												data-default-time="00:00" data-show-meridian="true"
												data-minute-step="1" value="00:00" />
											</label></div>
										</div>
									</div>
								</div>
								<div class=" control-group">
									<div class="span6" >
										<div class="span5">
											<label class="control-label span12">Segment Process Time</label>
										</div>
										<div class="span7">
											<input class="span12" type="text" size="50"
												name="segmentProcessTime" id="segmentProcessTime"
												placeholder="Segment Process Time" />
										</div>
									</div>		
									
									</div>
						</div>
						<%@ include file="segmentBuilder.jsp"%>

						<div class="widget">
							<div class="navbar">
								<div class="navbar-inner">
									<div class="span2 center">
										<span id="programBuilderButton" class="btn btn-block btn-info">
											Flow Builder </span>
									</div>
								</div>
							</div>
						</div>

						<%@ include file="segmentDiagram.jsp"%>


							<div class="widget">
								<div class="navbar">
									<div class="navbar-inner">
										<h6>
											Execution History
										</h6>
									</div>
								</div>
								<div class="well">
									<div class="table-overflow">
										<table id="segmentHistoryTable"
											class="table table-striped table-bordered table-condensed">
											<thead>
												<tr>
													<th width="2%">slno</th>
													<th width="24%" class="bd">StartTime</th>
													<th width="24%" class="bd">EndTime</th>
													<th width="28%" class="bd">Segment Output File</th>
													<th width="12%" class="bd">Number of Records</th>
													<th width="10%" class="bd">Process</th>
												</tr>
											</thead>
											<tbody>
											    <c:set var="count" value="0" />
												<c:forEach items="${segmentHistory}"
													var="updateHistory" varStatus="updateHistoryCount">
													<c:set var="count" value="${count + 1}" />
													<tr class="gradeX">
														<td>${count}</td>
														<td>${updateHistory.startTime}</td>
														<td>${updateHistory.endTime}</td>
														<td>
												        <c:forEach items="${updateHistory.outputFileName}" var="outputFileName" varStatus="OutputFileName">
														<a href="${pageContext.request.contextPath}/secure/downloadOutputFile?outputfilename=${outputFileName}">${outputFileName}
														</a>
														</c:forEach>
														</td>
														<td>${updateHistory.outputFileSize}</td>
														<td>${updateHistory.outputSiftFilePath}</td>
													</tr>
												</c:forEach>
											</tbody>
										</table>
									</div>
								</div>
							</div>


						<div align="center">
							<b><span class="text-success successMsg"
								style="display: none" id="successMsg"></span></b> <b><span
								class="text-error failureMsg" style="display: none"
								id="failureMsg"></span></b>
						</div>

						<div class="row-fluid">
							<div class="control-group">
								<div class="span2 center">
									<button type="submit" id="saveButton"
										class="btn btn-block btn-primary" data-actionType="save">Save</button>
								</div>
								<div class="span2 center">
									<button type="submit" id="executeTestcase"
										class="btn btn-block btn-success" data-actionType="execute">Execute
										Batch Case</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>