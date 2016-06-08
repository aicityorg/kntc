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
  <div id="knvb"><a href="${pageContext.request.contextPath}/knvb.jsp">Kiến nghị văn bản</a></div>
  <div id="timkiem"><a href="${pageContext.request.contextPath}/search.jsp">Tìm kiếm</a></div>
</div>
<div class="importdatalabel">
  Kiến nghị xử lý sai phạm cá nhân, tổ chức
</div>


<div id="importdata">
  <div class="namtc" >Năm tài chính: <input type="text" id="datetimepickerfrom" onclick="clickdatetimefrom()"></div>
  <div id='parentfield'>
    <div id="ckt_div">
      Cuộc kiểm toán:
      <select id="ckt_select" onchange="onSummaryOptionChange()">
        <option>Cuộc 1</option>
        <option>Cuộc 2</option>
        <option>Cuộc 3</option>
        <option>...</option>
      </select>
    </div>
    <div id="ddkt_div">
      Địa điểm kiểm toán:
      <select id="ddkt_select" onchange="onSummaryOptionChange()">
        <option>Yên Bái</option>
        <option>Phú Thọ</option>
        <option>Lào Cai</option>
        <option>...</option>
      </select>
    </div>
    <div id="lhkn_div">
      Loại hình kiến nghị:
      <select id="lhkn_select" onchange="onSummaryOptionChange()">
        <option>Kiến nghị tài chính</option>
        <option>Kiến nghị sửa đổi, hủy bỏ văn bản</option>
        <option>Kiến nghị sai phạm cá nhân, tổ chức</option>
      </select>
    </div>

    <div class="kntc"  >
     <div class="kntcgroup">Kiến nghị tài chính</div>
      <div id="kmcha_div">
        Khoản mục cha:
        <select id="kmcha_select">
          <option>Tăng thu NSNN</option>
          <option>Tăng thu khác NSNN</option>
          <option>Giảm chi thường xuyên</option>
          <option>Giảm chi đầu tư xây dựng</option>
          <option>Xử lý nợ đọng, vay tạm ứng, ghi chi-ghi thu</option>
        </select>
      </div>
      <div id="kmcon_div">
        Khoản mục con:
        <select id="kmcon_select">
          <option>Thu thuế nội địa</option>
          <option>Thu thuế XNK</option>
          <option>Thu phí, lệ phí</option>
          <option>Thu tiền sử dụng đất</option>
          <option>...</option>
        </select>
      </div>

      <div id="lsltc_div">
        Loại số liệu tài chính:
        <select id="lsltc_select">
          <option>Số liệu ban đầu</option>
          <option>Điều chỉnh tăng</option>
          <option>Điều chỉnh giảm</option>
        </select>
      </div>
      <div class='kntclabel' id="ndkntc" >
        Nội dung:
        <textarea id="ndkntctext" name="textarea" ></textarea>
      </div>
      <div class='kntcmoneylabel' id="ndkntcmoney" >
        Số tiền:
        <textarea id="ndkntcmoneytext" name="textarea" ></textarea>
      </div>
    </div>

    <div class="ctthkntc">
      <div class="ctthkntcgroup">Nhập mới thông tin chứng từ thực hiện kiến nghị tài chính</div>

      <div class="sochungtulabel">
        Số chứng từ:
        <textarea id="sochungtutext" name="textarea" ></textarea>
      </div>

      <div class="ngaynoplabel" >Ngày nộp: <input type="text" id="kntc_ngaynop" onclick="clickdatetimengaynop()"></div>

      <div class="khobaclabel">
        Tên kho bạc nộp:
        <textarea id="khobactext" name="textarea" ></textarea>
      </div>

      <div class="ctthmoneylabel" id="ndctthmoney" >
        Số tiền:
        <textarea id="ndctthmoneytext" name="textarea" ></textarea>
      </div>
    </div>
  </div>
</div>

<div class="buttonlist">
  <input type="button" class="link-button-red" onclick="ignore()"value="Bỏ qua"/>
  <input type="button" class="link-button" onclick="postkntc()"value="Thêm"/>
</div>

</body>
</html>