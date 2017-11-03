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
			<c:choose>
				<c:when test="${edit == 'true'}">
					<h2>Update Customer Profile Form</h2>
				</c:when>
				<c:otherwise>
					<h2>Customer Registration Form</h2>
				</c:otherwise>
			</c:choose>

			<form:form method="POST"
				action="${pageContext.request.contextPath}/${custReg}"
				modelAttribute="customer">
				<form:input type="hidden" path="id" id="id" />
				<table>
					<c:choose>
						<c:when test="${edit != 'true'}">
							<tr>
								<td><label for="name">Name: </label></td>
								<td><form:input path="name" id="name" /></td>
								<td><form:errors path="name" cssClass="error" /></td>
							</tr>
						</c:when>
					</c:choose>

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
						<td><label for="data">Data: </label></td>
						<td><form:input path="data" id="data" /></td>
						<td><form:errors path="data" cssClass="error" /></td>
					</tr>

					<tr>
						<td><label for="password">Password: </label></td>
						<td><form:password path="password" id="password" /></td>
						<td><form:errors path="password" cssClass="error" /></td>
					</tr>

					<tr>
						<td colspan="3"><c:choose>
								<c:when test="${edit == 'true'}">
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