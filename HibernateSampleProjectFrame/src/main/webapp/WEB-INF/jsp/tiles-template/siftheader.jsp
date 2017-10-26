<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored="false" %>
<script src="${pageContext.request.contextPath}/resources/js/sift/sift_header.js"></script>
<%-- <script type="text/javascript" src="<c:out value="${jiraTicketUrl}"/>"></script> --%>

<spring:url value="/logout" var="logout_Url" />
<spring:url value="/secure/profile" var="profile_Url" />
<spring:url value="/secure/geofence" var="geofence_Url" />
<spring:url value="/secure/administration" var="administration_Url" />
<spring:url value="/secure/program" var="program_Url" />
<spring:url value="/secure/siftField" var="siftField_Url" />
<spring:url value="/secure/event" var="event_Url" />
<spring:url value="/secure/indicator" var="indicator_Url" />
<spring:url value="/secure/insights" var="insights_Url" />
<spring:url value="/secure/siftFunction" var="siftFunction_Url" />
<spring:url value="/secure/dataLoader" var="dataLoader_Url" />

<spring:url value="resources/images/testImage.png" var="brand_Img"/>
<div class="fixed dasboard">
	<c:set var="brand_url" value="" />
	<%-- <sec:authorize access="hasRole('ROLE_SIFT_BUSINESS_MANAGER') or hasRole('ROLE_SIFT_MARKETING_USER') or hasRole('ROLE_SIFT_OPERATIONS_MANAGER') or hasRole('ROLE_SIFT_SUPER_ADMIN') or hasRole('ROLE_SIFT_READER')" >
		<c:set var="brand_url" value="${insights_Url}" />
	</sec:authorize>
	<sec:authorize access="hasRole('ROLE_SIFT_DEVELOPER') or hasRole('ROLE_SIFT_APPROVER')" >
		<c:if test="${brand_url == ''}">
			<c:set var="brand_url" value="${indicator_Url}" />
		</c:if>
	</sec:authorize>
	<sec:authorize access="hasRole('ROLE_SIFT_ADMIN')" >
		<c:if test="${brand_url == ''}">
			<c:set var="brand_url" value="${administration_Url}" />
		</c:if>
	</sec:authorize> --%>
	
	<c:if test="${brand_url == ''}">
		<c:set var="brand_url" value="${pageContext.request.contextPath}" />
	</c:if>
	
	<a href="${brand_url}" class="logo">
		<img src="${pageContext.request.contextPath}/${brand_Img}" />
	</a>
		
	<ul class="menu menu2">
		<%-- <sec:authorize access="hasRole('ROLE_SIFT_BUSINESS_MANAGER') or hasRole('ROLE_SIFT_MARKETING_USER') or hasRole('ROLE_SIFT_OPERATIONS_MANAGER') or hasRole('ROLE_SIFT_SUPER_ADMIN') or hasRole('ROLE_SIFT_READER')" >
			<li id="nav1" class="">
				<a href="${insights_Url}"><spring:message code="common.label.INSIGHTS" /></a>
				<i class="icon-signal"></i>
			</li>
		</sec:authorize>
		<sec:authorize access="hasRole('ROLE_SIFT_DEVELOPER') or hasRole('ROLE_SIFT_MARKETING_USER') or hasRole('ROLE_SIFT_SUPER_ADMIN') or hasRole('ROLE_SIFT_APPROVER') or hasRole('ROLE_SIFT_READER')" >
			<li id="nav4" class="">
				<a href="${indicator_Url}"><spring:message code="common.label.INDICATORS" /></a>
				<i class="icon-list-ul"></i>
			</li>
		</sec:authorize>
<!-- 		<sec:authorize access="hasRole('ROLE_SIFT_DEVELOPER') or hasRole('ROLE_SIFT_MARKETING_USER') or hasRole('ROLE_SIFT_SUPER_ADMIN') or hasRole('ROLE_SIFT_READER')" >
			<li id="nav5" class="">
				<a href="${event_Url}"><spring:message code="common.label.EVENTS" /></a>
				<i class="icon-retweet"></i>
			</li>
		</sec:authorize> -->
 	 	<sec:authorize access="hasRole('ROLE_SIFT_DEVELOPER') or hasRole('ROLE_SIFT_MARKETING_USER') or hasRole('ROLE_SIFT_SUPER_ADMIN')  or hasRole('ROLE_SIFT_APPROVER') or hasRole('ROLE_SIFT_READER')" >
			<li id="nav6" class="">
				<a href="${program_Url}"><spring:message code="common.label.PROGRAMS" /></a>
				<i class="icon-wrench"></i>
			</li>
		</sec:authorize>
		<sec:authorize access="hasRole('ROLE_SIFT_DEVELOPER') or hasRole('ROLE_SIFT_MARKETING_USER') or hasRole('ROLE_SIFT_SUPER_ADMIN') or hasRole('ROLE_SIFT_APPROVER') or hasRole('ROLE_SIFT_READER')" >
			<li id="nav7" class="">
				<a href="${geofence_Url}"><spring:message code="common.label.GEOFENCE" /></a>
				<i class="icon-map-marker"></i>
			</li>
		</sec:authorize>
		<sec:authorize access="hasRole('ROLE_SIFT_ADMIN') or hasRole('ROLE_SIFT_SUPER_ADMIN')" >
			<li id="nav8" class="">
				<a href="${administration_Url}"><spring:message code="common.label.ADMINISTRATION" /></a>
				<i class="icon-user"></i>
			</li>
		</sec:authorize>
		<sec:authorize access="hasRole('ROLE_SIFT_DEVELOPER') or hasRole('ROLE_SIFT_MARKETING_USER') or hasRole('ROLE_SIFT_SUPER_ADMIN') or hasRole('ROLE_SIFT_APPROVER') or hasRole('ROLE_SIFT_READER')" >
			<li id="nav2" class="">
				<a href="${siftField_Url}"><spring:message code="common.label.FIELDS" /></a>
				<i class="icon-info-sign"></i>
			</li>
		</sec:authorize>
		<sec:authorize access="hasRole('ROLE_SIFT_DEVELOPER') or hasRole('ROLE_SIFT_MARKETING_USER') or hasRole('ROLE_SIFT_SUPER_ADMIN') or hasRole('ROLE_SIFT_APPROVER') or hasRole('ROLE_SIFT_READER')" >
			<li id="nav3" class="">
				<a href="${siftFunction_Url}"><spring:message code="common.label.FUNCTIONS" /></a>
				<i class="icon-link"></i>
			</li>
		</sec:authorize>
		<sec:authorize access="hasRole('ROLE_SIFT_TESTER') or hasRole('ROLE_SIFT_SUPER_ADMIN')" >
			<li id="nav9" class="">
				<a href="${dataLoader_Url}"><spring:message code="common.label.DATALOADER" /></a>
				<i class="icon-pushpin"></i>
			</li>
		</sec:authorize>
	</ul>
	<ul class="top-menu" style="margin-top: -66px;">
		<li class="dropdown">
			<a class="user-menu" data-toggle="dropdown">
				<span>${fn:escapeXml(siftUser.firstName)}</span>
			</a>
			<ul id="first-nav" class="dropdown-menu">
				<li>
					<a href="${profile_Url}">
						<spring:message code="common.label.Profile"/>
					</a>
				</li>
				<c:choose>
					<c:when test="${IsSSOLoginAsOtherUser == 'Y' }">
						<c:set var="logout_Url" value="${logout_Url}?reason=SSO_LOGOUT"></c:set>
					</c:when>
					<c:otherwise>
						<c:set var="logout_Url" value="${logout_Url}"></c:set>
					</c:otherwise>
				</c:choose>
				<li>
					<form:form action="${logout_Url}" method="post">
						<button type="submit" class="btn btn-block btn-link" style="width: 40px; display: block; text-align: center;">
							<span style="display: block; clear: both; line-height: 21px; white-space: nowrap; color: #525151; font-size: 11px; font-weight: bold;"><spring:message code="common.label.SignOff"/></span>
						</button>
					</form:form>
				</li>
			</ul>
		</li>
		<li class="dropdown">
			<a class="support" data-toggle="dropdown"><spring:message code="common.label.Support"/>
				<img src="${pageContext.request.contextPath}/resources/images/suport-tag.png" alt="suport-tag" />
			</a>
			<ul id="third-nav" class="dropdown-menu">
				<li id="siftJIRATrigger">
					<a>
						<spring:message code="common.label.Tickets"/>
					</a>
				</li>
				<sec:authorize access="hasRole('ROLE_SIFT_ADMIN')" >
			 		<li>
			 			<a href="${administration_Url}">
							<spring:message code="administration.label.Administration"/>
						</a>
					</li>
				</sec:authorize>
				<li>
					<a id="helpId" href="">
						<spring:message code="common.label.Help"/>
					</a>
				</li>
			</ul>
		</li> --%>
	</ul>
</div>