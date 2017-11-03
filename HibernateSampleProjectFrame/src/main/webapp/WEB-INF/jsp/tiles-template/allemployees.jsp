<%@ page import="org.apache.shiro.SecurityUtils" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ page isELIgnored="false"%>
<html>
<head>

<style>
tr:first-child {
	font-weight: bold;
	background-color: #C6C9C4;
}
</style>

</head>

<body>
	<div id="content">
		<div class="wrapper">
			<div class="widget">
				<div class="table-overflow">
					<h2>List of Employees</h2>
					<table id="programListTable"
						class="table table-striped table-bordered table-condensed">
						<thead>
							<tr>
								<td>NAME</td>
								<td>Address</td>
								<td>Salary</td>
								<td>SSN</td>
								<td></td>
							</tr>
						</thead>
						<tbody>
							<c:forEach items="${employees}" var="employee">
								<tr>
									<td>${employee.name}</td>
									<td>${employee.address}</td>
									<td>${employee.salary}</td>
									<td><a
										href="<c:url value='/login/edit-${employee.name}-employee' />">${employee.ssn}</a></td>
									<td><a
										href="<c:url value='/login/delete-${employee.name}-employee' />">delete</a></td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
<script>
	programListTable = $('#programListTable').DataTable({});
</script>