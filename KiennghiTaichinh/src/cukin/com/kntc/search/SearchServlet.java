package cukin.com.kntc.search;

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
public class SearchServlet extends HttpServlet {
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

        String keyword = params.get("keyword")/*.replaceAll("<", "#60").replaceAll(">", "#62")*/;
        String type = params.get("type");

        String mysqlurl= getServletContext().getInitParameter("mysqlhost");
        String mysqluser = getServletContext().getInitParameter("mysqluser");
        String mysqlpass = getServletContext().getInitParameter("mysqlpass");


        if(type.compareTo("id") == 0){
            out.write(SearchService.search_keyword_byid(mysqlurl, mysqluser, mysqlpass, keyword));
        }else if(type.compareTo("key") == 0){
            out.write(SearchService.search_keyword_bykeyword(mysqlurl, mysqluser, mysqlpass, keyword));
        }else if(type.compareTo("same") == 0){
            out.write(SearchService.search_samekeyword(mysqlurl, mysqluser, mysqlpass, keyword));
        }
        else{
            out.write(SearchService.search_data(mysqlurl, mysqluser, mysqlpass, keyword));
        }

        out.close();
    }
}
