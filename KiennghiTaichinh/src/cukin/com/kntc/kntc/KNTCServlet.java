package cukin.com.kntc.kntc;

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
public class KNTCServlet extends HttpServlet {
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

        Map<String , String> params = utils.getParameters(jb.toString());

        String mysqlurl= getServletContext().getInitParameter("mysqlhost");
        String mysqluser = getServletContext().getInitParameter("mysqluser");
        String mysqlpass = getServletContext().getInitParameter("mysqlpass");

        String data=params.get("data");
        data = data.replaceAll("<br/>", "\r\n");
        String updatedtime = params.get("uptime");
        String type = params.get("type");
        out.write(KNTCService.insert_data(mysqlurl, mysqluser, mysqlpass, data, updatedtime, type));
        out.close();
    }
}
