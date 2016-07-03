/**
 * Created by thanhtn10 on 3/23/16.
 */
description = '';
keyword = '';
docid = '';
doctype = '';
dickeyword ={};
summarytype = '0';
oldkeyword = '';
changestatus = false;
account = 'cskh';
updatedtime = '';
webservice = '';//http://localhost:8083/';
autosave = false;
myautosave = null;
relatedkeyword = '';
CNSP_TYPE = 'cnsp';
KNTC_TYPE = 'kntc';
KNVB_TYPE = 'knvb';

global_type = CNSP_TYPE;
/**
 * Create string from HTML entities
 */
String.fromHtmlEntities = function(string) {
    return (string+"").replace(/&#\d+;/gm,function(s) {
        return String.fromCharCode(s.match(/\d+/gm)[0]);
    })
};
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
}

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

function getElementsByClassName(node, classname) {
    var a = [];
    var re = new RegExp('(^| )'+classname+'( |$)');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

function  parsecnsp(msg) {
    if (msg.length == 0)
        return;
    defaultcontrolbeforeedit();
    var jsondata = /*JSON.parse*/(msg);
    namtc = jsondata["namtc"];
    cuockt = jsondata["cuockt"];
    diadiemkt = jsondata["diadiemkt"];
    loaihinhkt = jsondata["loaihinhkt"];
    noidungkt = jsondata["noidungkt"];
    insertcnsp(namtc, cuockt, diadiemkt, loaihinhkt, noidungkt);

    var modal= document.getElementById('updatedata');
    var buttonlistupdate = document.getElementById('buttonlistupdate');
    modal.style.display= 'block';
    buttonlistupdate.style.display= 'block';

}

function  parsekntc(msg) {
    if (msg.length == 0)
        return;
    defaultcontrolbeforeedit();
    var jsondata = /*JSON.parse*/(msg);
    namtc = jsondata["namtc"];
    cuockt = jsondata["cuockt"];
    diadiemkt = jsondata["diadiemkt"];
    loaihinhkt = jsondata["loaihinhkt"];
    khoanmuccha = jsondata["kmcha"];
    khoanmuccon = jsondata["kmcon"];
    loaisolieu =jsondata["solieutc"];
    noidung =jsondata["noidungtc"];
    sotien = jsondata["sotientc"];
    sochungtu =jsondata["sochungtu"];
    ngaynop = jsondata["ngaynop"];
    tenkhoabac = jsondata["tenkhobacnop"];
    sotienkhobac = jsondata["sotienchungtu"];
    insertkntc(namtc, cuockt, diadiemkt, loaihinhkt, khoanmuccha, khoanmuccon, loaisolieu, noidung, sotien, sochungtu, ngaynop, tenkhoabac, sotienkhobac);

    var modal= document.getElementById('updatedata');
    var buttonlistupdate = document.getElementById('buttonlistupdate');
    modal.style.display= 'block';
    buttonlistupdate.style.display= 'block';

}

function  parseknvb(msg) {
    if (msg.length == 0)
        return;
    defaultcontrolbeforeedit();
    var jsondata = /*JSON.parse*/(msg);
    namtc = jsondata["namtc"];
    cuockt = jsondata["cuockt"];
    diadiemkt = jsondata["diadiemkt"];
    loaihinhkt = jsondata["loaihinhkt"];
    noidungkt = jsondata["noidungkt"];
    insertknvb(namtc, cuockt, diadiemkt, loaihinhkt, noidungkt);

    var modal= document.getElementById('updatedata');
    var buttonlistupdate = document.getElementById('buttonlistupdate');
    modal.style.display= 'block';
    buttonlistupdate.style.display= 'block';

}

function replaceNewLine(myString) {
    var regX = /\r\n|\r|\n/g;
    var replaceString = '<br/>';
    return myString.replace(regX, replaceString);
}

function replaceAll(find, replace, str)
{
    if(str.length == 0)
        return str;
    while( str.indexOf(find) > -1)
    {
        str = str.replace(find, replace);
    }
    return str;
}



function searchdetail(searchstring) {

    searchstring = replaceAll("=", "@#", searchstring);
    searchstring = replaceAll("&", "@2@", searchstring);
    $.ajax({
        type: "post",
        url: webservice + "search", //this is my servlet
        data: "keyword="+searchstring+"&detail=true",
        success: function(msg){
            msg = msg.trim();
            var jsondata = JSON.parse(msg);
            if(jsondata["type"]==CNSP_TYPE){
                global_type = CNSP_TYPE;
                parsecnsp(jsondata["data"]);
            }
            if(jsondata["type"]==KNTC_TYPE){
                global_type = KNTC_TYPE;
                parsekntc(jsondata["data"]);
            }
            if(jsondata["type"]==KNVB_TYPE){
                global_type = KNVB_TYPE;
                parseknvb(jsondata["data"]);
            }
            updatedtime = jsondata["updatedtime"];
            displaysearchresultoption(true);
            if(updatedtime == null)
                updatedtime = '';

            $('#totalsearch').text('Tổng từ khóa: '+document.getElementById('searchresultresultoption').options.length);

            var modal= document.getElementById('updatedtime');
            if(updatedtime != null && updatedtime.length > 0){
                modal.style.display = 'block';
                $('#updatedtime').text('Cập nhật lúc '+updatedtime);
            }

            else
                modal.style.display = 'none';
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
            return;
        }
    });
}
function removeOptionsbyValue(name, selectbox) {
    var i;
    for(i=selectbox.options.length-1;i>=0;i--)
    {
        if(selectbox.options[i].value == name){
            selectbox.remove(i);
            if(selectbox.options.length > 0)
                selectbox.aw
            break;
        }
    }
}
function removeOptions(selectbox)
{
    var i;
    for(i=selectbox.options.length-1;i>=0;i--)
    {
        selectbox.remove(i);
    }
}
function insertOptions(value, selectbox, id)
{
    value = replaceAll("@#", "=", value);
    value = replaceAll("@2@", "&", value);
    value = value.trim();

    var opt = document.createElement('option');
    opt.value = id;
    opt.innerHTML = value;
    selectbox.appendChild(opt);
}
function search() {

    displaysearchresultoption(false);
    defaultcontrolbeforeedit();

    var textsearch = $("#searchvalue").text();
    var typesearch = document.getElementById("mysearchtype").value;
    var yearsearch = $("#namtcvalue").text();
    var detailsearch = "false";

    removeOptions(document.getElementById('searchresultresultoption'));

    $.ajax({
        type: "post",
        url: webservice + "search", //this is my servlet
        data: "keyword="+textsearch+"&type="+typesearch + "&year="+yearsearch + "&detail="+detailsearch,
        success: function(msg){
            msg = msg.trim();
            keywordlist = msg.split('$');
            if(keywordlist.length > 0)
                displaysearchresultoption(true);
            for (i = 0; i < keywordlist.length; i++){
                temp = keywordlist[i].trim();
                templist = temp.split('#');
                if(templist.length == 2)
                    insertOptions(templist[1], document.getElementById('searchresultresultoption'), templist[0]);
            }


            onSearchResultOptionChange();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
            return;
        }
    });
  
}
function insertcnsp(namtc, cuockt, diadiemkt, loaihinhkn, noidung) {
    var div =  document.getElementById( 'parentfield' );

    insertstring = '  <div class="namtc" >Năm tài chính: <input type="text" value={0} id="datetimepickerfrom" onclick="clickdatetimefrom()"></div>'.format(namtc);
    insertstring += '<div id="ckt_div"> Cuộc kiểm toán: <select id="ckt_select" > <option>{0}</option>  <option>Cuộc 1</option>      <option>Cuộc 2</option> <option>Cuộc 3</option>  <option>...</option></select>   </div>'.format(cuockt);
    insertstring += '<div id="ddkt_div"> Địa điểm kiểm toán:  <select id="ddkt_select" > <option>{0}</option>   <option>Yên Bái</option>   <option>Phú Thọ</option>      <option>Lào Cai</option>    <option>...</option>  </select>   </div>'.format(diadiemkt);
    insertstring += '<div id="lhkn_div">   Loại hình kiến nghị:   <select id="lhkn_select" >  <option>{0}</option> <option>Kiến nghị sai phạm cá nhân, tổ chức</option>       <option>Kiến nghị tài chính</option>   <option>Kiến nghị sửa đổi, hủy bỏ văn bản</option>    </select>   </div>'.format(loaihinhkn);

    insertstring += '<div class="knsplabel" id="knsplb" >     Nội dung:      <textarea class="txtimport"  id="txtimportkeyword" name="textarea" >{0}</textarea>    </div>'.format(noidung);;

    $("#parentfield").append(insertstring);
}
function insertknvb(namtc, cuockt, diadiemkt, loaihinhkn, noidung) {
    var div =  document.getElementById( 'parentfield' );

    insertstring = '  <div class="namtc" >Năm tài chính: <input type="text" value={0} id="datetimepickerfrom" onclick="clickdatetimefrom()"></div>'.format(namtc);
    insertstring += '<div id="ckt_div"> Cuộc kiểm toán: <select id="ckt_select" > <option>{0}</option>  <option>Cuộc 1</option>      <option>Cuộc 2</option> <option>Cuộc 3</option>  <option>...</option></select>   </div>'.format(cuockt);
    insertstring += '<div id="ddkt_div"> Địa điểm kiểm toán:  <select id="ddkt_select" > <option>{0}</option>   <option>Yên Bái</option>   <option>Phú Thọ</option>      <option>Lào Cai</option>    <option>...</option>  </select>   </div>'.format(diadiemkt);
    insertstring += '<div id="lhkn_div">   Loại hình kiến nghị:   <select id="lhkn_select" >  <option>{0}</option> <option>Kiến nghị sai phạm cá nhân, tổ chức</option>       <option>Kiến nghị tài chính</option>   <option>Kiến nghị sửa đổi, hủy bỏ văn bản</option>    </select>   </div>'.format(loaihinhkn);

    insertstring += '<div class="knsplabel" id="knsplb" >     Nội dung:      <textarea class="txtimport"  id="txtimportkeyword" name="textarea" >{0}</textarea>    </div>'.format(noidung);;

    $("#parentfield").append(insertstring);
}

function insertkntc(namtc, cuockt, diadiemkt, loaihinhkn, khoanmuccha, khoanmuccon, loaisolieu, noidung, sotien, sochungtu, ngaynop, tenkhoabac, sotienkhobac) {
    var div =  document.getElementById( 'parentfield' );

    insertstring = '  <div class="namtc" >Năm tài chính: <input type="text" value={0} id="datetimepickerfrom" onclick="clickdatetimefrom()"></div>'.format(namtc);
    insertstring += '<div id="ckt_div"> Cuộc kiểm toán: <select id="ckt_select" > <option>{0}</option>  <option>Cuộc 1</option>      <option>Cuộc 2</option> <option>Cuộc 3</option>  <option>...</option></select>   </div>'.format(cuockt);
    insertstring += '<div id="ddkt_div"> Địa điểm kiểm toán:  <select id="ddkt_select" > <option>{0}</option>   <option>Yên Bái</option>   <option>Phú Thọ</option>      <option>Lào Cai</option>    <option>...</option>  </select>   </div>'.format(diadiemkt);
    insertstring += '<div id="lhkn_div">   Loại hình kiến nghị:   <select id="lhkn_select" >  <option>{0}</option> <option>Kiến nghị sai phạm cá nhân, tổ chức</option>       <option>Kiến nghị tài chính</option>   <option>Kiến nghị sửa đổi, hủy bỏ văn bản</option>    </select>   </div>'.format(loaihinhkn);

    insertstring += '<div class="kntc"  > <div class="kntcgroup">Kiến nghị tài chính</div>';
    insertstring += '<div id="kmcha_div"> Khoản mục cha: <select id="kmcha_select">     <option>{0}</option><option>Tăng thu NSNN</option>  <option>Tăng thu khác NSNN</option>   <option>Giảm chi thường xuyên</option>      <option>Giảm chi đầu tư xây dựng</option>        <option>Xử lý nợ đọng, vay tạm ứng, ghi chi-ghi thu</option> </select>  </div>'.format(khoanmuccha);

    insertstring += '<div id="kmcon_div">     Khoản mục con:     <select id="kmcon_select">  <option>{0}</option>       <option>Thu thuế nội địa</option>          <option>Thu thuế XNK</option>          <option>Thu phí, lệ phí</option>          <option>Thu tiền sử dụng đất</option>          <option>...</option>        </select>   </div>'.format(khoanmuccon);
    insertstring += '<div id="lsltc_div">        Loại số liệu tài chính:        <select id="lsltc_select">  <option>{0}</option>         <option>Số liệu ban đầu</option>          <option>Điều chỉnh tăng</option>          <option>Điều chỉnh giảm</option>        </select>      </div>'.format(loaisolieu);
    insertstring += '<div class="kntclabel" id="ndkntc" >        Nội dung:        <textarea id="ndkntctext" name="textarea" >{0}</textarea>      </div>      <div class="kntcmoneylabel" id="ndkntcmoney" >        Số tiền:        <textarea id="ndkntcmoneytext" name="textarea" >{1}</textarea>      </div>'.format(noidung, sotien);

    insertstring += '</div>';

    insertstring += '<div class="ctthkntc">     <div class="ctthkntcgroup">Nhập mới thông tin chứng từ thực hiện kiến nghị tài chính</div>';
    insertstring += '<div class="sochungtulabel">  Số chứng từ:   <textarea id="sochungtutext" name="textarea" >{0}</textarea>   </div>      <div class="ngaynoplabel" >Ngày nộp: <input type="text" id="kntc_ngaynop" value = "{1}" onclick="clickdatetimengaynop()"></div>'.format(sochungtu, ngaynop);
    insertstring += '<div class="khobaclabel">     Tên kho bạc nộp:      <textarea id="khobactext" name="textarea" >{0}</textarea>      </div>      <div class="ctthmoneylabel" id="ndctthmoney" >        Số tiền:        <textarea id="ndctthmoneytext" name="textarea" >{1}</textarea>      </div>'.format(tenkhoabac, sotienkhobac);
    insertstring += '</div>';



    $("#parentfield").append(insertstring);
}
function getSelectOptionValue(sel){
    return (sel.options[sel.selectedIndex].value);
}
function getSelectText(sel)
{
    return (sel.options[sel.selectedIndex].text);
}
function resetknvb(){
    document.getElementById("datetimepickerfrom").value = "";
    document.getElementById("ndknvb").value = "";
}
function getknvb(){

    result = '';

    var namtc = document.getElementById("datetimepickerfrom").value;
    var cuockt = getSelectText(document.getElementById("ckt_select"));
    var diadiemkt = getSelectText(document.getElementById("ddkt_select"));
    var loaihinhkt = getSelectText(document.getElementById("lhkn_select"));

    var noidungknvb = document.getElementById("ndknvb").value;

    content = '{"namtc":"{0}",'.format(replaceAll("\"", "", namtc));
    content += '"cuockt":"{0}",'.format(replaceAll("\"", "",cuockt));
    content += '"diadiemkt":"{0}",'.format(replaceAll("\"", "",diadiemkt));
    content += '"loaihinhkt":"{0}",'.format(replaceAll("\"", "",loaihinhkt));
    content += '"noidungknvb":"{0}"}'.format(replaceAll("\"", "",noidungknvb));

    result = replaceAll("=", "@#", content);

    result = replaceNewLine(result);
    result = replaceAll("\n", " <br/> ", result);

    result = replaceAll("%", "@1@", result);
    result = replaceAll("&", "@2@", result);

    result = JSON.stringify(result);

    return result;
}
function delknvb() {
    var id = document.getElementById("searchresultresultoption").value;
    if(id.length > 0){
        $.ajax({
            type: "post",
            url: webservice + "knvb", //this is my servlet
            data: "&key="+id+"&method=del",
            success: function(msg){
                msg = msg.trim();
                removeOptionsbyValue(id, document.getElementById('searchresultresultoption'));
                var modal= document.getElementById('updatedata');
                var buttonlistupdate = document.getElementById('buttonlistupdate');
                $("#searchvalue").textContent = "";
                modal.style.display= 'none';
                buttonlistupdate.style.display= 'none';
                $("#parentfield").children().remove();
                alert("Xóa thành công");

                var select = document.getElementById('searchresultresultoption');
                if(select.options.length > 0){
                    onSearchResultOptionChange();
                }
                else{
                    defaultcontrolbeforeedit();
                    displaysearchresultoption(false);

                    $("#parentfield").children().remove();
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
                return;
            }
        });
    }
}
function updateknvb(){
    var x = document.getElementById("searchresultresultoption").value;
    if(x.length > 0){

        data = getknvb();
        if(data.length == 0){
            alert('Dữ liệu rỗng. Kiểm tra lại');
            return;
        }
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        $.ajax({
            type: "post",
            url:webservice +  "knvb", //this is my servlet
            data: "data=" +data+"&uptime="+datetime+"&type="+KNVB_TYPE+"&method=update"+"&key="+x,
            success: function(msg){
                msg = msg.trim();
                if(msg == "true"){
                    removeOptionsbyValue(x, document.getElementById('searchresultresultoption'));
                    alert('Cập nhật thành công');
                    var select = document.getElementById('searchresultresultoption');
                    if(select.options.length > 0){
                        onSearchResultOptionChange();
                    }
                    else{
                        defaultcontrolbeforeedit();
                        displaysearchresultoption(false);

                        $("#parentfield").children().remove();
                    }
                }
                else{
                    alert('Không thành công!!!!!!!');
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
                return;
            }
        });
    }

}

function postknvb(){
    data = getknvb();
    if(data.length == 0){
        alert('Dữ liệu rỗng. Kiểm tra lại');
        return;
    }
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    $.ajax({
        type: "post",
        url:webservice +  "knvb", //this is my servlet
        data: "data=" +data+"&uptime="+datetime+"&type="+KNVB_TYPE,
        success: function(msg){
            msg = msg.trim();
            if(msg == "true"){
                resetknvb();
                alert('Thêm thành công');
            }
            else{
                alert('Không thành công!!!!!!!');
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
            return;
        }
    });
}
function resetkntc(){
    document.getElementById("datetimepickerfrom").value = "";
    document.getElementById("ndkntctext").value = "";
    document.getElementById("ndctthmoneytext").value = "";
    document.getElementById("khobactext").value = "";
    document.getElementById("sochungtutext").value = ""
    document.getElementById("kntc_ngaynop").value = "";
    document.getElementById("ndkntcmoneytext").value = "";
}
function getkntc(){

    result = '';

    var namtc = document.getElementById("datetimepickerfrom").value;
    var cuockt = getSelectText(document.getElementById("ckt_select"));
    var diadiemkt = getSelectText(document.getElementById("ddkt_select"));
    var loaihinhkt = getSelectText(document.getElementById("lhkn_select"));
    var kmcha = getSelectText(document.getElementById("kmcha_select"));
    var kmcon = getSelectText(document.getElementById("kmcon_select"));
    var solieutc = getSelectText(document.getElementById("lsltc_select"));

    var noidungtc = document.getElementById("ndkntctext").value;
    var sotientc = document.getElementById("ndkntcmoneytext").value;
    var sochungtu = document.getElementById("sochungtutext").value;
    var ngaynop = document.getElementById("kntc_ngaynop").value;
    var tenkhobacnop = document.getElementById("khobactext").value;
    var sotienchungtu = document.getElementById("ndctthmoneytext").value;


    content = '{"namtc":"{0}",'.format(replaceAll("\"", "", namtc));
    content += '"cuockt":"{0}",'.format(replaceAll("\"", "",cuockt));
    content += '"diadiemkt":"{0}",'.format(replaceAll("\"", "",diadiemkt));
    content += '"loaihinhkt":"{0}",'.format(replaceAll("\"", "",loaihinhkt));
    content += '"kmcha":"{0}",'.format(replaceAll("\"", "",kmcha));
    content += '"kmcon":"{0}",'.format(replaceAll("\"", "",kmcon));
    content += '"solieutc":"{0}",'.format(replaceAll("\"", "",solieutc));
    content += '"noidungtc":"{0}",'.format(replaceAll("\"", "",noidungtc));
    content += '"sotientc":"{0}",'.format(replaceAll("\"", "",sotientc));
    content += '"sochungtu":"{0}",'.format(replaceAll("\"", "",sochungtu));
    content += '"ngaynop":"{0}",'.format(replaceAll("\"", "",ngaynop));
    content += '"tenkhobacnop":"{0}",'.format(replaceAll("\"", "",tenkhobacnop));
    content += '"sotienchungtu":"{0}"}'.format(replaceAll("\"", "",sotienchungtu));

    result = replaceAll("=", "@#", content);

    result = replaceNewLine(result);
    result = replaceAll("\n", " <br/> ", result);

    result = replaceAll("%", "@1@", result);
    result = replaceAll("&", "@2@", result);

    result = JSON.stringify(result);

    return result;
}
function delkntc() {
    var id = document.getElementById("searchresultresultoption").value;

    if(id.length > 0){
        $.ajax({
            type: "post",
            url: webservice + "kntc", //this is my servlet
            data: "&key="+id+"&method=del",
            success: function(msg){
                msg = msg.trim();
                removeOptionsbyValue(id, document.getElementById('searchresultresultoption'));
                var modal= document.getElementById('updatedata');
                var buttonlistupdate = document.getElementById('buttonlistupdate');
                $("#searchvalue").textContent = "";
                modal.style.display= 'none';
                buttonlistupdate.style.display= 'none';
                $("#parentfield").children().remove();
                alert("Xóa thành công");

                var select = document.getElementById('searchresultresultoption');
                if(select.options.length > 0){
                    onSearchResultOptionChange();
                }
                else{
                    defaultcontrolbeforeedit();
                    displaysearchresultoption(false);

                    $("#parentfield").children().remove();
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
                return;
            }
        });
    }
}
function updatekntc(){
    var x = document.getElementById("searchresultresultoption").value;
    if(x.length > 0){

        data = getkntc();
        if(data.length == 0){
            alert('Dữ liệu rỗng. Kiểm tra lại');
            return;
        }
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        $.ajax({
            type: "post",
            url:webservice +  "kntc", //this is my servlet
            data: "data=" +data+"&uptime="+datetime+"&type="+KNTC_TYPE+"&method=update"+"&key="+x,
            success: function(msg){
                msg = msg.trim();
                if(msg == "true"){
                    removeOptions(x, document.getElementById('searchresultresultoption'));
                    alert('Cập nhật thành công');
                }
                else{
                    alert('Không thành công!!!!!!!');
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
                return;
            }
        });
    }

}
function postkntc(){
    data = getkntc();
    if(data.length == 0){
        alert('Dữ liệu rỗng. Kiểm tra lại');
        return;
    }
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    $.ajax({
        type: "post",
        url:webservice +  "kntc", //this is my servlet
        data: "data=" +data+"&uptime="+datetime+"&type="+KNTC_TYPE,
        success: function(msg){
            msg = msg.trim();
            if(msg == "true"){
                resetkntc();
                alert('Thêm thành công');
            }
            else{
                alert('Không thành công!!!!!!!');
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
            return;
        }
    });
}
function resetcnsp(){

    document.getElementById("datetimepickerfrom").value = "";
    document.getElementById("txtimportkeyword").value = "";
}
function getcnsp(){
    result = '';

    var namtc = document.getElementById("datetimepickerfrom").value;
    var cuockt = getSelectText(document.getElementById("ckt_select"));
    var diadiemkt = getSelectText(document.getElementById("ddkt_select"));
    var loaihinhkt = getSelectText(document.getElementById("lhkn_select"));
    var noidungkt = document.getElementById("txtimportkeyword").value;

    content = '{"namtc":"{0}",'.format(replaceAll("\"", "", namtc));
    content += '"cuockt":"{0}",'.format(replaceAll("\"", "",cuockt));
    content += '"diadiemkt":"{0}",'.format(replaceAll("\"", "",diadiemkt));
    content += '"loaihinhkt":"{0}",'.format(replaceAll("\"", "",loaihinhkt));
    content += '"noidungkt":"{0}"}'.format(replaceAll("\"", "",noidungkt));
    result = replaceAll("=", "@#", content);

    result = replaceNewLine(result);
    result = replaceAll("\n", " <br/> ", result);

    result = replaceAll("%", "@1@", result);
    result = replaceAll("&", "@2@", result);

    result = JSON.stringify(result);

    return result;
}
function delcnsp() {
    var id = document.getElementById("searchresultresultoption").value;

    if(id.length > 0){
        $.ajax({
            type: "post",
            url: webservice + "cnsp", //this is my servlet
            data: "&key="+id+"&method=del",
            success: function(msg){
                msg = msg.trim();
                removeOptionsbyValue(id, document.getElementById('searchresultresultoption'));
                var modal= document.getElementById('updatedata');
                var buttonlistupdate = document.getElementById('buttonlistupdate');
                $("#searchvalue").textContent = "";
                modal.style.display= 'none';
                buttonlistupdate.style.display= 'none';
                $("#parentfield").children().remove();
                alert("Xóa thành công");

                var select = document.getElementById('searchresultresultoption');
                if(select.options.length > 0){
                    onSearchResultOptionChange();
                }
                else{
                    defaultcontrolbeforeedit();
                    displaysearchresultoption(false);

                    $("#parentfield").children().remove();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
                return;
            }
        });
    }
}
function updatecnsp(){
    var x = document.getElementById("searchresultresultoption").value;
    if(x.length > 0){

        data = getcnsp();
        if(data.length == 0){
            alert('Dữ liệu rỗng. Kiểm tra lại');
            return;
        }
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        $.ajax({
            type: "post",
            url:webservice +  "cnsp", //this is my servlet
            data: "data=" +data+"&uptime="+datetime+"&type="+CNSP_TYPE+"&method=update"+"&key="+x,
            success: function(msg){
                msg = msg.trim();
                if(msg == "true"){
                    removeOptionsbyValue(x, document.getElementById('searchresultresultoption'));
                    alert('Cập nhật thành công');

                    var select = document.getElementById('searchresultresultoption');
                    if(select.options.length > 0){
                        onSearchResultOptionChange();
                    }
                    else{
                        defaultcontrolbeforeedit();
                        displaysearchresultoption(false);

                        $("#parentfield").children().remove();
                    }

                }
                else{
                    alert('Không thành công!!!!!!!');
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
                return;
            }
        });
    }

}
function postcnsp(){
    data = getcnsp();
    if(data.length == 0){
        alert('Dữ liệu rỗng. Kiểm tra lại');
        return;
    }
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    $.ajax({
        type: "post",
        url:webservice +  "cnsp", //this is my servlet
        data: "data=" +data+"&uptime="+datetime+"&type="+CNSP_TYPE+"&method=update",
        success: function(msg){
            msg = msg.trim();
            if(msg == "true"){
                resetcnsp();
                alert('Thêm thành công');
            }
            else{
                alert('Không thành công!!!!!!!');
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
            return;
        }
    });
}

function displaysearchresultoption(b) {
    var modal= document.getElementById('searchresultresult');
    if(b){
        modal.style.display= 'block';
    }else{
        modal.style.display= 'none';
    }
}
function defaultcontrolbeforeedit() {
    var modal= document.getElementById('updatedata');
    var buttonlistupdate = document.getElementById('buttonlistupdate');
    modal.style.display= 'none';
    buttonlistupdate.style.display= 'none';

    $("#parentfield").children().remove();
}
function updatedata(){
    if(global_type==CNSP_TYPE){
        updatecnsp();
    }
    if(global_type==KNTC_TYPE){
        updatekntc();
    }
    if(global_type==KNVB_TYPE){
        updateknvb();
    }
  //  onSearchResultOptionChange();
}
function deletedata(){
    var r = confirm("Bạn chắc chắn xóa không?");
    if (r == true) {
        if(global_type==CNSP_TYPE){
            delcnsp();
        }
        if(global_type==KNTC_TYPE){
            delkntc();
        }
        if(global_type==KNVB_TYPE){
            delknvb();
        }
    }

  //  onSearchResultOptionChange();
}
function ignore() {
    window.parent.window.postMessage(
        {'func':'alertMyMessage','params':['Thanks for Helping me']},'http://www.my-website.com');
    var r = confirm("Bạn chắc chắn muốn bỏ qua");
    if (r == true) {
        window.history.back(); 
    }
    
}

window.onload = function() {
    clickdatetimengaynop();
    clickdatetimefrom();

}

function clickdatetimefrom(){

   $('#datetimepickerfrom').datepicker();

}
function clickdatetimengaynop(){

    $('#kntc_ngaynop').datepicker();

}


function onSearchResultOptionChange() {
    var x = document.getElementById("searchresultresultoption").value;
    if(x != null && x.length > 0){
        searchdetail(x);
    }
}

