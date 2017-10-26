<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page isELIgnored="false"%>

<html>

<head>

<style>
.error {
	color: #ff0000;
}
</style>

</head>

<body>
	<div id="content">
		<div class="wrapper">

			<h2>Registration Form</h2>

			<form:form method="POST" action="reg" modelAttribute="employee">
				<form:input type="hidden" path="id" id="id" />
				<table>
					<tr>
						<td><label for="name">Name: </label></td>
						<td><form:input path="name" id="name" /></td>
						<td><form:errors path="name" cssClass="error" /></td>
					</tr>

					<tr>
						<td><label for="adress">Address: </label></td>
						<td><form:input path="address" id="address" /></td>
						<td><form:errors path="address" cssClass="error" /></td>
					</tr>

					<tr>
						<td><label for="salary">Salary: </label></td>
						<td><form:input path="salary" id="salary" /></td>
						<td><form:errors path="salary" cssClass="error" /></td>
					</tr>

					<tr>
						<td><label for="ssn">SSN: </label></td>
						<td><form:input path="ssn" id="ssn" /></td>
						<td><form:errors path="ssn" cssClass="error" /></td>
					</tr>
					
					<tr>
						<td><label for="password">Password: </label></td>
						<td><form:password path="password" id="password" /></td>
						<td><form:errors path="password" cssClass="error" /></td>
					</tr>

					<tr>
						<td colspan="3"><c:choose>
								<c:when test="${edit}">
									<input type="submit" value="Update" />
								</c:when>
								<c:otherwise>
									<input type="submit" value="Register" />
								</c:otherwise>
							</c:choose></td>
					</tr>
				</table>
			</form:form>
		</div>
	</div>
</body>
</html>