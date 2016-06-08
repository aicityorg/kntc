package cukin.com.kntc.searchkeyword;


import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.sql.*;
import java.text.Normalizer;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Date;
import java.util.regex.Pattern;

/**
 * Created by thanhtn10 on 3/28/16.
 */
public class SearchKeywordService {
    static String dbName = "db_summary?useUnicode=true&characterEncoding=UTF-8";
    static String driver = "com.mysql.jdbc.Driver";


    public static ArrayList<String> mKeywords = new ArrayList<>();
    public static ArrayList<String> mSynonym = new ArrayList<>();

    public static void getSynonym(Connection conn){
        mSynonym.clear();
        PreparedStatement pst = null;
        ResultSet rs = null;
        try {
            String insert = "select keyword from tbl_cmd";
            pst = conn
                    .prepareStatement(insert);

            rs = pst.executeQuery();
            while(rs.next()){
                mSynonym.add(rs.getString("keyword").trim());
            }
        } catch (Exception e) {
            System.out.println(e);
        } finally {

            if (pst != null) {
                try {
                    pst.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    public static void getKeywordList(Connection conn){
        //    if(mKeywords.size() == 0){
        mKeywords.clear();
        mSynonym.clear();
        PreparedStatement pst = null;
        ResultSet rs = null;
        try {
            String insert = "select keyword,status from tbl_summary";
            pst = conn
                    .prepareStatement(insert);

            rs = pst.executeQuery();
            while(rs.next()){
                mKeywords.add(rs.getString("keyword").trim());
                String status = rs.getString("status");
                if(status != null){
                    status = status.trim();
                    if(status.length() > 0)
                        mSynonym.add(status+"$"+rs.getString("keyword").trim());
                }

            }
        } catch (Exception e) {
            System.out.println(e);
        } finally {

            if (pst != null) {
                try {
                    pst.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        //     }

    }
    public String[] sortfollowstringlength(String[] inputs){
        for (int i = 0; i< inputs.length; i++)
            for (int j = i + 1; j< inputs.length; j++){
                if(inputs[i].length() < inputs[j].length()){
                    String temp = inputs[i];
                    inputs[i] = inputs[j];
                    inputs[j] = temp;
                }
            }
        return inputs;
    }
    public ArrayList<String> getRelatedKeyword(String mainkey){
        ArrayList<String> result= new ArrayList<>();

        for (String itemkey:mKeywords) {
            if(itemkey.compareToIgnoreCase(mainkey) == 0){
                continue;
            }else{
                itemkey = itemkey.toLowerCase().trim();
                mainkey = mainkey.toLowerCase();
                if(itemkey.contains(mainkey) || mainkey.contains(itemkey))
                    result.add(itemkey);
            }
        }

        return result;
    }
    public Map<String, ArrayList<String>> getKeywordDesinSample(ArrayList<String> words){
        Map<String, ArrayList<String>> map = new HashMap<>();
        ArrayList<String> keywords = new ArrayList<>();
        ArrayList<String> descrip = new ArrayList<>();
        String mainkey = combinewords(words).trim();
        boolean checklongkey = false;
        for (String itemkey:mKeywords) {
            if(mainkey.compareToIgnoreCase(itemkey) == 0){
                keywords.add(mainkey);
                checklongkey = true;
                break;
            }
        }
        if(checklongkey == false){
            for (String word :words) {
                boolean b = false;
                word = word.trim();
                for (String itemkey:mKeywords) {
                    if(itemkey.compareToIgnoreCase(word) == 0){
                        b = true;
                        break;
                    }else{
                        String[] itemkeylist = itemkey.split(" ");
                        for (int i = 0; i < itemkeylist.length; i++){
                            if(itemkeylist[i].compareToIgnoreCase(word) == 0){
                                b = true;
                                break;
                            }
                        }
                        if(b == true)
                            break;
                    }

                }
                if(b)
                    keywords.add(word);
                else
                    descrip.add(word);
            }
        }

        map.put("key", keywords);
        map.put("des", descrip);

        return map;
    }
    private boolean checkelementofarray(ArrayList<String> inputs, String item){
        boolean b = false;
        for (int i = 0 ; i < inputs.size(); i++) {
            if (inputs.get(i).compareToIgnoreCase(item) == 0){
                b = true;
                break;
            }
        }
        return  b;
    }
    public Map<String, String> getRecordFollowExactKey(Connection conn, String mainkey){

        Map<String, String> map = new HashMap<>();
        PreparedStatement pst = null;
        ResultSet rs = null;
        try {
            String insert = "select decription, summary,type, status from tbl_summary where  UPPER( keyword ) = UPPER( ? )";
            pst = conn
                    .prepareStatement(insert);
            pst.setString(1, mainkey);

            rs = pst.executeQuery();
            while(rs.next()){

                map.put("des", rs.getString("decription"));
                map.put("sum", rs.getString("summary"));
                map.put("type", rs.getString("type"));
                map.put("status", rs.getString("status"));
                map.put("check", "false");
            }
        } catch (Exception e) {
            System.out.println(e);
        } finally {

            if (pst != null) {
                try {
                    pst.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }

        return map;
    }
    public String combinewords(ArrayList<String> words){
        String orginQuery = "";
        for (String s : words)
        {
            orginQuery += s.trim() + " ";
        }
        return orginQuery;
    }
    public static String[] SplitUsingTokenizer(String subject, String delimiters) {
        StringTokenizer strTkn = new StringTokenizer(subject, delimiters);
        ArrayList<String> arrLis = new ArrayList<String>(subject.length());

        while(strTkn.hasMoreTokens())
            arrLis.add(strTkn.nextToken());

        return arrLis.toArray(new String[0]);
    }
    public  String getexactKeyword(ArrayList<String> words){

        String result = "";
        int count = 1;

        ArrayList<String> arrListTemp = new ArrayList<>();
        arrListTemp.addAll(mKeywords);

        for (int i = words.size() - 1; i>= 0 ; i --){

            ArrayList<String> simi = new ArrayList<>();
            for (String itemkey:arrListTemp) {
                String []liststring = itemkey.split(" ");//SplitUsingTokenizer(itemkey, " ");
                if(liststring.length >= count){
                    String mainkey = "";
                    String secondkey = "";

                    for (int j = 1; j < count + 1 ; j++){
                        mainkey += words.get(words.size()-j) + " ";
                        secondkey += liststring[liststring.length-j] + " ";

                    }
                    if (mainkey.compareToIgnoreCase(secondkey) == 0){
                        simi.add(itemkey);
                        result = mainkey;
                    }
                }

            }
            arrListTemp.clear();
            arrListTemp.addAll(simi);
            count += 1;
        }
        result = result.trim();
        if(result.length() > 0){
            String []listwords = SplitUsingTokenizer(result, " ");
            result = "";
            for (int i = listwords.length - 1; i>= 0 ; i --){
                result += listwords[i] + " ";
            }
        }


        return result.trim();
    }
    public static String removeAccent(String s) {
        s = s.replaceAll("đ", "d");
        s = s.replaceAll("Đ", "d");
        String temp = Normalizer.normalize(s, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(temp).replaceAll("");
    }


    public String search_keyword(ArrayList<String> words,  String url,String userName, String password, String urlsearchconfig, String urlsearchkeyconfig) {

        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        String result = "";

        try {
            Class.forName(driver).newInstance();
            conn = DriverManager
                    .getConnection(url + dbName, userName, password);


            getKeywordList(conn);
            Map<String, ArrayList<String>>  existKeyDesmap = getKeywordDesinSample(words);
            ArrayList<String> exactKeys = existKeyDesmap.get("key")/*getexactKeyword(conn, words, existKeyDesmap.get("key"))*/;
            ArrayList<String> exactDescription = existKeyDesmap.get("des");

            if(exactKeys.size() == 0){
                //     getSynonym(conn);
                String strWords = combinewords(words);
                for (int i = 0; i < mSynonym.size(); i++){
                    String strSynonym = mSynonym.get(i);
                    String []synonymlist = strSynonym.split("\\$");
                    if (synonymlist.length == 2){
                        synonymlist[0] = synonymlist[0].trim();
                        if (synonymlist[0].length() == 0)
                            continue;
                        synonymlist[0] = synonymlist[0].toLowerCase();
                        strWords = strWords.toLowerCase();
                        String []prefixlist = synonymlist[0].split(",");
                        boolean b=false;
                        for (int j = 0; j < prefixlist.length; j++){
                            if(prefixlist[j].contains(strWords) || strWords.contains(synonymlist[j])){
                                exactKeys.add(synonymlist[1].toLowerCase());
                                strWords = strWords.replace(prefixlist[j], "");
                                exactDescription.add(strWords);
                                b = true;
                                break;

                            }
                        }
                        if(b)
                            break;

                    }
                }
            }
            if(exactKeys.size() > 0){
                String mainkey = combinewords(exactKeys);
                mainkey = mainkey.trim();
                Map<String, String>  recordFollowExactKey = getRecordFollowExactKey(conn, mainkey);
                result = recordFollowExactKey.get("sum");
                String strDateTime = "";

                if(result == null || result.length() == 0){
                    String strWords = combinewords(words);
                    strWords = strWords.trim();
                    for (int i = 0; i < mSynonym.size(); i++){
                        String strSynonym = mSynonym.get(i);
                        if(strSynonym == null || strSynonym == "")
                            continue;
                        String []synonymlist = strSynonym.split("\\$");
                        if(synonymlist == null)
                            continue;
                        if (synonymlist.length == 2){
                            if(synonymlist[0] == null)
                                continue;
                            synonymlist[0] = synonymlist[0].trim();

                            if (synonymlist[0].length() == 0)
                                continue;
                            synonymlist[0] = synonymlist[0].toLowerCase();
                            strWords = strWords.toLowerCase();
                            String []prefixlist = synonymlist[0].split(",");
                            if(prefixlist == null)
                                continue;

                            boolean b=false;
                            String temp = strWords;
                            for (int j = 0; j < prefixlist.length; j++){
                                String strPrefix = prefixlist[j].trim();
                                if(strPrefix.compareToIgnoreCase(strWords) == 0){
                                    temp = strWords.replaceAll(strPrefix, synonymlist[1].toLowerCase());
                                    b = true;
                                    break;
                                }
                                if(strPrefix.contains(strWords)){
                                    temp = synonymlist[1].toLowerCase();
                                    b = true;
                                }
                                if(strWords.contains(strPrefix)){
                                    temp = strWords.replaceAll(strPrefix, synonymlist[1].toLowerCase());
                                    b = true;
                                }
                            }
                            strWords = temp.trim();
                            if(b){
                                words = new ArrayList<String>(Arrays.asList(strWords.split(" ")));
                                existKeyDesmap = getKeywordDesinSample(words);
                                exactKeys = existKeyDesmap.get("key")/*getexactKeyword(conn, words, existKeyDesmap.get("key"))*/;
                                exactDescription = existKeyDesmap.get("des");
                                mainkey = combinewords(exactKeys);
                                mainkey = mainkey.trim();
                                recordFollowExactKey = getRecordFollowExactKey(conn, mainkey);
                                result = recordFollowExactKey.get("sum");
                                break;
                            }


                        }
                    }


                }
                if(result == null || result.length() == 0){
                    mainkey = getexactKeyword(exactKeys);
                    mainkey = mainkey.trim();
                    recordFollowExactKey = getRecordFollowExactKey(conn, mainkey);
                    result = recordFollowExactKey.get("sum");
                }
                boolean bcheckdatetime = false;
                strDateTime = recordFollowExactKey.get("des");
                if(strDateTime != null){
                    if(strDateTime.length() > 0){
                        String []timelist = strDateTime.split("@");
                        if(timelist.length > 1){
                            String timeTO = timelist[1];
                            if(timeTO != null){
                                if(timeTO.length() > 0){
                                    String []timetoSplit = timeTO.split("/");

                                    if(timetoSplit.length > 2){
                                        String date = timetoSplit[1] + "-" + timetoSplit[0] + "-"+timetoSplit[2];

                                        SimpleDateFormat sdf =  new SimpleDateFormat("MM-dd-yyyy"); // Jan-20-2015 1:30:55 PM
                                        Date d=null;
                                        Date d1=null;
                                        String today= getToday("MM-dd-yyyy");

                                        //System.out.println("expdate>> "+date);
                                        //System.out.println("today>> "+today+"\n\n");
                                        d = sdf.parse(date);
                                        d1 = sdf.parse(today);
                                        if(d1.compareTo(d) <0){// not expired


                                        }else if(d.compareTo(d1)==0){// both date are same
                                            if(d.getTime() < d1.getTime()){// not expired
                                            }else if(d.getTime() == d1.getTime()){//expired
                                                //   bcheckdatetime = true;
                                            }else{//expired
                                                // bcheckdatetime = true;
                                            }
                                        }else{//expired
                                            bcheckdatetime = true;
                                        }

                                    }
                                }
                            }

                        }
                    }
                }
                if(bcheckdatetime == false){
                    ArrayList <String> relatedkeyword = getRelatedKeyword(mainkey);
                    String strsynonym = recordFollowExactKey.get("status");
                    if(strsynonym != null){
                        strsynonym = strsynonym.trim();
                        if(strsynonym.length() > 0){
                            String []prefixlist = strsynonym.split(",");
                            if(prefixlist != null && prefixlist.length > 0)
                                for (int k = 0; k < prefixlist.length; k++){
                                    String strPrefix = prefixlist[k].trim();
                                    for (String itemkey: mKeywords){
                                        if(itemkey.compareToIgnoreCase(mainkey) == 0){
                                            continue;
                                        }else{
                                            itemkey = itemkey.toLowerCase().trim();
                                            strPrefix = strPrefix.toLowerCase();
                                            if(itemkey.contains(strPrefix) || strPrefix.contains(itemkey))
                                                relatedkeyword.add(itemkey);
                                        }

                                    }
                                }
                        }
                    }
                    JSONParser parser = new JSONParser();

                    try {

                        Object obj = parser.parse(result);
                        JSONObject jsonresult = new JSONObject();

                        JSONObject jsonObject =  (JSONObject) obj;


                        result = "";
                        Set<String> keySet = jsonObject.keySet();

                        ArrayList<Map<String, Object>> listObject = new ArrayList<>();
                        for (String key : keySet) {
                            Map<String, Object> temp = new HashMap<>();
                            temp.put(key, jsonObject.get(key));
                            listObject.add(temp);
                        }

                        Collections.sort(listObject, new Comparator<Map<String, Object>>()  {
                            @Override
                            public int compare(Map<String, Object> a, Map<String, Object> b)
                            {
                                JSONObject aobj = (JSONObject)a.get(a.keySet().toArray()[0]);
                                JSONObject bobj = (JSONObject)b.get(b.keySet().toArray()[0]);
                                int ano = 0;
                                int bno = 0;
                                String strTypea =  ((String)aobj.get("type"));
                                String strTypeb =  ((String)bobj.get("type"));

                                int pos = strTypea.indexOf("$");
                                if (pos != -1){
                                    ano = Integer.parseInt(strTypea.substring(pos+1));
                                }
                                pos = strTypeb.indexOf("$");
                                if (pos != -1){
                                    bno = Integer.parseInt(strTypeb.substring(pos+1));
                                }

                                if (ano < bno)
                                    return -1;
                                else if (ano > bno)
                                    return 1;
                                else
                                    return 0;
                            }
                        });

                        boolean b = false;
                        if(exactDescription.size() > 0){


                            String querydescription = combinewords(exactDescription).toLowerCase();
                            querydescription = querydescription.trim();
                            for ( Map<String, Object> a : listObject) {
                                String key = (String) a.keySet().toArray()[0];
                                Object value = a.get(key);

                                String keytemp = removeAccent(key).toLowerCase();

                                ArrayList<String> myList = new ArrayList<String>(Arrays.asList(keytemp.split(",")));
                                for (int item = 0; item < myList.size(); item ++){
                                    String temp = myList.get(item).trim();
                                    myList.set(item, temp);
                                }
                                keytemp = combinewords(myList);
                                if(keytemp.contains(querydescription) || querydescription.contains(keytemp)){
                                    result += genhtmlnode(key + " " + mainkey.toUpperCase(), (JSONObject)value, urlsearchconfig, mainkey);
                                    b = true;
                                    break;
                                }
                            }
                            if(b == false){
                                for ( Map<String, Object> a : listObject) {
                                    String key = (String) a.keySet().toArray()[0];
                                    Object value = a.get(key);
                                    result += genhtmlnode(key, (JSONObject)value, urlsearchconfig, mainkey);
                                }
                            }

                        }else{
                            for ( Map<String, Object> a : listObject) {
                                String key = (String) a.keySet().toArray()[0];
                                Object value = a.get(key);
                                result += genhtmlnode(key, (JSONObject)value, urlsearchconfig, mainkey);
                            }

                        }
                        result+= getRelatedKeyword(relatedkeyword, urlsearchkeyconfig);
                        String contenthtm = "<div style=\"background-color: #EFE8FB;border: 1px solid #BDC3B6;padding: 7px;\">";

                        String htmlmainkey = String.format("<div style=\"color: rgb(242, 116, 9); font-family: Times New Roman,Times,serif; font-size: 15px; font-weight: bold; margin-bottom: 10px; margin-right: 15px;\" >THÔNG TIN TRI THỨC VỀ  %s</div>", mainkey.toUpperCase());
                        contenthtm += htmlmainkey;
                        contenthtm += result;
                        contenthtm += "</div>";
                        jsonresult.put("package", "");
                        jsonresult.put("summary", contenthtm);
                        jsonresult.put("docid", "0");

                        result = jsonresult.toJSONString();

                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                }
                else{
                    result = "";

                    String contenthtm = "<div style=\"background-color: #EFE8FB;border: 1px solid #BDC3B6;padding: 7px;\">";

                    String htmlmainkey = String.format("<div style=\"color: rgb(242, 116, 9); font-family: Times New Roman,Times,serif; font-size: 15px; font-weight: bold; margin-bottom: 10px; margin-right: 15px;\" >KHUYẾN MẠI %s HIỆN TẠI KHÔNG ÁP DỤNG HOẶC HẾT HẠN</div>", mainkey.toUpperCase());
                    contenthtm += htmlmainkey;
                    contenthtm += result;
                    contenthtm += "</div>";
                    JSONObject jsonresult = new JSONObject();
                    jsonresult.put("package", "");
                    jsonresult.put("summary", contenthtm);
                    jsonresult.put("docid", "0");

                    result = jsonresult.toJSONString();
                }

            }

            conn.close();
        } catch (Exception e) {
            System.out.println(e);
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (pst != null) {
                try {
                    pst.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }
    public static String getToday(String format){
        Date date = new Date();
        return new SimpleDateFormat(format).format(date);
    }
    public String getRelatedKeyword(ArrayList<String> rkeyword, String urlsearchconfig){
        String result = "";

        if(rkeyword.size() > 0){

            result = "<div style=\"margin-top: 7px; color: rgb(242, 116, 9); font-family: Times New Roman,Times,serif; font-size: 15px; font-weight: bold;\">Từ khóa liên quan:  ";
            for (int i = 0; i < rkeyword.size(); i++){

                String []liststring = rkeyword.get(i).split(" ");
                String keyword = "";
                for (int j = 0; j < liststring.length; j++){
                    keyword += liststring[j];
                    if(j != liststring.length-1)
                        keyword += "+";
                }


                String urlsearchconfigtmp = String.format(urlsearchconfig, keyword+"&style=2");
                result += String.format("<a href=\"%s\" style=\"margin-right: 15px; color: rgb(0, 39, 255);font-style: italic !important; font-family: Times New Roman,Times,serif; font-size: 15px; font-weight: normal; text-decoration: underline ! important;\" onmouseover=\"this.style.textDecoration = 'underline !important'\" onmouseout=\"this.style.textDecoration = 'underline !important'\">%s</a>",  urlsearchconfigtmp, rkeyword.get(i));
            }

            result += "</div>";
        }

        return  result;
    }
    public String genhtmlnode(String key, JSONObject summarynode, String urlsearchconfig, String mainkey){
        String html = "";
        String keytemp = removeAccent(key);
        keytemp += " " + mainkey;
        String task = String.format("&Task=4&Keyword=%s&post=1", keytemp);
        urlsearchconfig = String.format(urlsearchconfig, summarynode.get("id"))+task;
        String summary = (String) summarynode.get("name");
        summary = summary.replaceAll("\r\n", "<br/>");
        summary = summary.replaceAll("\n", "<br/>");
        html = String.format("<div> <a href=\"%s\" style=\"margin-right: 15px;color: rgb(242, 116, 9); font-family: Times New Roman, Times, serif; font-size: 13px; font-weight:bold;text-decoration: underline !important;\" onmouseover=\"this.style.textDecoration = 'underline !important'\" onmouseout=\"this.style.textDecoration = 'underline !important'\">%s:</a>  <div style='margin-left:10px; font-family: Times New Roman, Times, serif; font-size: 15px;color: rgb(112, 15, 216);'>  %s</div> </div>",  urlsearchconfig, key, summary);
        return html;
    }

}
