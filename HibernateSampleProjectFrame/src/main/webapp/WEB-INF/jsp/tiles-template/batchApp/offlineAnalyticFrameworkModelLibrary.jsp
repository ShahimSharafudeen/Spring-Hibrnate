<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page isELIgnored="false"%>

<spring:url value="/secure/offlineAnalyticFrameworkModelLibrary" var="listLibrary_Url" />

<script
	src="${pageContext.request.contextPath}/resources/js/sift/offlineanalytics/model_library.js"></script>
<c:set var="reader_role" value='false' />
<jsp:useBean id="dateObject" class="java.util.Date" />
<div id="content">
	<div class="wrapper">
		<div class="crumbs">
			<ul id="breadcrumbs" class="breadcrumb">
				<li><a href="${listLibrary_Url}"> List Of Model Library </a></li>
			</ul>
		</div>
		<div class="page-header">
			<div class="page-title">
				<h5>Offline Analytic framework</h5>
				<span> <h6><b>Model Library</b></h6>
				</span>
			</div>
		</div>
		<div class="actions-wrapper">
			<div align="center">
				<c:if test="${not empty modelId}">
					<p class="text-success" id="successMsg">
						<strong>Analytical Task with id '${modelId}' has been updated successfully</strong>
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
					<table id="modelLibraryTable"
						class="table table-striped table-bordered table-condensed">
						<thead>
							<tr>
								<th width="2%">Sl.No.</th>
								<th width="20%" class="bd">Task Id</th>
								<th width="10%" class="bd">Name</th>
								<th width="10%" class="bd">Description</th>
								<th width="2%" class="bd">Version</th>
								<th width="2%" class="bd">Description</th>
								<th width="5%" class="bd">Insights</th>
								<th width="5%" class="bd">Validation</th>
								<th width="5%" class="bd">Last_Executed_Status</th>
								<th width="5%" class="bd">Activate</th>
								<th width="5%" class="bd">Update</th>
							</tr>
						</thead>
						<tbody>
							<c:set var="count" value="0" />
							<c:forEach items="${ModelLibraryList}" var="modelLibrary">
								<c:set var="count" value="${count + 1}" />
								<tr class="gradeX">
									<td>${count}</td>
									<td>${modelLibrary.modelId}</td>
									<td>${modelLibrary.modelName}</td>
									<td>${modelLibrary.modelDescription}</td>
									<td>${modelLibrary.version}</td>
									<td>${modelLibrary.versionDescription}</td>
									<td><a href="#?analysisTask=${modelLibrary.modelId}">Insights</a></td>
									<td><a href="#?analysisTask=${modelLibrary.modelId}">Validation</a></td>
									<td>Pending</td>
									<td>Activate</td>
									<td><a href="${pageContext.request.contextPath}/secure/offlineAnalyticFrameworkModelDeployment?id=${modelLibrary.id}">edit</a></td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>