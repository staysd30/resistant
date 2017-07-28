/*  Fetch Vendor

    Hera Siddiqui
    jadrn061	
    CS645
    Spring 2017
 */

import java.io.*;
import java.util.Vector;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;



public class FetchVendor extends HttpServlet { 
          
    public void doPost(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {
        processRequest(request, response);         
        }

    public void doGet(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  { 
        processRequest(request, response);
        } 
        
    private void processRequest(HttpServletRequest request,
              HttpServletResponse response) 
                        throws IOException, ServletException {
        String query = "SELECT id,name FROM vendor";
         
	    PrintWriter out = response.getWriter(); 
        String answer = DBHelper.query(query);	
		out.println(answer);
	
	
        }      
}



