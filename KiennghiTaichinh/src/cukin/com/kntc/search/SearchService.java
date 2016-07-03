package cukin.com.kntc.search;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.Base64;

/**
 * Created by thanhtn10 on 3/28/16.
 */
public class SearchService {

    public static String search_keyword_byid(String url,String userName, String password,String strYear, String strType, String strKeyword){
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        String result = "";
        String dbName = "db_kntc?useUnicode=true&characterEncoding=UTF-8";
        String driver = "com.mysql.jdbc.Driver";
        if(strKeyword == null)
            strKeyword = "";
        if(strYear == null)
            strYear = "";
        try {
            Class.forName(driver).newInstance();
            conn = DriverManager
                    .getConnection(url + dbName, userName, password);
            String insert = "select * from  db_kntc.tbl_kntc where type=?";

            pst = conn
                    .prepareStatement(insert);
            pst.setString(1, strType);

            rs = pst.executeQuery();
            JSONParser parser = new JSONParser();

            while(rs.next()){
                String data = rs.getString("data");
                Object obj = parser.parse(data);
                JSONObject jsonObject =  (JSONObject) obj;
                if(strYear.length() == 0 && strKeyword.length() == 0){
                    result += Integer.toString(rs.getInt("id")) + "#"+jsonObject.get("namtc");
                    result += "$";
                }else if(strYear.length() > 0){
                    if(data.indexOf(strYear) != -1){
                        if(strKeyword.length() > 0){
                            if(data.indexOf(strKeyword) != -1){
                                result += Integer.toString(rs.getInt("id")) + "#"+jsonObject.get("namtc");
                                result += "$";
                            }
                        }else {
                            result += Integer.toString(rs.getInt("id")) + "#"+jsonObject.get("namtc");
                            result += "$";
                        }

                    }
                }else{
                    if(strKeyword.length() > 0){
                        if(data.indexOf(strKeyword) != -1){
                            result += Integer.toString(rs.getInt("id")) + "#"+jsonObject.get("namtc");
                            result += "$";
                        }
                    }
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

    public static String search_data(String url,String userName, String password,String keyword) {
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        String result = "";
        String dbName = "db_kntc?useUnicode=true&characterEncoding=UTF-8";
        String driver = "com.mysql.jdbc.Driver";
        String type = "";
        String updatedtime = "";

        try {
            Class.forName(driver).newInstance();
            conn = DriverManager
                    .getConnection(url + dbName, userName, password);
            String insert = "select * from  db_kntc.tbl_kntc where id=?";

            pst = conn
                    .prepareStatement(insert);
            pst.setInt(1, Integer.parseInt(keyword));

            rs = pst.executeQuery();
            while(rs.next()){
                result=rs.getString("data");
                type = rs.getString("type");
                updatedtime = rs.getString("uptime");
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

        result = result.replaceAll("\r\n","<br/>");
        result = result.replaceAll("\n","<br/>");

        JSONParser parser = new JSONParser();
        JSONObject jsonresult = new JSONObject();

        try {
            jsonresult.put("type", type);
            jsonresult.put("updatedtime", updatedtime);
            result = result.replaceAll("=", "@#");
            result = result.replaceAll("&", "@2@");
            if(result.length() == 0)
                result = "{}";
            Object obj = parser.parse(result);


            JSONObject jsonObject =  (JSONObject) obj;

            jsonresult.put("data", jsonObject);

        } catch (ParseException e) {
            e.printStackTrace();
        }



        return jsonresult.toJSONString();
    }
}
