/*
  Hera Siddiqui
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
public class OnHandProductDetails extends HttpServlet {
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
		String query = "select * from on_hand where sku ='" + sku + "'";
        Vector<String[]> sqlResult = DBHelper.runQuery(query);
		PrintWriter result = response.getWriter();
        if(sqlResult.isEmpty()) {result.print("-1");}
		  else{
			  String query1 = "select * from product where sku ='" + sku + "'";
			  Vector<String[]> sqlResult1 = DBHelper.runQuery(query1);
			   if(sqlResult1.isEmpty()) {result.print("Error in fetching data from product table!");}
			  
		  
           else{

            String output = "[[";
            for(String[] x:sqlResult1){
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
	}
    
    public void doPost(HttpServletRequest request,HttpServletResponse response)
    throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}



