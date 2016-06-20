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
    <link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/style/jquery-ui.css" />
    <script src="${pageContext.request.contextPath}/javascript/jquery-1.11.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/javascript/jquery-ui.min.js"></script>
    <script src="${pageContext.request.contextPath}/javascript/ticker00.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/javascript/admin.js"></script>
    <script src="${pageContext.request.contextPath}/javascript/jquery-1.10.2.js"></script>
    <script src="${pageContext.request.contextPath}/javascript/jquery-ui.js"></script>
    <script>
        $( document ).ready(function() {

       /*     getwarning();
            $('#txtimportkeyword').on('blur', function(e) {
                checksamekeyword();
                // your code here
            });*/
            defaultcontrolbeforeedit();
            displaysearchresultoption(false);

/*
            $("#searchvalue").keypress(function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    search();
                }
            });
            $("#typevalue").keypress(function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    search();
                }
            });


            var keyparam = getUrlParameter('key');
            if(keyparam.length > 0){

                $("#searchvalue").text( keyparam);
                var typeparam = getUrlParameter('type');
                document.getElementById("mysearchtype").value = typeparam;
                removeOptions(document.getElementById('searchresultresultoption'));
                insertOptions(keyparam, document.getElementById('searchresultresultoption'));
                onSearchResultOptionChange();
                //search();
            }
            var docidparam = getUrlParameter('docid');
            if(docidparam.length > 0){
                account = getUrlParameter('username');
                $("#searchvalue").text( docidparam);
                document.getElementById("mysearchtype").value = 'id';
                search();
                //search();
            }
            onchangedatetimedetail();
            autosave = false;
            checkkmdatefrom();
            checkkmdateto();*/
        });

    </script>
</head>
<body>

<div class="controlpanel">
    <div id="cnsp"><a href="${pageContext.request.contextPath}/cnsp.jsp">Cá nhân sai phạm</a></div>
    <div id="kntc"><a href="${pageContext.request.contextPath}/kntc.jsp">Kiến nghị tài chính</a></div>
    <div id="knvb"><a href="${pageContext.request.contextPath}/knvb.jsp">Kiến nghị văn bản</a></div>

</div>


<div class="search">
    <div class="searchlabel">Tìm kiếm theo:
        <select id="mysearchtype" >
            <option value="cnsp">Cá nhân sai phạm</option>
            <option value="kntc">Kiến nghị tài chính</option>
            <option value="kntcth">Kiến nghị tài chính thực hiện</option>
            <option value="knvb">Kiến nghị văn bản</option>
            <option value="searchall">Tất cả</option>
        </select>
    </div>
    <div class="namtclabel">Năm tài chính:</div>
    <div id="namtcvalue" name="textarea" contenteditable="true"></div>
    <div class="searchlabel">Từ khóa:</div>
    <div id="searchvalue" name="textarea" contenteditable="true"></div>
    <input type="button" class="search-button" onclick="search()"value="Tìm kiếm"/>
</div>


<div id="searchresultresult">
    <div class="searchresultresultlabel">Danh sách từ khóa liên quan tìm kiếm được:
        <select id="searchresultresultoption" onchange="onSearchResultOptionChange()">
            <option value="key">Từ khóa</option>
            <option value="id">ID</option>
        </select>
        <div id="totalsearch"></div>
    </div>
    <div id="updatedtime"> Cập nhật lúc 12h bởi cskh
    </div>
</div>

<div class="searchdetail">

    <div id="updatedata">
        <div id='parentfield'>

        </div>
    </div>

</div>

<div class="buttonlist" id="buttonlistupdate">
    <input type="button" id="btnignore" class="link-button-red" onclick="ignore()"value="Bỏ qua"/>
    <input type="button" id="btndelete" class="link-button-red" onclick="deletedata()"value="Xóa"/>

    <input type="button" id="btnupdate" class="link-button" onclick="updatedata()"value="Cập nhật"/>
<%--
    <input type="button" class="link-button" onclick="addmorefield()"value="Thêm thuộc tính"/>
--%>
</div>

</body>
</html>