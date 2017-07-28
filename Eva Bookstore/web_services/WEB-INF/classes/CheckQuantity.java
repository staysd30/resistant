/* Hera Siddiqui
   jadrn061
   spring 2017
   cs645
   Project#3

*/


import java.io.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;
public class CheckQuantity extends HttpServlet {
    public void doGet(HttpServletRequest request,HttpServletResponse response)
    throws IOException, ServletException
    {
        HttpSession session = request.getSession(false);
        int returnquan=0; 
        String sku = (String) request.getParameter("sku");
		String query = "select on_hand_quantity from on_hand where sku ='" + sku + "'";
        String sqlResult = DBHelper.doQueryTry(query);
		PrintWriter result = response.getWriter();
        if(sqlResult.isEmpty()) {result.print("Could not fetch quantity");}
        else{
          returnquan = Integer.parseInt(sqlResult); 
		  result.print(returnquan);
        }
    }
    
    public void doPost(HttpServletRequest request,HttpServletResponse response)
    throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}



