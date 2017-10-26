<%@ page import="org.apache.shiro.SecurityUtils" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ page isELIgnored="false"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Registration Confirmation Page</title>
</head>
<body>
	<div id="content">
		<div class="wrapper">
			message : <shiro:principal/> <br /> <br /> <a
				href="<c:url value='/login/list' />">List of All Employees</a> <br /> <br />
			<a href="<c:url value='/logout' />">Log Out1</a>
		</div>
	</div>

</body>

</html>