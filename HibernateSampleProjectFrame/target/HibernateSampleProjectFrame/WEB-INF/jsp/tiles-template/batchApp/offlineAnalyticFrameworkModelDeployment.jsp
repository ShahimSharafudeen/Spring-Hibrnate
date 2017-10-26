<%@ page isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/sift/batchApp/offlineAnaliticFramework.js"></script>
<c:if test="${editMode}">
	<input type="hidden" name="idToEdit" id="idToEdit" value="${id}" />
	<input type="hidden" name="oldVersion" id="oldVersion" />
	<input type="hidden" name="oldModelName" id="oldModelName" />
</c:if>
<div id="content">
	<div class="wrapper">
		<div class="crumbs">
			<ul id="breadcrumbs" class="breadcrumb">
				<li><a href="#"> Model Deployment </a></li>
			</ul>
		</div>
		<div class="page-header">
			<div class="page-title">
				<h5>Offline Analytic framework</h5>
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

					<form class="form-horizontal form-Program" id="modelExecutor-form"
						method="post" enctype="multipart/form-data"
						action="analyticModelExecute/json.do">
						<input type="hidden" name="id" id="id" />
						<input type="hidden" name="modelId" id="modelId" />
						<div class="widget">
							<div class="navbar">
								<div class="navbar-inner">
									<h6>Model Deployment</h6>
								</div>
							</div>
							<div class="well">
								<div class=" control-group">
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Model Name</label>
										</div>
										<div class="span7">
											<input class="span12 validate[required]" data-errormessage-value-missing="Model Name is required!" type="text" size="50"
												name="modelName" id="modelName"
												placeholder="Model Name" />
										</div>
									</div>
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Model Description</label>
										</div>
										<div class="span7">
											<textarea id="modelDescription" name="modelDescription" class="span12 validate[required]"
												data-errormessage-value-missing="Model Description is required!" rows="3" cols="50" placeholder="Model Description"></textarea>
										</div>
									</div>
								</div>
								<div class=" control-group">
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Version Number</label>
										</div>
										<div class="span7">
											<input class="span12 validate[required]" data-errormessage-value-missing="Version is required!" type="text" size="50"
												name="version" id="version"
												placeholder="Version" />
										</div>
									</div>
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Version Description</label>
										</div>
										<div class="span7">
											<textarea id="versionDescription" name="versionDescription" class="span12 validate[required]"
												data-errormessage-value-missing="Version Description is required!" rows="3" cols="50" placeholder="Version Description"></textarea>
										</div>
									</div>
								</div>
								<div class=" control-group">
									<div class="span6">
										<div class="span1">
											<input type="checkbox" name="activate" value="true" id="activate" />
										</div>
										<div class="span11">
											<label class="control-label span12">Activate</label>
										</div>
									</div>
								</div>
								<div class=" control-group">
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Data Prep Context</label>
										</div>
										<div class="span7">
											<select class="span12 validate[required]" data-errormessage-value-missing="Data Prep Context is required!" id="dataPrepContext"
												name="dataPrepContext">
     											<option value="">---Select---</option>
												<option value="pyspark">Pyspark</option>
												<option value="sparkjava">Spark java</option>
												<option value="sql">SQL</option>
											</select> <span id="frequency-error"></span>
										</div>
									</div>
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Upload Data
												preparation ZIP package</label>
										</div>
										<div class="span7">
											<input type="file" id="uploadDataPreparation"
												name="uploadDataPreparation" class="span12 validate[required]" data-errormessage-value-missing="Upload Data Preparation is required!" rows="3"
												cols="50" placeholder="Upload Data Preparation"></input>
										</div>
									</div>
								</div>
								<div class=" control-group">
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Model Context</label>
										</div>
										<div class="span7">
											<select class="span12 validate[required]" data-errormessage-value-missing="Model Context is required!" id="modelContext" name="modelContext">
												<option value="">---Select---</option>
												<option value="pyspark">Pyspark</option>
												<option value="python">Python</option>
												<option value="pmml">PMML</option>
												<option value="R">R</option>
											</select> <span id="frequency-error"></span>
										</div>
									</div>
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Upload Model
												execution ZIP package</label>
										</div>
										<div class="span7">
											<input type="file" id="uploadModelExecution"
												name="uploadModelExecution" class="span12 validate[required]" data-errormessage-value-missing="Upload Model Execution is required!" rows="3"
												cols="50" placeholder="uploadModelExecution"></input>
										</div>
									</div>
								</div>
								<div class=" control-group">
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">View Generation
												Context</label>
										</div>
										<div class="span7">
											<select class="span12 validate[required]" data-errormessage-value-missing="View Generation Context is required!" id="viewGenerationContext"
												name="viewGenerationContext">
												<option value="">---Select---</option>
												<option value="pyspark">Pyspark</option>
												<option value="python">Python</option>
												<option value="R">R</option>
											</select> <span id="frequency-error"></span>
										</div>
									</div>
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Upload View
												Generation ZIP package</label>
										</div>
										<div class="span7">
											<input type="file" id="uploadViewGeneration"
												name="uploadViewGeneration" class="span12 validate[required]" data-errormessage-value-missing="Upload View Generation is required!" rows="3"
												cols="50" placeholder="Upload View Generation"></input>
										</div>
									</div>
								</div>

								<div class=" control-group">
									<div class="span12">
										<div class="span12">
											<label class="control-label span12"><h5>Scheduling
													Information</h5></label>
										</div>
									</div>
								</div>
								<div class=" control-group">
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Start Date</label>
										</div>
										<div class="span7">
											<input class="span12 validate[required]" data-errormessage-value-missing="Start Date is required!" type="text" size="50" name="startDate"
												id="startDate" placeholder="dd/MM/yyyy" />
										</div>
									</div>
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">End Date</label>
										</div>
										<div class="span7">
											<input class="span12 validate[required]" data-errormessage-value-missing="End Date is required!" type="text" size="50" name="endDate"
												id="endDate" placeholder="dd/MM/yyyy" />
										</div>
									</div>
									<input type="hidden" name="scheduleInterval" id="scheduleInterval" />
									<!-- <div class="span6">
										<div class="span5">
											<label class="control-label span12">Schedule Interval</label>
										</div>
										<div class="span7">
											<select class="span12" id="scheduleInterval"
												name="scheduleInterval">
												<option>None</option>
												<option value="minutes">Minutes</option>
												<option value="hourly">Hourly</option>
												<option value="daily">Daily</option>
												<option value="weekly">Weekly</option>
												<option value="monthly">Monthly</option>
												<option value="yearly">Yearly</option>
											</select>
										</div>
									</div> -->
								</div>
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
									<div class="span6" id="cronDiv" style="display:none;">
										<div class="span5">
											<label class="control-label span12">Segment Run Frequency Cron Expression</label>
										</div>
										<div class="span7" id="cronValue">
											
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
												name="selectOne" class="cbr cbr-success" value="which">
												The <select class="form-control radio-inline" id="which"
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
												</label>
											</div>
											<div class="span7">
												<label class="radio-inline"> <input class="span12"
													name="startTime" id="startTime" type="text"
													class="form-control timepicker" data-template="dropdown"
													data-show-seconds="false" data-default-time="00:00"
													data-show-meridian="true" data-minute-step="1"
													value="00:00" />
												</label>
											</div>
										</div>
									</div>
								</div>


								<div class=" control-group">
									<div class="span12">
										<div class="span12">
											<label class="control-label span12"><h5>Failure
													Notification</h5></label>
										</div>
									</div>
								</div>



								<div class=" control-group">
									<div class="span6">
										<div class="span1">
											<input class="validate[minCheckbox[1]] checkbox" data-prompt-position="topRight:+30,-5" type="checkbox" name="emailOn" value="failure" />
										</div>
										<div class="span11">
											<label class="control-label span12">Email_on_failure</label>
										</div>
									</div>
									<div class="span6">
										<div class="span5">
											<label class="control-label span12">Email Id</label>
										</div>
										<div class="span7">
											<input class="span12 validate[required,custom[email]]" data-errormessage-value-missing="Email Id is required!" type="text" id="emailId" name="emailId"
												class="span12" placeholder="Email Id" />
										</div>
									</div>
								</div>
								<div class=" control-group">
									<div class="span6">
										<div class="span1">
											<input class="validate[minCheckbox[1]] checkbox" data-prompt-position="topRight:+30,-5" type="checkbox" name="emailOn" value="retry" />
										</div>
										<div class="span11">
											<label class="control-label span12">Email_on_retry</label>
										</div>
									</div>
								</div>


								<div class=" control-group">
									<div class="span12">
										<div class="span12">
											<label class="control-label span12"><h5>Declaring
													Dependencies</h5></label></br> <label class="control-label span12"><h9>Task
												Dependency</h9></label>
										</div>
									</div>
								</div>
								<div class=" control-group">
									<div class="span6">
										<div class="span1">
											<input class="validate[minCheckbox[1]] checkbox" data-prompt-position="topRight:+30,-5" type="checkbox" name="taskDependency" value="profile" />
										</div>
										<div class="span11">
											<label class="control-label span12">Profile</label>
										</div>
									</div>
								</div>
								<div class=" control-group">
									<div class="span6">
										<div class="span1">
											<input class="validate[minCheckbox[1]] checkbox" data-prompt-position="topRight:+30,-5" type="checkbox" name="taskDependency"
												value="usageData" />
										</div>
										<div class="span11">
											<label class="control-label span12">Usage Data</label>
										</div>
									</div>
								</div>
								<div class=" control-group">
									<div class="span6">
										<div class="span1">
											<input class="validate[minCheckbox[1]] checkbox" data-prompt-position="topRight:+30,-5" type="checkbox" name="taskDependency" value="topUp" />
										</div>
										<div class="span11">
											<label class="control-label span12">Topup</label>
										</div>
									</div>
								</div>

							</div>
						</div>
							<div align="center">
								<b><span class="text-success successMsg"
									style="display: none" id="successMsg"></span></b> <b><span
									class="text-error failureMsg" style="display: none"
									id="failureMsg"></span></b>
							</div>
					</form>
					<div class="row-fluid">
						<div class="control-group">
							<div class="span2 center">
								<button type="submit" id="execute"
									class="btn btn-block btn-success" data-actionType="execute">Save &amp; Execute</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>