package cukin.com.kntc.uploadkeywordlist;


import java.io.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.StringTokenizer;

/**
 * Created by thanhtn10 on 3/28/16.
 */
public class UploadKeywordListService {

    final static String KEYWORDLIST = "$$KEYWORDLISTKIN$$";

    public static boolean checkexistingkeyword(String url,String userName, String password){

        boolean status = false;
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        String dbName = "db_summary?useUnicode=true&characterEncoding=UTF-8";
        String driver = "com.mysql.jdbc.Driver";
        try {
            Class.forName(driver).newInstance();
            conn = DriverManager
                    .getConnection(url + dbName, userName, password);


            String select = "SELECT * FROM db_summary.tbl_description WHERE account=?";
            pst = conn
                    .prepareStatement(select);
            pst.setString(1, KEYWORDLIST);
            rs = pst.executeQuery();
            while(rs.next()){
                status = true;
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

        return status;
    }
    public static String insert_key(String url,String userName, String password, String keyword) {

        String status = "true";
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;

        String dbName = "db_summary?useUnicode=true&characterEncoding=UTF-8";
        String driver = "com.mysql.jdbc.Driver";
        try {
            Class.forName(driver).newInstance();
            conn = DriverManager
                    .getConnection(url + dbName, userName, password);
            String insert = "insert into db_summary.tbl_description (keyword,account)" +
                    " VALUES (?,?)";
            pst = conn
                    .prepareStatement(insert);
            pst.setString(1, keyword);
            pst.setString(2, KEYWORDLIST);
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
    public static String update_key(String url,String userName, String password, String keyword){
        String status = "true";
        Connection conn = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        String dbName = "db_summary?useUnicode=true&characterEncoding=UTF-8";
        String driver = "com.mysql.jdbc.Driver";
        try {
            Class.forName(driver).newInstance();
            conn = DriverManager
                    .getConnection(url + dbName, userName, password);


            String insert = "update db_summary.tbl_description set keyword=? where account=?";
            pst = conn
                    .prepareStatement(insert);
            pst.setString(1, keyword);
            pst.setString(2, KEYWORDLIST);
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
public static String uploaddata(String url,String userName, String password, String keyword){
    if(checkexistingkeyword(url, userName, password) == true)
        return update_key(url, userName, password, keyword);

    return insert_key(url,userName, password, keyword);
}

public static String[] SplitUsingTokenizer(String subject, String delimiters) {
    StringTokenizer strTkn = new StringTokenizer(subject, delimiters);
    ArrayList<String> arrLis = new ArrayList<String>(subject.length());

    while(strTkn.hasMoreTokens())
        arrLis.add(strTkn.nextToken());

    return arrLis.toArray(new String[0]);
}
       public static void  uploadkeywordlist(String filename, String keyword) throws IOException {
            File fout = new File(filename);
            FileOutputStream fos = new FileOutputStream(fout);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fos));
            String []list = SplitUsingTokenizer(keyword, "@1@");
            for (int i = 0; i < list.length; i++) {
                bw.write(list[i]);
                bw.newLine();
            }

            bw.close();
    }

    public static String search_key(String url,String userName, String password) {
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
            String select = "SELECT * FROM db_summary.tbl_description WHERE account=?";
            pst = conn
                    .prepareStatement(select);
            pst.setString(1, KEYWORDLIST);
            rs = pst.executeQuery();

            while(rs.next()){
                result=rs.getString("keyword");
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
}
