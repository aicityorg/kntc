package cukin.com.kntc.uploadkeywordlist;

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
 * Created by thanhtn10 on 3/28/16.
 */
public class UploadKeywordListServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");

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

        String keyword = params.get("keyword");
        String cmd = params.get("cmd");
        UploadKeywordListService service = new UploadKeywordListService();
        if(cmd.compareTo("get") == 0)
            out.write(service.search_key(mysqlurl, mysqluser, mysqlpass));
        else
            out.write(service.uploaddata(mysqlurl, mysqluser, mysqlpass, keyword));
        out.close();
    }
}
