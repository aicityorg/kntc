package cukin.com.kntc.knvb;

import cukin.com.kntc.utils.utils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

/**
 * Created by thanhtn10 on 3/23/16.
 */
public class KNVBServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/plain");
        response.addHeader("Access-Control-Allow-Origin", "*");
        PrintWriter out = response.getWriter();
        StringBuffer jb = new StringBuffer();
        String line = null;
        try {
            BufferedReader reader = request.getReader();
            while ((line = reader.readLine()) != null)
                jb.append(line);
        } catch (Exception e) { /*report an error*/ }

        //    try {
        //       Object obj = parser.parse(jb.toString());

        //     JSONObject jsonObject =  (JSONObject) obj;
        Map<String , String> params = utils.getParameters(jb.toString());

        String mysqlurl= getServletContext().getInitParameter("mysqlhost");
        String mysqluser = getServletContext().getInitParameter("mysqluser");
        String mysqlpass = getServletContext().getInitParameter("mysqlpass");

        String method = params.get("method");
        if(method.compareTo("insert") == 0){
            String data=params.get("data");
            data = data.replaceAll("<br/>", "\r\n");
            String updatedtime = params.get("uptime");
            String type = params.get("type");
            out.write(KNVBService.insert_data(mysqlurl, mysqluser, mysqlpass, data, updatedtime, type));
        }else if(method.compareTo("update") == 0){
            String data=params.get("data");
            data = data.replaceAll("<br/>", "\r\n");
            String updatedtime = params.get("uptime");
            String type = params.get("type");
            String id = params.get("key");

            out.write(KNVBService.update_data(mysqlurl, mysqluser, mysqlpass, data, updatedtime, type, id));
        }else if(method.compareTo("del") == 0){
            String id = params.get("key");
            out.write(KNVBService.delete_data(mysqlurl, mysqluser, mysqlpass, id));
        }
        out.close();
    }
}
