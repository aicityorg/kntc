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

    public static String search_keyword_byid(String url,String userName, String password,String strid){
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        String result = "";
        String dbName = "db_summary?useUnicode=true&characterEncoding=UTF-8";
        String driver = "com.mysql.jdbc.Driver";

        try {
            Class.forName(driver).newInstance();
            conn = DriverManager
                    .getConnection(url + dbName, userName, password);
            String insert = "select summary, keyword from tbl_summary";

            pst = conn
                    .prepareStatement(insert);
            rs = pst.executeQuery();
            String strSearch = String.format("\"id\":\"%s\"", strid);
            while(rs.next()){
                if(strid.compareTo("*") == 0){
                    result += rs.getString("keyword");
                    result += "$";
                }else{
                    String summary = rs.getString("summary");
                    if(summary.indexOf(strSearch) != -1){
                        result += rs.getString("keyword");
                        result += "$";
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
    public static String search_samekeyword(String url,String userName, String password,String strkeyword){
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        String result = "";
        String dbName = "db_summary?useUnicode=true&characterEncoding=UTF-8";
        String driver = "com.mysql.jdbc.Driver";

        try {
            Class.forName(driver).newInstance();
            conn = DriverManager
                    .getConnection(url + dbName, userName, password);
            String insert = "select keyword from tbl_summary";

            pst = conn
                    .prepareStatement(insert);
            rs = pst.executeQuery();
            while(rs.next()){

                String keyword = rs.getString("keyword");
                if(keyword.compareToIgnoreCase(strkeyword) == 0){
                    result += keyword;
                    result += "$";
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
    public static String search_keyword_bykeyword(String url,String userName, String password,String strkeyword){
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        String result = "";
        String dbName = "db_summary?useUnicode=true&characterEncoding=UTF-8";
        String driver = "com.mysql.jdbc.Driver";

        try {
            Class.forName(driver).newInstance();
            conn = DriverManager
                    .getConnection(url + dbName, userName, password);
            String insert = "select keyword from tbl_summary";

            pst = conn
                    .prepareStatement(insert);
            rs = pst.executeQuery();
            while(rs.next()){
                if(strkeyword.compareTo("*") == 0){
                    result += rs.getString("keyword");
                    result += "$";
                }else{
                    String keyword = rs.getString("keyword");
                    keyword = keyword.toLowerCase();
                    strkeyword = strkeyword.toLowerCase();
                    if(keyword.indexOf(strkeyword) != -1){
                        result += rs.getString("keyword");
                        result += "$";
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
        String dbName = "db_summary?useUnicode=true&characterEncoding=UTF-8";
        String driver = "com.mysql.jdbc.Driver";
        String description = "";
        String type = "";
        String updatedtime = "";
        String related = "";
        try {
            Class.forName(driver).newInstance();
            conn = DriverManager
                    .getConnection(url + dbName, userName, password);
            String insert = "select * from tbl_summary where keyword=?";

            pst = conn
                    .prepareStatement(insert);
            pst.setString(1, keyword);

            rs = pst.executeQuery();
            while(rs.next()){
                result=rs.getString("summary");
                description = rs.getString("decription");
                keyword = rs.getString("keyword");
                type = rs.getString("type");
                updatedtime = rs.getString("account");
                related = rs.getString("status");
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
            jsonresult.put("keyword", keyword);
            jsonresult.put("description", description);
            jsonresult.put("related", related);
            jsonresult.put("updatedtime", updatedtime);
            result = result.replaceAll("=", "@#");
            result = result.replaceAll("&", "@2@");
            if(result.length() == 0)
                result = "{}";
            Object obj = parser.parse(result);


            JSONObject jsonObject =  (JSONObject) obj;

            jsonresult.put("summary", jsonObject);

        } catch (ParseException e) {
            e.printStackTrace();
        }



        return jsonresult.toJSONString();
    }
}
