package cukin.com.kntc.auth; /**
 * Created by thanhtn10 on 3/23/16.
 */

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;



public class LoginServlet extends HttpServlet{

    private static final long serialVersionUID = 1L;

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/plain");

        PrintWriter out = response.getWriter();

        String n=request.getParameter("username");
        String p=request.getParameter("userpass");
        String mysqlurl= getServletContext().getInitParameter("mysqlhost");
        String mysqluser = getServletContext().getInitParameter("mysqluser");
        String mysqlpass = getServletContext().getInitParameter("mysqlpass");
        HttpSession session = request.getSession(false);
        if(session!=null)
            session.setAttribute("name", n);

        if(LoginVT.validate(mysqlurl, mysqluser, mysqlpass, n, p)){
            RequestDispatcher rd=request.getRequestDispatcher("import.jsp");
            rd.forward(request,response);
        }
        else{
            out.print("<p style=\"color:red\">Sorry username or password error</p>");
            RequestDispatcher rd=request.getRequestDispatcher("index.jsp");
            rd.include(request,response);
        }

        out.close();
    }
}