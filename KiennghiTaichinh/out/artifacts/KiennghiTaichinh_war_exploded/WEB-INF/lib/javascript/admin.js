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

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
    return '';
 //   http://dummy.com/?technology=jquery&blog=jquerybyexample.

 //       var tech = getUrlParameter('technology');
 //   var blog = getUrlParameter('blog');
};

String.prototype.toHtmlEntities = function() {

    return this.replace(/./gm, function(s) {
        return "&#" + s.charCodeAt(0) + ";";
    });
};

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
String.prototype.ltrim = function() {
    return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
    return this.replace(/\s+$/,"");
}
function overtime_km(firsttime) {
    if(firsttime.length == 0)
        return false;
    var currentdate = new Date();

    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear();

    var firstValue = firsttime.split('/');
    var secondValue = datetime.split('/');

    var firstDate=new Date();
    firstDate.setFullYear(firstValue[0],(firstValue[1] - 1 ),firstValue[2]);

    var secondDate=new Date();
    secondDate.setFullYear(secondValue[0],(secondValue[1] - 1 ),secondValue[2]);

    if (firstDate > secondDate)
    {
        return false;
    }
    return true;
}
function replacecleanAll( text, busca, reemplaza ){
    while (text.toString().indexOf(busca) != -1)
        text = text.toString().replace(busca,reemplaza);return text;
}


function cleanCode(cod){
    code = replacecleanAll(cod , "|", "{1}" ); // error | palos de explode en java
    code = replacecleanAll(code, "+", "{0}" ); // error con los signos mas
    return code;
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

function addmorefield() {

    var modal= document.getElementById('modal');
    var shade= document.getElementById('shade');
    modal.style.display=shade.style.display= 'block';

    var fieldname = getElementsByClassName(modal, 'txtSearch' );
    var docid = getElementsByClassName(modal, 'txtlinkid' );
    var description = getElementsByClassName(modal, 'txtimport');
    var kmcheckbox = getElementsByClassName(modal, 'checkkm' );
    var datefrom = getElementsByClassName(modal, 'checkkmdatefrom' );
    var dateto = getElementsByClassName(modal, 'checkkmdateto' );

    fieldname[0].value = "";
    docid[0].value = "";
    kmcheckbox[0].checked = false;
    datefrom[0].value = "";
    dateto[0].value = "";
    description[0].value = "";

    var div =  document.getElementById( 'parentfield' );
    var left = getElementsByClassName(div, 'fielddata_left' );
    var right = getElementsByClassName(div, 'fielddata_right' );
    var len = left.length + right.length;
    var txtdocstt = getElementsByClassName(modal, 'txtdocstt' );
    txtdocstt[0].value = len.toString();
    // This code is a workaround for IE6's lack of support for the
    // position: fixed style.
    //
    if (!('maxHeight' in document.body.style)) {
        function modalsize() {
            var top= document.documentElement.scrollTop;
            var winsize= document.documentElement.offsetHeight;
            var docsize= document.documentElement.scrollHeight;
            shade.style.height= Math.max(winsize, docsize)+'px';
            modal.style.top= top+Math.floor(winsize/3)+'px';
        };
        modal.style.position=shade.style.position= 'absolute';
        window.onscroll=window.onresize= modalsize;
        modalsize();
    }

}
function closeaddmore() {
    var modal= document.getElementById('modal');
    var shade= document.getElementById('shade');
    modal.style.display=shade.style.display= 'none';

    
}
function insertanode(iddiv, fieldname, docid, doctype, kmcheck, datefrom, dateto, description, stt) {
    var div =  document.getElementById( 'parentfield' );
    var left = getElementsByClassName(div, 'fielddata_left' );
    var right = getElementsByClassName(div, 'fielddata_right' );
    var len = left.length + right.length;
    classname = "fielddata_left";

    if (len%2 == 0) {
        classname = "fielddata_left";
    }else{
        classname = "fielddata_right";
    }
    strcheck = "unchecked";
    if(kmcheck)
        strcheck = "checked";
    insertstring = '<div class="{0}" id="{1}">'.format(classname, iddiv);
    insertstring += '<div class="fieldlabel">Thuộc tính: <input class="txtSearch" type="txt" value="{0}"></div>'.format(fieldname);
    insertstring += '<div class="fieldlabeldocid">DocID: <input class="txtlinkid" type="txt" value="{0}" ></div>'.format(docid);
    insertstring += '<div class="fieldlabeldoctype">STT: <input class="txtdocstt" type="txt" value="{0}" ></div>'.format(stt);
    insertstring += '<div class="fieldlabeldoctype">DocType: <input class="txtdoctype" type="txt" value="{0}"></div>'.format(doctype);
    insertstring += '<div class="fieldlabelkm"> <div class="kmtype">KM: <input type="checkbox" class="checkkm" {0} onclick="onchangedatetimedetail()"></div>'.format(strcheck);
    insertstring += '<div class="datetimegroup">';
    insertstring += ' <div class="fieldkmlabelfrom" >Từ ngày: <input type="date" class="checkkmdatefrom" value="{0}" onclick="checkkmdatefrom()"></div>'.format(datefrom);
    insertstring += '<div class="fieldkmlabelto">Đến ngày: <input type="date" class="checkkmdateto" value="{0}" onclick="checkkmdateto()"></div>'.format(dateto);
    insertstring += '</div>'
    insertstring += '</div>';
    insertstring += '<textarea class="txtimport" name="textarea" onkeydown="onPressKeyDown()" onkeyup="onPressKeyUp()">{0}</textarea>'.format(description);
    insertstring += '</div>';
    
    $("#parentfield").append(insertstring);
}
function insertaddmore() {


    var modal= document.getElementById('modal');
    var shade= document.getElementById('shade');
    modal.style.display=shade.style.display= 'none';

    var fieldname = getElementsByClassName(modal, 'txtSearch' );
    var docid = getElementsByClassName(modal, 'txtlinkid' );
    var doctype = getElementsByClassName(modal, 'txtdoctype');
    var description = getElementsByClassName(modal, 'txtimport');
    var kmcheckbox = getElementsByClassName(modal, 'checkkm' );
    var datefrom = getElementsByClassName(modal, 'checkkmdatefrom' );
    var dateto = getElementsByClassName(modal, 'checkkmdateto' );
    var txtdocstt = getElementsByClassName(modal, 'txtdocstt' );


    insertanode("", fieldname[0].value,docid[0].value,doctype[0].value, kmcheckbox[0].checked,datefrom[0].value, dateto[0].value, description[0].value, txtdocstt[0].value);

}
function resetanode(child){
    var docid = getElementsByClassName(child, 'txtlinkid' );
    var description = getElementsByClassName(child, 'txtimport');
    var kmcheckbox = getElementsByClassName(child, 'checkkm' );
    var datefrom = getElementsByClassName(child, 'checkkmdatefrom' );
    var dateto = getElementsByClassName(child, 'checkkmdateto' );

    docid[0].value = "";
    description[0].value = "";
    kmcheckbox[0].checked = false;
    datefrom[0].value = "";
    dateto[0].value = "";
}
function resettextarea(){
    oldkeyword = '';
    var div =  document.getElementById( 'parentfield' );
    var left = getElementsByClassName(div, 'fielddata_left' );
    var right = getElementsByClassName(div, 'fielddata_right');

    for (var i=0; i<left.length; i++) {
        var child = left[i];
        resetanode(child);
    }
    for (var i=0; i<right.length; i++) {
        var child = right[i];
        resetanode(child);
    }
    location.reload(true);
}
function displayupdatecontent(dict) {
   // dict = JSON.stringify(dict)

    jsondata = dict;
    objectlist = [];
    for (var item in jsondata) {
        temp = {};
        temp["field"] = item;
        temp["body"] = jsondata[item];
        objectlist.push(temp);
    }
    objectlist.sort(compare);

    for (i = 0; i < objectlist.length; i++){
        
        strfieldname = objectlist[i]["field"];
        strfieldname = replaceAll('@#', '=', strfieldname);
        strfieldname = replaceAll("@2@", "&", strfieldname);
        strfieldname = strfieldname.toHtmlEntities();
        strdocid = objectlist[i]["body"]['id'];
        strdoctype = objectlist[i]["body"]['type'];
        strkm = objectlist[i]["body"]['km'];
        strdatefr = objectlist[i]["body"]['fr'].toHtmlEntities();
        strdateto = objectlist[i]["body"]['to'].toHtmlEntities();
        temp = replaceAll("<br/>", "\n",objectlist[i]["body"]['name']);
        temp = replaceAll('@#', '=',temp);
        temp = replaceAll("@2@", "&", temp);
        strdescription = temp.toHtmlEntities();
        stt = i.toString();
        km = false;
        if(strkm == "true")
            km = true;

        typea = strdoctype.split('$');
        if(typea.length > 1){
            strdoctype = typea[0];
            stt = typea[1];
        }
        insertanode("", strfieldname,strdocid,strdoctype, km,strdatefr, strdateto, strdescription, stt);
    }
}
function compare(a,b) {
    typea = a["body"]['type'].split('$');
    typeb = b["body"]['type'].split('$');

    ano = 0;
    bno = 0;
    if (typea.length > 1){
        ano = parseInt(typea[1]);
    }
    if (typeb.length > 1){
        bno = parseInt(typeb[1]);
    }

    if (ano < bno)
        return -1;
    else if (ano > bno)
        return 1;
    else
        return 0;
}

function displaysummaryandkeyword() {
    var parentsummary = document.getElementById('keyword');
    var keywordtag = getElementsByClassName(parentsummary, "txtimport");
    keywordtag[0].value = keyword;

    var relatedkeywordtag = getElementsByClassName(parentsummary, "txtrelatedimport");
    relatedkeywordtag[0].value = relatedkeyword;
    var modal= document.getElementById('kmedit');

    if(summarytype == '1'){
        document.getElementById("myselect").value = 'km';
        modal.style.display = 'block';
        if(description.length > 0){
            datelist = description.split('@');
            var datefrom = document.getElementById("datetimepickerfrom");
            var datetp = document.getElementById("datetimepickerto");
            if(overtime_km(datelist[1]) == true){
                datefrom = document.getElementById("datetimepickerfrom");
                datetp = document.getElementById("datetimepickerto");
                datefrom.style.backgroundColor = "#563737";
                datetp.style.backgroundColor = "#563737";
                modal.style.backgroundColor = "#563737";

            }else{
                datefrom = document.getElementById("datetimepickerfrom");
                datetp = document.getElementById("datetimepickerto");
                datefrom.style.backgroundColor = "white";
                datetp.style.backgroundColor = "white";
                modal.style.backgroundColor = "white";
            }
                

            datefrom.value = datelist[0];
            datetp.value = datelist[1];

       
        }
    }else{
        modal.style.display = 'none';
        if(summarytype == '2')
            document.getElementById("myselect").value = 'normal';
        else
           document.getElementById("myselect").value = 'dv';
    }
}

function  parseJson(msg) {
    if (msg.length == 0)
        return;
    defaultcontrolbeforeedit();
    var jsondata = JSON.parse(msg);
    jsonsummary = '';
    
    for (var item in jsondata) {
        if(item == "summary"){
            jsonsummary = jsondata[item];
            
        }else if(item == "keyword"){

            keyword = jsondata[item];
            if(keyword == null)
                keyword = "";
            keyword = replaceAll('@#', '=', keyword);
            keyword = replaceAll("@2@", "&", keyword);
            oldkeyword = keyword;

        }
        else if(item == "related"){

            relatedkeyword = jsondata[item];
            if(relatedkeyword == null)
                relatedkeyword = "";
            relatedkeyword = replaceAll('@#', '=', relatedkeyword);
            relatedkeyword = replaceAll("@2@", "&", relatedkeyword);

        }
        else if(item == "description"){
            description = jsondata[item];
        }
        else if(item == "type"){
            summarytype = jsondata[item];
        }
        else if(item == "updatedtime"){
            updatedtime = jsondata[item];
        }
    }
    var modal= document.getElementById('updatedata');
    var buttonlistupdate = document.getElementById('buttonlistupdate');
    var keywordtag = document.getElementById ("summarysearch");
    modal.style.display= 'block';
    buttonlistupdate.style.display= 'block';
    keywordtag.style.display= 'inline-block';
    displaysummaryandkeyword();
    displayupdatecontent(jsonsummary);

}

function getkeywordanddescription() {
    var x = document.getElementById("myselect").value;
    if(x == "km"){
        summarytype = '1';

        var datefrom = document.getElementById("datetimepickerfrom");
        var datetp = document.getElementById("datetimepickerto");
        description = datefrom.value + "@" + datetp.value;
    }else if(x == "dv"){
        summarytype = '0';
        description = '';
    }
    else {
        summarytype = '2';
        description = '';
    }
    var parentsummary = document.getElementById('keyword');
    var keywordtag = getElementsByClassName(parentsummary, "txtimport");
    keyword = replaceAll("\t", "  ", keywordtag[0].value);
    keyword = replaceAll("=", "@#", keyword);
    keyword = replaceAll("&", "@2@", keyword);
    keyword = keyword.trim();

    var relatedkeywordtag = getElementsByClassName(parentsummary, "txtrelatedimport");
    relatedkeyword = replaceAll("\t", "  ", relatedkeywordtag[0].value);
    relatedkeyword = replaceAll("=", "@#", relatedkeyword);
    relatedkeyword = replaceAll("&", "@2@", relatedkeyword);
    relatedkeyword = relatedkeyword.trim();

}
function updatekeywordfile(){
    var key =  document.getElementById( 'keywordupdate' );
    if(key.value.length > 0){
        text = key.value;
        text = replaceAll('\n','@1@', text);
        $.ajax({
            type: "post",
            url: webservice + "uploadkey", //this is my servlet
            data: "keyword="+text + "&cmd=upload",
            cache: false,
            processData: false,
            success: function(msg){
/*
                key.value = "";
*/
                alert('Cập nhật thành công');
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert('Lỗi '+err.Message);
            }
        });
    }
}
function getkeywordfile(){
    $.ajax({
        type: "post",
        url: webservice + "uploadkey", //this is my servlet
        data: "keyword=123" + "&cmd=get",
        cache: false,
        processData: false,
        success: function(msg){
            var key =  document.getElementById( 'keywordupdate' );
            if(msg.length > 0){
                msg = replaceAll('@1@','\n', msg);
                key.value = msg;
            }
        },
        error: function(xhr, status, error) {

        }
    });



}
function getnodestring(child) {


    var fieldname = getElementsByClassName(child, 'txtSearch' );
    var docid = getElementsByClassName(child, 'txtlinkid' );
    var doctype = getElementsByClassName(child, 'txtdoctype');
    var description = getElementsByClassName(child, 'txtimport');
    var stt = getElementsByClassName(child, 'txtdocstt');

    strfieldname = replaceAll("\t", "  ", fieldname[0].value);
    strdocid = docid[0].value;
    strdoctype = doctype[0].value;
    strdescription = replaceAll("\t", "  ", description[0].value);

    if (strfieldname.length == 0 || strdescription.length == 0)
        return "";
    if( strdoctype.length == 0){
        strdoctype = '4';
    }
    strdoctype += '$' + stt[0].value;
    var kmcheckbox = getElementsByClassName(child, 'checkkm' );

    km = kmcheckbox[0].checked;
    strkm = 'false';
    strdatefrom = '';
    strdateto = '';
    if(km){
        var datefrom = getElementsByClassName(child, 'checkkmdatefrom' );
        var dateto = getElementsByClassName(child, 'checkkmdateto' );
        strdatefrom = datefrom[0].value;
        strdateto = dateto[0].value;
        strkm = 'true';
    }

    content = '{"name":"{0}",'.format(replaceAll("\"", "", strdescription));
    content += '"id":"{0}",'.format(replaceAll("\"", "",strdocid));
    content += '"type":"{0}",'.format(replaceAll("\"", "",strdoctype));
    content += '"km":"{0}",'.format(replaceAll("\"", "",strkm));
    content += '"fr":"{0}",'.format(replaceAll("\"", "",strdatefrom));
    content += '"to":"{0}"}'.format(replaceAll("\"", "",strdateto));
    
    result = '"{0}":{1}'.format(strfieldname, content);
    result = replaceAll("=", "@#", result);
    return result;
}
function getpostjson() {
    
    getkeywordanddescription();

    var div =  document.getElementById( 'parentfield' );
    var left = getElementsByClassName(div, 'fielddata_left' );
    var right = getElementsByClassName(div, 'fielddata_right' );
    var json = '{';

    for (var i=0; i<left.length; i++) {
            
        var child = left[i];
        strnode = getnodestring(child);
        if(strnode.length > 0){
            json += '{0}'.format(result);
            json += ",";
        }

        if(i< right.length){
            var childchild = right[i];
            strnode = getnodestring(childchild);
            if(strnode.length > 0){
                json += '{0}'.format(result);
                json += ",";
            }
        }
    }

    json += '}';
    if (json[json.length -2] == ','){
        json = setCharAt(json, (json.length -2), "");
    }
    json = replaceNewLine(json);
    json = replaceAll("\n", " <br/> ", json);
    
    json = replaceAll("%", "@1@", json);
    json = replaceAll("&", "@2@", json);

    json = JSON.stringify(json);
    return json;
}
function replaceNewLine(myString) {
    var regX = /\r\n|\r|\n/g;
    var replaceString = '<br/>';
    return myString.replace(regX, replaceString);
}
function replaceAllEnter(find, replace, str)
{
    while( str.indexOf(find) > -1)
    {
        str = str.replace(find, replace);
    }
    return str;
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

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}
function updatedata() {
    var postjson = getpostjson();
    if(keyword.length > 0){
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        datetime += " do " + account;
        
        $.ajax({
            type: "post",
            url: webservice + "update", //this is my servlet
            data: "summary=" +postjson+"&keyword="+keyword+"&description="+description+"&summarytype="+summarytype+"&originkey="+oldkeyword+"&uptime="+datetime + "&related="+relatedkeyword,
            cache: false,
            processData: false,
            success: function(msg){
                msg = msg.trim();
                if(msg == "true"){
                    deletewarning();
                    alert("Cập nhật thành công");

                    removeOptionsbyValue(oldkeyword, document.getElementById('searchresultresultoption'));
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
                    alert('Không thành công !!!!!')
                }


            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    }else{
        alert('Từ khóa không đúng, có thể bị rỗng. Kiểm tra lại');
    }
}
function deletedata() {
    var r = confirm("Bạn chắc chắn xóa không?");
    if (r == true) {
        if(keyword.length > 0){
            $.ajax({
                type: "post",
                url: webservice + "delete", //this is my servlet
                data: "keyword="+keyword,
                success: function(msg){
                    msg = msg.trim();
                    if(msg == "true"){
                        deletewarning();
                        alert("Xóa thành công");

                        removeOptionsbyValue(oldkeyword, document.getElementById('searchresultresultoption'));
                        var select = document.getElementById('searchresultresultoption');
                        if(select.options.length > 0){
                            onSearchResultOptionChange();
                        }
                        else{
                            defaultcontrolbeforeedit();
                            displaysearchresultoption(false);

                            $("#parentfield").children().remove();
                        }
                    }else{
                        alert("Xóa không thành công!!!!!!")
                    }

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                    return;
                }
            });
        }else{
            alert('Từ khóa không đúng, có thể bị rỗng. Kiểm tra lại');
        }
    }
    
}

function searchid(searchstring) {

    $.ajax({
        type: "post",
        url: webservice + "search", //this is my servlet
        data: "keyword="+searchstring+"&type=id",
        success: function(msg){
            msg = msg.trim();
            if(msg.length > 0){
                keywordlist = msg.split('$');
                for (i = 0; i < keywordlist.length; i++){
                    temp = keywordlist[i].trim();
                    if(temp.length > 0)
                        insertOptions(temp, document.getElementById('searchresultresultoption'));
                }


                onSearchResultOptionChange();
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
            return;
        }
    });

}
function searchkeyword(searchstring) {
    $.ajax({
        type: "post",
        url: webservice + "search", //this is my servlet
        data: "keyword="+searchstring+"&type=key",
        success: function(msg){
            msg = msg.trim();
            keywordlist = msg.split('$');
            for (i = 0; i < keywordlist.length; i++){
                temp = keywordlist[i].trim();
                if(temp.length > 0)
                    insertOptions(temp, document.getElementById('searchresultresultoption'));
            }


            onSearchResultOptionChange();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
            return;
        }
    });
}
function searchdetail(searchstring) {

    searchstring = replaceAll("=", "@#", searchstring);
    searchstring = replaceAll("&", "@2@", searchstring);
    $.ajax({
        type: "post",
        url: webservice + "search", //this is my servlet
        data: "keyword="+searchstring+"&type=detail",
        success: function(msg){
            msg = msg.trim();
            parseJson(msg);
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
            onchangedatetimedetail();
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
function insertOptions(value, selectbox)
{
    value = replaceAll("@#", "=", value);
    value = replaceAll("@2@", "&", value);
    value = value.trim();

    var opt = document.createElement('option');
    opt.value = value;
    opt.innerHTML = value;
    selectbox.appendChild(opt);
}
function search() {

    var samekeywordwarning = document.getElementById('samekeywordwarning');
    samekeywordwarning.style.display = 'none';
    $("#samekeywordwarning").children().remove();

    displaysearchresultoption(false);
    defaultcontrolbeforeedit();
    var textsearch = $("#searchvalue").text();
    var typesearch = document.getElementById("mysearchtype").value;

    if(textsearch.length > 0){
        
        removeOptions(document.getElementById('searchresultresultoption'));


        if(typesearch == "key"){
 //           insertOptions(textsearch, document.getElementById('searchresultresultoption'));
            searchkeyword(textsearch);
        }
        else{
            searchid(textsearch);
        }
            
    }
  
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
        data: "data=" +data+"&uptime="+datetime+"&type="+CNSP_TYPE,
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
function postimportdata() {
    var r = confirm("Bạn chắc chắn nhập đầy đủ dữ liệu");
    if (r == true) {
        var postjson = getpostjson();
        if(keyword.length == 0){
            alert('Từ khóa không đúng, có thể bị rỗng. Kiểm tra lại');
            return;
        }
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        datetime += " do " + account;

        $.ajax({
            type: "post",
            url:webservice +  "insert", //this is my servlet
            data: "summary=" +postjson+"&keyword="+keyword+"&description="+description+"&summarytype="+summarytype+"&uptime="+datetime + "&related="+relatedkeyword,
            success: function(msg){
                msg = msg.trim();
                if(msg == "true"){
                    resettextarea();
                }
                else{
                    alert('Không thành công!!!!!!!')
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
                return;
            }
        });
    } else {
       return;
    }
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
    var keywordtag = document.getElementById ("summarysearch");

    keywordtag.style.display= 'none';
    modal.style.display= 'none';
    buttonlistupdate.style.display= 'none';

    $("#parentfield").children().remove();
}
function defaultdata() {
    var r = confirm("Bạn chắc chắn nhập mới dữ liệu");
    if (r == true) {
        var div =  document.getElementById( 'parentfield' );
        var left = getElementsByClassName(div, 'fielddata_left' );
        var right = getElementsByClassName(div, 'fielddata_right');

        for (var i=0; i<left.length; i++) {


            var child = left[i];
            var value = getElementsByClassName(child, 'txtimport' );
            value[0].value = "";
        }
        for (var i=0; i<right.length; i++) {
            var child = right[i];
            var value = getElementsByClassName(child, 'txtimport' );
            value[0].value = "";
        }
    }

}
function ignore() {
    window.parent.window.postMessage(
        {'func':'alertMyMessage','params':['Thanks for Helping me']},'http://www.my-website.com');
    var r = confirm("Bạn chắc chắn muốn bỏ qua");
    if (r == true) {
        window.history.back(); 
    }
    
}
function removesummary(id, type) {
    if(id.length > 0){
        $.ajax({
            type: "post",
            url: webservice + "search", //this is my servlet
            data: "&docid="+id+"&command=del",
            success: function(msg){
                msg = msg.trim();

                var modal= document.getElementById('updatedata');
                var buttonlistupdate = document.getElementById('buttonlistupdate');
                $("#searchvalue").textContent = "";
                modal.style.display= 'none';
                buttonlistupdate.style.display= 'none';
                $("#parentfield").children().remove();
                alert("Xóa thành công");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
                return;
            }
        });
    }
}
window.onload = function() {
    // Get a reference to the <div> on the page that will display the
    // message text.
    //

  /*  $.datetimepicker.setLocale('en');*/
    clickdatetimengaynop();
    clickdatetimefrom();
 //   clickdatetimeto();
   // onSummaryOptionChange();
 //   checkkmdatefrom();
  //  checkkmdateto();

    // A function to process messages received by the window.
   /* function receiveMessage(e) {
        // Check to make sure that this message came from the correct domain.

        if (e.origin !== "http://localhost")
            return;

        // Update the div element to display the message.
        var jsondata = JSON.parse(e.data);

        if(jsondata['cmd'] == "update"){
            updatedata();
        }
    }

    // Setup an event listener that calls receiveMessage() when the window
    // receives a new MessageEvent.
    window.addEventListener('message', receiveMessage);*/
}
function checksamekeyword() {
    var parentsummary = document.getElementById('keyword');
    var keywordtag = getElementsByClassName(parentsummary, "txtimport");
    keywordtemp = keywordtag[0].value;

    var samekeywordwarning = document.getElementById('samekeywordwarning');
    samekeywordwarning.style.display = 'none';
    $("#samekeywordwarning").children().remove();
    $.ajax({
        type:"post",
        url: webservice + "search", //this is my servlet
        data: "keyword="+keywordtemp+"&type=same",
        success: function(msg){
            msg = msg.trim();
            if(msg==""){
                return;
            }
            keywordlist = msg.split('$');
            if(keywordlist.length > 0){
                samekeywordwarning.style.display = 'block';
                searchkey = replaceAll("#", "%23", keywordlist[0]);
                hrefstring = '<a href="{0}{1}&type=key" style="display: block">Đã tồn tại tóm tắt liên quan tới từ khóa: {2}. Click để xem</a>'.format('edit.jsp?key=',searchkey,keywordlist[0]);

                $("#samekeywordwarning").append(hrefstring);
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            return;
        }
    });
}
function clickdatetimefrom(){

   $('#datetimepickerfrom').datepicker();

}
function clickdatetimengaynop(){

    $('#kntc_ngaynop').datepicker();

}
function clickdatetimeto() {
     $('#datetimepickerto').datepicker();
}
function checkkmdatefrom() {
    $('.checkkmdatefrom').datepicker();
}
function checkkmdateto() {
    $('.checkkmdateto').datepicker();
}
function defaultkeywordtext() {
    var dict = {};

    normal = ['Giới thiệu','Ưu đãi','Giá cước','Thủ tục hòa mạng'];
    dv = ['Giới thiệu','Đối tượng sử dụng','Đặc điểm','Giá cước','Cách đăng ký','Cách hủy'];
    km = ['Thời gian áp dụng', 'Ưu đãi', 'Đối tượng', 'Cách đăng ký', 'Cách hủy'];
    var x = document.getElementById("myselect").value;
    var div =  document.getElementById( 'parentfield' );
    var left = getElementsByClassName(div, 'fielddata_left' );
    var right = getElementsByClassName(div, 'fielddata_right' );



    if(x == "km"){
        count = 0;
        for (var i=0; i<left.length; i++) {

            var fieldname = getElementsByClassName(left[i], 'txtSearch' );
            if(count < km.length){
                fieldname[0].value = km[count];
                count += 1;
            }else {
                fieldname[0].value = '';
            }

            if(i < right.length){

                var fieldname = getElementsByClassName(right[i], 'txtSearch' );
                if(count < km.length)   {

                    fieldname[0].value = km[count];
                    count += 1;
                }else {
                    fieldname[0].value = '';
                }

            }
        }
    }else if(x == 'normal'){
        count = 0;
        for (var i=0; i<left.length; i++) {

            var fieldname = getElementsByClassName(left[i], 'txtSearch' );
            if(count < normal.length){
                fieldname[0].value = normal[count];
                count += 1;
            }else {
                fieldname[0].value = '';
            }
                
            if(i < right.length){
                
                var fieldname = getElementsByClassName(right[i], 'txtSearch' );
                if(count < normal.length)   {
                    
                    fieldname[0].value = normal[count];
                    count += 1;
                }else {
                    fieldname[0].value = '';
                }
                    
            }
        }
    }else if(x == 'dv'){
        count = 0;
        for (var i=0; i<left.length; i++) {

            var fieldname = getElementsByClassName(left[i], 'txtSearch' );
            if(count < dv.length){
                fieldname[0].value = dv[count];
                count += 1;
            }
                
            if(i< right.length){
                
                var fieldname = getElementsByClassName(right[i], 'txtSearch' );
                if(count < dv.length){
                    fieldname[0].value = dv[count];
                    count += 1;
                }
                    
            }
        }
    }
}
function onSummaryOptionChange() {
    var x = document.getElementById("myselect").value;
    var modal= document.getElementById('kmedit');
    var div =  document.getElementById( 'parentfield' );
    var kmlabel = getElementsByClassName(div, "fieldlabelkm");
    if(x == "km"){
        modal.style.display =  'block';

        for (var i=0; i<kmlabel.length; i++) {

            var child = kmlabel[i];
            child.style.display = 'none';
        }
        
    }else{
        modal.style.display =  'none';
        for (var i=0; i<kmlabel.length; i++) {

            var child = kmlabel[i];
            child.style.display = 'block';
        }
    }
    defaultkeywordtext();
}
function onSearchResultOptionChange() {
    var x = document.getElementById("searchresultresultoption").value;
    if(x.length > 0){
        searchdetail(x);
    }
}
function onPressKeyUp(){
  startautosave();
    autosave = true;
}
function onPressKeyDown(){
stopautosave();
    autosave = false;
}
function oncheckboxchange() {
    alert(1);
    var $this = $(this);
    alert($this.className);
    parentnodectrl = $this.parentNode.parentNode;
    datefrom = getElementsByClassName(parentnodectrl, 'fieldkmlabelfrom');
    datefrom.style.display = 'none';
}
function onchangedatetimedetail() {

    var div =  document.getElementById( 'parentfield' );
    var left = getElementsByClassName(div, 'fielddata_left' );
    var right = getElementsByClassName(div, 'fielddata_right' );

    for (var i=0; i<left.length; i++) {

        var child = left[i];
        var datetimegroup = getElementsByClassName(child, 'datetimegroup' );
        var checkbox = getElementsByClassName(child, 'checkkm');
        if (checkbox[0].checked){
            datetimegroup[0].style.display = 'block';
            var datefrom = getElementsByClassName(child, 'checkkmdatefrom' );
            var dateto = getElementsByClassName(child, 'checkkmdateto' );
            strdatefrom = datefrom[0].value;
            strdateto = dateto[0].value;

            if(strdateto.length > 0 && overtime_km(strdateto) == true)
                datetimegroup[0].style.display = 'none';


        }else{
            
            datetimegroup[0].style.display = 'none';
        }

    }
    for (var i=0; i<right.length; i++) {

        var child = right[i];
        var datetimegroup = getElementsByClassName(child, 'datetimegroup' );
        var checkbox = getElementsByClassName(child, 'checkkm');
        if (checkbox[0].checked){
            datetimegroup[0].style.display = 'block';
            var datefrom = getElementsByClassName(child, 'checkkmdatefrom' );
            var dateto = getElementsByClassName(child, 'checkkmdateto' );
            strdatefrom = datefrom[0].value;
            strdateto = dateto[0].value;

            if(strdateto.length > 0 && overtime_km(strdateto) == true)
                datetimegroup[0].style.display = 'none';
           
        }else{
            datetimegroup[0].style.display = 'none';
        }
     
    }

}
function deletewarning() {
    return;
    $.ajax({
        type: "post",
        url: webservice + "warning", //this is my servlet
        data: "type=del" + "&keyword="+oldkeyword,
        success: function(msg){
            changestatus = false;
            getwarning();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            return;
        }
    });
}
function postwarning() {
    return;
    if(oldkeyword.length == 0)
        return;
    $.ajax({
        type: "post",
        url: webservice + "warning", //this is my servlet
        data: "type=insert" + "&keyword="+oldkeyword + "&account="+account,
        success: function(msg){

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            return;
        }
    });
}
function getwarning() {
    var modal= document.getElementById('editwarning');
    modal.style.display = 'none';
    return;
    $.ajax({
        type: "post",
        url: webservice + "warning", //this is my servlet
        data: "type=get",
        success: function(msg){
            msg = msg.trim();
            var modal= document.getElementById('editwarning');
            if(msg.length > 0){
                listwarning = msg.split('@');
                for (i = 0; i < listwarning.length; i++){
                    var ul = document.getElementById("slide");
                    var li = document.createElement("li");
                    li.appendChild(document.createTextNode(listwarning[i]));
                    ul.appendChild(li);
        
                }
                modal.style.display = 'block';
            }else{
                modal.style.display = 'none';
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            return;
        }
    });
}

var fun = function autosave() {
    if(autosave == false)
        return;
    if(changestatus ==false){
        postwarning();
        changestatus = true;
    }
    autosave = false;
/*    var postjson = getpostjson();
   if(oldkeyword.length == 0 && keyword.length > 0){
       $.ajax({
           type: "post",
           url:webservice +  "insert", //this is my servlet
           data: "summary=" +postjson+"&keyword="+keyword+"&description="+description+"&summarytype="+summarytype,
           success: function(msg){
               deletewarning();
           },
           error: function(XMLHttpRequest, textStatus, errorThrown) {
               return;
           }
       });
   }else if(oldkeyword.length > 0 && keyword.length > 0){

       var currentdate = new Date();
       var datetime = currentdate.getDate() + "/"
           + (currentdate.getMonth()+1)  + "/"
           + currentdate.getFullYear() + " "
           + currentdate.getHours() + ":"
           + currentdate.getMinutes() + ":"
           + currentdate.getSeconds();
       datetime += " do " + account;

       $.ajax({
           type: "post",
           url: webservice + "update", //this is my servlet
           data: "summary=" +postjson+"&keyword="+keyword+"&description="+description+"&summarytype="+summarytype+"&originkey="+oldkeyword+"&uptime="+datetime,
           cache: false,
           processData: false,
           success: function(msg){
                 deletewarning();
           },
           error: function(xhr, status, error) {
               alert(err.Message);
           }
       });
   }*/
}

function startautosave() {
    myautosave = setTimeout(fun, 5000);
}

function stopautosave() {
    clearTimeout(myautosave);
}