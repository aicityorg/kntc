package cukin.com.kntc.database;

import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.sql.*;

/**
 * Created by kinkin on 08/06/2016.
 */
public class DataProcess {

    public static String update_data(String url,String userName, String password,String data,String updatedtime, String type, String id){

        String str = data.replaceAll("<br/>", "\r\n");
        String encoded = str.replaceAll("@1@", "%");
        encoded = encoded.replaceAll("@#", "=");
        encoded = encoded.replaceAll("@2@", "&");
        JSONParser parser = new JSONParser();
        try {
            Object obj = parser.parse(encoded);
            encoded =  (String) obj;
        }catch (ParseException e) {
            e.printStackTrace();
        }

        String status = "true";
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;

        String dbName = "db_kntc?useUnicode=true&characterEncoding=UTF-8";
        String driver = "com.mysql.jdbc.Driver";
        try {
            Class.forName(driver).newInstance();
            conn = DriverManager
                    .getConnection(url + dbName, userName, password);

            String strUpdate = "update tbl_kntc set data=?, type = ?, uptime = ? where id=?";

            pst = conn
                    .prepareStatement(strUpdate);
            pst.setString(1, encoded);
            pst.setString(2, type);
            pst.setString(3, updatedtime);
            pst.setString(4, id);

            pst.executeUpdate();
            conn.close();
        } catch (Exception e) {
            status = "false";
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
        return status;
    }
    public static String insert_data(String url,String userName, String password,String data,String updatedtime, String type) {

        String str = data.replaceAll("<br/>", "\r\n");
        String encoded = str.replaceAll("@1@", "%");
        encoded = encoded.replaceAll("@#", "=");
        encoded = encoded.replaceAll("@2@", "&");
        JSONParser parser = new JSONParser();
        try {
            Object obj = parser.parse(encoded);
            encoded =  (String) obj;
        }catch (ParseException e) {
            e.printStackTrace();
        }

        String status = "true";
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;

        String dbName = "db_kntc?useUnicode=true&characterEncoding=UTF-8";
        String driver = "com.mysql.jdbc.Driver";
        try {
            Class.forName(driver).newInstance();
            conn = DriverManager
                    .getConnection(url + dbName, userName, password);
            String insert = "insert into tbl_kntc (data, type,uptime)" +
                    " VALUES (?,?,?)";
            pst = conn
                    .prepareStatement(insert);
            pst.setString(1, encoded);
            pst.setString(2, type);
            pst.setString(3, updatedtime);
            pst.executeUpdate();
            conn.close();
        } catch (Exception e) {
            System.out.println(e);
            status = "false";
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
        return status;
    }
    public static String delete_data(String url,String userName, String password,String id) {
        String status = "true";
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        String dbName = "db_kntc?useUnicode=true&characterEncoding=UTF-8";
        String driver = "com.mysql.jdbc.Driver";
        try {
            Class.forName(driver).newInstance();
            conn = DriverManager
                    .getConnection(url + dbName, userName, password);
            String insert = "delete from tbl_kntc where id=?";
            pst = conn
                    .prepareStatement(insert);
            pst.setString(1, id);

            pst.executeUpdate();
            conn.close();
        } catch (Exception e) {
            status = "false";
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
        return status;
    }
}
