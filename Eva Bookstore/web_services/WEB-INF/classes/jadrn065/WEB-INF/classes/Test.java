/*  Login.java
    Sample login servlet
    Alan Riggins    
    CS645
    Spring 2017
 */

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;



public class Test extends HttpServlet { 
    public void doGet(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  { 
	//String toDo = "INSERT into users values('jdoe','abc');";
	//int count = DBHelper.executeCommand(toDo);
	PrintWriter out = response.getWriter();
	int count = 100;
	String user = request.getParameter("user");
	out.println("There were " + count + " rows affected.");
	out.println("The user is " + user);
  
        }      
}



