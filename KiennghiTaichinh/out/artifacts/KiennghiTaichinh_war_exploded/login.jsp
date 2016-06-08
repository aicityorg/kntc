<%--
  Created by IntelliJ IDEA.
  User: thanhtn10
  Date: 3/23/16
  Time: 11:42 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Login CSKH Summary</title>
    <head>
        <META http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/style/style.css" />
        <script src="${pageContext.request.contextPath}/javascript/jquery.min.js"></script>
        <script src="${pageContext.request.contextPath}/javascript/jquery-ui.js"></script>
        <script type="text/javascript" src="./javascript/admin.js"></script>
    </head>
</head>
<body>
<div class="logincontent">
    <form action="loginServlet" method="post">
        <fieldset style="width: 300px; border: 1px solid #2BA4A4;">
            <legend> Login to App </legend>
            <table>
                <tr>
                    <td>User ID</td>
                    <td><input type="text" name="username" required="required" /></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input type="password" name="userpass" required="required" /></td>
                </tr>
                <tr>
                    <td><input type="submit" class="link-button" value="Login" /></td>
                </tr>
            </table>
        </fieldset>
    </form>
</div>

</body>
</html>