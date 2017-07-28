/* Hera Siddiqui
   jadrn061
   spring 2017
   cs645

*/


import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;
public class GetQuantity extends HttpServlet {
    public void doGet(HttpServletRequest request,HttpServletResponse response)
    throws IOException, ServletException
    {
        HttpSession session = request.getSession(false);
        if(session == null) {    
            ServletContext context = getServletContext();       
            RequestDispatcher dispatcher 
            = request.getRequestDispatcher("/WEB-INF/jsp/login_err.jsp");   
            dispatcher.forward(request, response);              
        }    
        String sku = (String) request.getParameter("sku");
		String query = "select on_hand_quantity from on_hand where sku ='" + sku + "'";
        Vector<String[]> sqlResult = DBHelper.runQuery(query);
		PrintWriter result = response.getWriter();
        if(sqlResult.isEmpty()) {result.print("Could not fetch quantity");}
        else{

            String output = "[";			
            for(String[] x:sqlResult){
				 output += "[";
                for (String s:x){
                    output += "\"" + s + "\",";
                }
                output = output.substring(0, output.length()-1);
                output += "],";
            }
            output = output.substring(0, output.length()-1);
            output += "]";
           result.print(output);
		  
        }
    }
    
    public void doPost(HttpServletRequest request,HttpServletResponse response)
    throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}



