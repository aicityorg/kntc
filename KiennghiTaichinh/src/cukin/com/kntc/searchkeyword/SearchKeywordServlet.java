package cukin.com.kntc.searchkeyword;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * Created by thanhtn10 on 3/28/16.
 */
public class SearchKeywordServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");

        String jb = request.getParameter("q");
        PrintWriter out = response.getWriter();

        try {
            ArrayList<String> myList = new ArrayList<String>(Arrays.asList(jb.split("`")));
            for (int item = 0; item < myList.size(); item ++){
                String temp = myList.get(item).trim();
                myList.set(item, temp);
            }
            String urlsearchconfig= getServletContext().getInitParameter("urlsearch");
            String urlsearchkeyconfig= getServletContext().getInitParameter("urlkeysearch");
            String mysqlurl= getServletContext().getInitParameter("mysqlhost");
            String mysqluser = getServletContext().getInitParameter("mysqluser");
            String mysqlpass = getServletContext().getInitParameter("mysqlpass");

            SearchKeywordService ob = new SearchKeywordService();
            out.print(ob.search_keyword(myList, mysqlurl, mysqluser, mysqlpass, urlsearchconfig, urlsearchkeyconfig));

        } catch (Exception e) {
            e.printStackTrace();
        }
        out.close();
    }


}
