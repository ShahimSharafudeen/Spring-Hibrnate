<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page isELIgnored="false"%>

<spring:url value="/secure/listOfSegments" var="listPrograms_Url" />
<spring:url value="/secure/listOfSegments" var="listProgram_Url" />

<script
	src="${pageContext.request.contextPath}/resources/js/sift/batchApp/list_segment.js"></script>
<c:set var="reader_role" value='false' />
<jsp:useBean id="dateObject" class="java.util.Date" />
<div id="content">
	<div class="wrapper">
		<div class="crumbs">
			<ul id="breadcrumbs" class="breadcrumb">
				<li><a href="${listPrograms_Url}"> List Of Segments </a></li>
				<li><a href="${listProgram_Url}"> List Of Segment </a></li>
			</ul>
		</div>
		<div class="page-header">
			<div class="page-title">
				<h5>List of All Segments</h5>
				<span> This is the list of Segments configured in the system.
				</span>
			</div>
		</div>
		<div class="actions-wrapper">
			<div align="center">
				<c:if test="${not empty successMessage}">
					<p class="text-success" id="successMsg">
						<strong>${successMessage}</strong>
					</p>
				</c:if>
				<p class="text-success" style="display: none" id="successMsg">
					<strong></strong>
				</p>
				<p class="text-error" style="display: none" id="failureMsg">
					<strong></strong>
				</p>
			</div>
			<div class="widget">
				<div class="table-overflow">
					<table id="programListTable"
						class="table table-striped table-bordered table-condensed">
						<thead>
							<tr>
								<th width="2%">Sl.No.</th>
								<th width="15%" class="bd">Name</th>
								<th width="8%" class="bd">Category</th>
								<th width="25%" class="bd">Description</th>
								<th width="20%" class="bd">Segment Run Start Date</th>
								<th width="20%" class="bd">Segment Run End Date</th>
								<th width="10%" class="bd">Actions</th>
							</tr>
						</thead>
						<tbody>
							<c:set var="count" value="0" />
							<c:forEach items="${SegmentList}" var="segment">
								<c:set var="count" value="${count + 1}" />
								<tr class="gradeX">
									<td>${count}</td>
									<td>${segment.name}</td>
									<td>${segment.category}</td>
									<td>${segment.description}</td>
									<td>${segment.creationStartDate}<%-- <jsp:setProperty name="dateObject" property="time" value="${segment.creationStartDate}" />									
										 <fmt:formatDate value="${dateObject}" pattern="dd/MM/yyyy HH:mm:ss" />  --%>
									</td>
									<td>${segment.creationEndDate}<%-- <jsp:setProperty name="dateObject" property="time" value="${segment.creationEndDate}" />									
 										<fmt:formatDate value="${dateObject}" pattern="dd/MM/yyyy HH:mm:ss" />  --%>
									</td>
									<td class="left"><c:set var="run" value="run" /> <c:set
											var="stoped" value="stoped" /> <c:set var="paused"
											value="paused" /> <c:choose>
											<c:when test="${segment.runStatus == run}">
												<button class="btn btn10" data-toggle="tooltip"
													title="RunSegment"
													id="copy-${segment.name},${segment.creationStartDate}_${segment.croninput.startTime}"
													type="button" style="display: none">
													<i class="icon-play"></i>
												</button>
												<button class="btn btn9" data-toggle="tooltip"
													title="PauseSegment" id="copy-${segment.name}"
													type="button">
													<i class="icon-pause"></i>
												</button>
												<button class="btn btn7" data-toggle="tooltip"
													title="StopSegment" id="stop-${segment.name}" type="button">
													<i class="icon-stop"></i>
												</button>
												<button class="btn btn6" data-toggle="tooltip"
													title="EditSegment" id="edit-${segment.name}" type="button"
													style="display: none">
													<i class="icon-cog"></i>
												</button>
												<button class="btn btn8" data-toggle="tooltip"
													title="DeleteSegment" id="delete-${segment.name}"
													type="button" style="display: none">
													<i class="icon-remove"></i>
												</button>
											</c:when>
											<c:when test="${segment.runStatus == paused}">
												<button class="btn btn10" data-toggle="tooltip"
													title="RunSegment"
													id="copy-${segment.name},${segment.creationStartDate}_${segment.croninput.startTime}"
													type="button">
													<i class="icon-play"></i>
												</button>
												<button class="btn btn9" data-toggle="tooltip"
													title="PauseSegment" id="copy-${segment.name}"
													type="button" style="display: none">
													<i class="icon-pause"></i>
												</button>
												<button class="btn btn7" data-toggle="tooltip"
													title="StopSegment" id="stop-${segment.name}" type="button">
													<i class="icon-stop"></i>
												</button>
												<button class="btn btn6" data-toggle="tooltip"
													title="EditSegment" id="edit-${segment.name}" type="button"
													style="display: none">
													<i class="icon-cog"></i>
												</button>
												<button class="btn btn8" data-toggle="tooltip"
													title="DeleteSegment" id="delete-${segment.name}"
													type="button" style="display: none">
													<i class="icon-remove"></i>
												</button>
											</c:when>
											<c:otherwise>
												<button class="btn btn10" data-toggle="tooltip"
													title="RunSegment"
													id="copy-${segment.name},${segment.creationStartDate}_${segment.croninput.startTime}"
													type="button">
													<i class="icon-play"></i>
												</button>
												<button class="btn btn9" data-toggle="tooltip"
													title="PauseSegment" id="copy-${segment.name}"
													type="button" style="display: none">
													<i class="icon-pause"></i>
												</button>
												<button class="btn btn7" data-toggle="tooltip"
													title="StopSegment" id="stop-${segment.name}" type="button"
													style="display: none">
													<i class="icon-stop"></i>
												</button>
												<button class="btn btn6" data-toggle="tooltip"
													title="EditSegment" id="edit-${segment.name}" type="button">
													<i class="icon-cog"></i>
												</button>
												<button class="btn btn8" data-toggle="tooltip"
													title="DeleteSegment" id="delete-${segment.name}"
													type="button">
													<i class="icon-remove"></i>
												</button>
											</c:otherwise>
										</c:choose></td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>