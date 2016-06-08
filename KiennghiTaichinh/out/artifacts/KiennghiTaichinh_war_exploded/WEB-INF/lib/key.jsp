<%--
  Created by IntelliJ IDEA.
  User: thanhtn10
  Date: 3/23/16
  Time: 11:41 AM
  To change this template use File | Settings | File Templates.
--%>
<%--
  Created by IntelliJ IDEA.
  User: thanhtn10
  Date: 3/23/16
  Time: 2:16 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fi">
<head>
  <META http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/style/style.css" />
  <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/style/style000.css" />
  <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/style/jquery.datetimepicker.css" />
  <script src="${pageContext.request.contextPath}/javascript/jquery-1.11.1.min.js"></script>
  <script src="${pageContext.request.contextPath}/javascript/jquery-ui.min.js"></script>
  <script src="${pageContext.request.contextPath}/javascript/jquery.datetimepicker.full.js"></script>
  <script src="${pageContext.request.contextPath}/javascript/ticker00.js"></script>
  <script type="text/javascript" src="./javascript/admin.js"></script>
  <script>
    $( document ).ready(function() {

      getkeywordfile();
    });

  </script>
</head>
<body>
<div id="updatekey">
  <div class="keywordlabel">Nội dung</div>

  <textarea id="keywordupdate" name="textarea"></textarea>


</div>

<div id="buttonlistkeywordupdate">
  <input type="button" id="btnignorekey" class="link-button-red" onclick="ignore()"value="Bỏ qua"/>
  <input type="button" id="btnupdatekey" class="link-button" onclick="updatekeywordfile()"value="Cập nhật"/>
</div>

</body>
</html>