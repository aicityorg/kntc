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
 /*           $('#slide').list_ticker({
                speed:3000,
                effect:'fade'
            });*/
            getwarning();
            $('#txtimportkeyword').on('blur', function(e) {
                checksamekeyword();
                // your code here
            });

            var samekeywordwarning = document.getElementById('samekeywordwarning');
            samekeywordwarning.style.display = 'none';
            $("#samekeywordwarning").children().remove();

            var docidparam = getUrlParameter('docid');
            if(docidparam.length > 0){
                account = getUrlParameter('username');

                //search();
            }
            autosave = false;
            onchangedatetimedetail();
            defaultkeywordtext();

        });

    </script>
</head>
<body>
<div id="shade"></div>
<div id="modal">
    <div>
        <div class="fieldlabel">Thuộc tính: <input class="txtSearch" type="txt"></div>

        <div class="fieldlabeldocid">DocID: <input class="txtlinkid" type="txt" ></div>
        <div class="fieldlabeldoctype">STT: <input class="txtdocstt" type="txt" value="6"></div>
        <div class="fieldlabeldoctype">DocType: <input class="txtdoctype" type="txt" value="4"></div>
        <div class="fieldlabelkm">

            <div class="kmtype">KM: <input type="checkbox" class="checkkm"></div>

            <div class="fieldkmlabelfrom" >Từ ngày: <input type="text" class="checkkmdatefrom" onclick="checkkmdatefrom()"></div>

            <div class="fieldkmlabelto">Đến ngày: <input type="text" class="checkkmdateto" onclick="checkkmdateto()"></div>
        </div>
    </div>

    <textarea class="txtimport" name="textarea" ></textarea>
    <div class="buttonlist">
        <input type="button" class="link-button" onclick="closeaddmore()"value="Hủy"/>
        <input type="button" class="link-button" onclick="insertaddmore()"value="Thêm"/>
    </div>


</div>
<div class="controlpanel">
    <div id="editctl"><a href="${pageContext.request.contextPath}/search.jsp">Sửa or Xóa</a></div>
</div>

<div id="editwarning">

    <ul id="slide">

    </ul>

</div>

<div class="importdatalabel">
    Tóm tắt nội dung sản phẩm, dịch vụ, khuyến mãi
</div>

<div class="summary">

    <div id="summarytype">
        Loại tài liệu:
        <select id="myselect" onchange="onSummaryOptionChange()">
            <option value="normal">Sản phẩm</option>
            <option value="dv">Dịch vụ</option>
            <option value="km">Khuyến mại</option>
        </select>
    </div>
    <div id="kmedit">
        <div class="kmlabel" >Từ ngày: <input type="text" id="datetimepickerfrom" onclick="clickdatetimefrom()"></div>
        <div class="kmlabel">Đến ngày: <input type="text" id="datetimepickerto" onclick="clickdatetimeto()"></div>
    </div>
    <div class='kmdescription' id="keyword" >
        Từ khóa (không dấu):
        <textarea class="txtimport"  id="txtimportkeyword" name="textarea" ></textarea>
        <div class="kmrelatedkeyword">Từ khóa liên quan: <textarea class="txtrelatedimport"  id="txtrelatedkeyword" name="textarea" ></textarea></div>
    </div>
</div>
<div id="samekeywordwarning"></div>
<div id="importdata">

    <div id='parentfield'>
        <div class='fielddata_left'>
            <div class="fieldlabel">Thuộc tính: <input class="txtSearch" type="txt"></div>

            <div class="fieldlabeldocid">DocID: <input class="txtlinkid" type="txt" ></div>
            <div class="fieldlabeldoctype">STT: <input class="txtdocstt" type="txt" value="0"></div>
            <div class="fieldlabeldoctype">DocType: <input class="txtdoctype" type="txt" value="4"></div>

            <div class="fieldlabelkm">

                <div class="kmtype">KM: <input type="checkbox" class="checkkm" onclick="onchangedatetimedetail()"></div>

                <div class="datetimegroup">
                    <div class="fieldkmlabelfrom" >Từ ngày: <input type="text" class="checkkmdatefrom" onclick="checkkmdatefrom()"></div>

                    <div class="fieldkmlabelto">Đến ngày: <input type="text" class="checkkmdateto" onclick="checkkmdateto()"></div>
                </div>

            </div>

            <textarea class="txtimport" name="textarea" onkeydown="onPressKeyDown()" onkeyup="onPressKeyUp()"></textarea>
        </div>
        <div class='fielddata_right'>
            <div class="fieldlabel">Thuộc tính: <input class="txtSearch" type="txt"></div>

            <div class="fieldlabeldocid">DocID: <input class="txtlinkid" type="txt" ></div>
            <div class="fieldlabeldoctype">STT: <input class="txtdocstt" type="txt" value="1"></div>
            <div class="fieldlabeldoctype">DocType: <input class="txtdoctype" type="txt" value="4"></div>
            <div class="fieldlabelkm">

                <div class="kmtype">KM: <input type="checkbox" class="checkkm" onclick="onchangedatetimedetail()"></div>

                <div class="datetimegroup">
                    <div class="fieldkmlabelfrom" >Từ ngày: <input type="text" class="checkkmdatefrom" onclick="checkkmdatefrom()"></div>

                    <div class="fieldkmlabelto">Đến ngày: <input type="text" class="checkkmdateto" onclick="checkkmdateto()"></div>

                </div>
            </div>

            <textarea class="txtimport" name="textarea" onkeydown="onPressKeyDown()" onkeyup="onPressKeyUp()"></textarea>
        </div>

        <div class='fielddata_left'>
            <div class="fieldlabel">Thuộc tính: <input class="txtSearch" type="txt"></div>

            <div class="fieldlabeldocid">DocID: <input class="txtlinkid" type="txt" ></div>
            <div class="fieldlabeldoctype">STT: <input class="txtdocstt" type="txt" value="2"></div>
            <div class="fieldlabeldoctype">DocType: <input class="txtdoctype" type="txt" value="4"></div>
            <div class="fieldlabelkm">

                <div class="kmtype">KM: <input type="checkbox" class="checkkm" onclick="onchangedatetimedetail()"></div>

                <div class="datetimegroup">
                    <div class="fieldkmlabelfrom" >Từ ngày: <input type="text" class="checkkmdatefrom" onclick="checkkmdatefrom()"></div>

                    <div class="fieldkmlabelto">Đến ngày: <input type="text" class="checkkmdateto" onclick="checkkmdateto()"></div>

                </div>
            </div>
            <textarea class="txtimport" name="textarea" onkeydown="onPressKeyDown()" onkeyup="onPressKeyUp()"></textarea>
        </div>
        <div class='fielddata_right'>
            <div class="fieldlabel">Thuộc tính: <input class="txtSearch" type="txt"></div>

            <div class="fieldlabeldocid">DocID: <input class="txtlinkid" type="txt"></div>
            <div class="fieldlabeldoctype">STT: <input class="txtdocstt" type="txt" value="3"></div>
            <div class="fieldlabeldoctype">DocType: <input class="txtdoctype" type="txt"  value="4"></div>
            <div class="fieldlabelkm">

                <div class="kmtype">KM: <input type="checkbox" class="checkkm" onclick="onchangedatetimedetail()"></div>

                <div class="datetimegroup">
                    <div class="fieldkmlabelfrom" >Từ ngày: <input type="text" class="checkkmdatefrom" onclick="checkkmdatefrom()"></div>

                    <div class="fieldkmlabelto">Đến ngày: <input type="text" class="checkkmdateto" onclick="checkkmdateto()"></div>

                </div>
            </div>
            <textarea class="txtimport" name="textarea" onkeydown="onPressKeyDown()" onkeyup="onPressKeyUp()" ></textarea>
        </div>
        <div class='fielddata_left'>
            <div class="fieldlabel">Thuộc tính: <input class="txtSearch" type="txt"></div>

            <div class="fieldlabeldocid">DocID: <input class="txtlinkid" type="txt" ></div>
            <div class="fieldlabeldoctype">STT: <input class="txtdocstt" type="txt" value="4"></div>
            <div class="fieldlabeldoctype">DocType: <input class="txtdoctype" type="txt" value="4"></div>
            <div class="fieldlabelkm">

                <div class="kmtype">KM: <input type="checkbox" class="checkkm" onclick="onchangedatetimedetail()"></div>

                <div class="datetimegroup">
                    <div class="fieldkmlabelfrom" >Từ ngày: <input type="text" class="checkkmdatefrom" onclick="checkkmdatefrom()"></div>

                    <div class="fieldkmlabelto">Đến ngày: <input type="text" class="checkkmdateto" onclick="checkkmdateto()"></div>

                </div>
            </div>
            <textarea class="txtimport" name="textarea" onkeydown="onPressKeyDown()" onkeyup="onPressKeyUp()"></textarea>
        </div>
        <div class='fielddata_right'>
            <div class="fieldlabel">Thuộc tính: <input class="txtSearch" type="txt"></div>

            <div class="fieldlabeldocid">DocID: <input class="txtlinkid" type="txt" ></div>
            <div class="fieldlabeldoctype">STT: <input class="txtdocstt" type="txt" value="5"></div>
            <div class="fieldlabeldoctype">DocType: <input class="txtdoctype" type="txt"  value="4"></div>
            <div class="fieldlabelkm">

                <div class="kmtype">KM: <input type="checkbox" class="checkkm" onclick="onchangedatetimedetail()"></div>

                <div class="datetimegroup">
                    <div class="fieldkmlabelfrom" >Từ ngày: <input type="text" class="checkkmdatefrom" onclick="checkkmdatefrom()"></div>

                    <div class="fieldkmlabelto">Đến ngày: <input type="text" class="checkkmdateto" onclick="checkkmdateto()"></div>
                </div>
            </div>

            <textarea class="txtimport" name="textarea" onkeydown="onPressKeyDown()" onkeyup="onPressKeyUp()"></textarea>
        </div>
    </div>


</div>
<div class="buttonlist">
    <input type="button" class="link-button-red" onclick="ignore()"value="Bỏ qua"/>

    <input type="button" class="link-button" onclick="postimportdata()"value="Thêm"/>
    <input type="button" class="link-button" onclick="addmorefield()"value="Thêm thuộc tính"/>
</div>


</body>
</html>