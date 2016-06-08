package cukin.com.kntc.knvb;

import cukin.com.kntc.database.DataProcess;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.sql.*;


/**
 * Created by thanhtn10 on 3/24/16.
 */
public class KNVBService {

    public static String insert_data(String url,String userName, String password,String data,String updatedtime, String type) {
        return DataProcess.insert_data(url, userName, password, data, updatedtime, type);
    }
    public static String update_data(String url,String userName, String password,String data,String updatedtime, String type, String id){

        return DataProcess.update_data(url, userName, password, data, updatedtime, type, id);
    }
    public static String delete_data(String url,String userName, String password,String id) {
        return DataProcess.delete_data(url, userName,  password, id);
    }
}
