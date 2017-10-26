<%@ page import="org.apache.shiro.SecurityUtils"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<%@ page isELIgnored="false"%>

<spring:url value="/welcome" var="HomePage" />
<spring:url value="/login/list" var="ListOfEmployees" />
<spring:url value="/reg" var="RegEmployees" />
<spring:url value="/login" var="LoginEmployees" />
<spring:url value="/logout" var="LogoutEmployees" />
<spring:url value="/login/success" var="EmployeesProfile" />

<div id="sidebar">
	<div class="sidebar-tabs">
		<div id="general">
			<ul class="navigation widget">

				<shiro:authenticated>
					<li id="modelLibraryLink"><a href="${EmployeesProfile}"> <i
							class="icon-wrench"></i> Profile Page
					</a></li>
					<li id="modelLibraryLink"><a href="${ListOfEmployees}"> <i
							class="icon-wrench"></i> List Of Employees
					</a></li>
					<li id="modelLibraryLink"><a href="${LogoutEmployees}"> <i
							class="icon-wrench"></i> Log Out
					</a></li>
				</shiro:authenticated>
				<shiro:notAuthenticated>
					<li id="newModelLink"><a href="${HomePage}"> <i
							class="icon-wrench"></i> Home Page
					</a></li>
					<li id="modelLibraryLink"><a href="${RegEmployees}"> <i
							class="icon-wrench"></i> New Employee
					</a></li>
					<li id="modelLibraryLink"><a href="${LoginEmployees}"> <i
							class="icon-wrench"></i> Login Employee
					</a></li>
				</shiro:notAuthenticated>
			</ul>
		</div>
	</div>
</div>