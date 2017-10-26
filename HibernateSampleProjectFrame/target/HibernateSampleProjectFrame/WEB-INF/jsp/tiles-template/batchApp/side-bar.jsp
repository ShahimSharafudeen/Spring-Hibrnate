<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ page isELIgnored="false"%>

<spring:url value="/secure/newSegmentCreation" var="newSegment" />
<spring:url value="/secure/listOfSegments" var="listOfSegments" />
<spring:url value="/secure/offlineAnalyticFrameworkModelDeployment"
	var="offlineAnalyticFrameworkModelDeployment" />
<spring:url value="/secure/offlineAnalyticFrameworkModelLibrary"
	var="offlineAnalyticFrameworkModelLibrary" />

<%-- <div id="sidebar">
	<div class="sidebar-tabs">
		<div id="general">
			<ul class="navigation widget">
				<li class="dropdown"><a class="support" data-toggle="dropdown">BatchApp Segment</a>
					<ul class="dropdown-menu">
						<li><a href="${newSegment}"> <i class="icon-wrench"></i>
								Create New Segment
						</a></li>
						<li><a href="${listOfSegments}"> <i class="icon-wrench"></i>
								List of Segments
						</a></li>
					</ul>
				</li>
				<li class="dropdown"><a class="support" data-toggle="dropdown">Offline
						Analytic Framework</a>
					<ul class="dropdown-menu">
						<li><a href="${offlineAnalyticFrameworkModelDeployment}">
								<i class="icon-wrench"></i> Model Deployment
						</a></li>
						<li><a href="${offlineAnalyticFrameworkModelLibrary}"> <i
								class="icon-wrench"></i> Model Library
						</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</div> --%>

<div id="sidebar">
	<div class="sidebar-tabs">
		<div id="general">
			<ul class="navigation widget">
				<li id="newModelLink">
					<a href="${offlineAnalyticFrameworkModelDeployment}">
						<%-- <img src="${icon1_sidebar}"/>
						<spring:message code="programManagement.label.Program" /> --%>
						<i class="icon-wrench"></i> New Model Deployment
					</a>
				</li>
				<li id="modelLibraryLink">
					<a href="${offlineAnalyticFrameworkModelLibrary}">
						<%-- <img src="${icon1_sidebar}"/>
						<spring:message code="programManagement.label.Program" /> --%>
						<i class="icon-wrench"></i> Model Library
					</a>
				</li>
			</ul>
		</div>
	</div>
</div>