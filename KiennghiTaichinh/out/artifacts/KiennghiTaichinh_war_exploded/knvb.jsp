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
  <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/style/jquery-ui.css" />
  <script src="${pageContext.request.contextPath}/javascript/jquery-1.11.1.min.js"></script>
  <script src="${pageContext.request.contextPath}/javascript/jquery-ui.min.js"></script>
  <script src="${pageContext.request.contextPath}/javascript/ticker00.js"></script>
  <script type="text/javascript" src="${pageContext.request.contextPath}/javascript/admin.js"></script>
  <script src="${pageContext.request.contextPath}/javascript/jquery-1.10.2.js"></script>
  <script src="${pageContext.request.contextPath}/javascript/jquery-ui.js"></script>


  <script>
    $( document ).ready(function() {



    });
  </script>
</head>
<body>
<div class="controlpanel">
  <div id="cnsp"><a href="${pageContext.request.contextPath}/cnsp.jsp">Cá nhân sai phạm</a></div>
  <div id="kntc"><a href="${pageContext.request.contextPath}/kntc.jsp">Kiến nghị tài chính</a></div>
  <div id="timkiem"><a href="${pageContext.request.contextPath}/search.jsp">Tìm kiếm</a></div>
</div>
<div class="importdatalabel">
  Kiến nghị sửa đổi, hủy bỏ văn bản
</div>


<div id="importdata">
  <div class="namtc" >Năm tài chính: <input type="text" id="datetimepickerfrom" onclick="clickdatetimefrom()"></div>
  <div id='parentfield'>
    <div id="ckt_div">
      Cuộc kiểm toán:
      <select id="ckt_select">
        <option>Cuộc 1</option>
        <option>Cuộc 2</option>
        <option>Cuộc 3</option>
        <option>...</option>
      </select>
    </div>
    <div id="ddkt_div">
      Địa điểm kiểm toán:
      <select id="ddkt_select" >
        <option>Yên Bái</option>
        <option>Phú Thọ</option>
        <option>Lào Cai</option>
        <option >...</option>
      </select>
    </div>
    <div id="lhkn_div">
      Loại hình kiến nghị:
      <select id="lhkn_select" >
        <option>Kiến nghị sửa đổi, hủy bỏ văn bản</option>
        <option>Kiến nghị sai phạm cá nhân, tổ chức</option>
        <option>Kiến nghị tài chính</option>
      </select>
    </div>
    <div class='knsplabel' id="knsplb" >
      Nội dung:
      <textarea class="txtimport"  id="ndknvb" name="textarea" ></textarea>
    </div>
  </div>
</div>

<div class="buttonlist">
  <input type="button" class="link-button-red" onclick="ignore()"value="Bỏ qua"/>
  <input type="button" class="link-button" onclick="postknvb()"value="Thêm"/>
</div>
</body>
</html>