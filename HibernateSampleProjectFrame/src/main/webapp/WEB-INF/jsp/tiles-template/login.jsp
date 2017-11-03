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

			<h2>Login Page</h2>
			<h3>${message}</h3>

			<form:form method="POST" action="${pageContext.request.contextPath}/login" modelAttribute="loginModel">
			<form:input type="hidden" path="id" id="id" />
				<table>
					<tr>
						<td><label for="name">Name: </label></td>
						<td><form:input path="name" id="name" /></td>
						<td><form:errors path="name" cssClass="error" /></td>
					</tr>

					<tr>
						<td><label for="password">Password: </label></td>
						<td><form:password path="password" id="password" /></td>
						<td><form:errors path="password" cssClass="error" /></td>
					</tr>

					<tr>
						<td colspan="3">
									<input type="submit" value="Login" />
						</td>
					</tr>
				</table>
			</form:form>
		</div>
	</div>
</body>
</html>