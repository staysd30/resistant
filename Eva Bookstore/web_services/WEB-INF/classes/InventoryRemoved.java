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

public class InventoryRemoved extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException
    {
        HttpSession session = request.getSession(false);
        if(session == null)
	 {    
            ServletContext context = getServletContext();       
            RequestDispatcher dispatcher 
            = request.getRequestDispatcher("/WEB-INF/jsp/login_err.jsp");   
            dispatcher.forward(request, response);              
        }    

        String sku = (String) request.getParameter("sku");
        String qty = (String) request.getParameter("quantity");
        String date = (String) request.getParameter("date");
		String query = "select * from on_hand where sku ='" + sku + "';";
		Vector<String[]> sqlResult = DBHelper.runQuery(query);
		PrintWriter result = response.getWriter();
		if(sqlResult.isEmpty())
		{
			result.print("-1");
			
		}
        else 
		{
        String sql_1 = "UPDATE on_hand SET on_hand_quantity = on_hand_quantity - "+qty+", last_date_modified = '"+date+"' WHERE sku = '"+sku+"' AND on_hand_quantity >= "+qty+";";

        int sql_1_Result = Integer.parseInt(DBHelper.updateQuery(sql_1));
        
             if(sql_1_Result==0)
			       {
					 result.print("Could not remove from inventory!");
				   }
             else{
                   String sql_2 = "INSERT INTO merchandise_out VALUES ('"+sku+"','"+date+"',"+qty+");";
                   int sql_2_Result = Integer.parseInt(DBHelper.updateQuery(sql_2));
                   if(sql_2_Result==0){
                result.print("Could not insert in merchandise out!");
                                      }
                  else{
                       result.print("Successfully removed "+qty+" from inventory!!");
                      }
                }
		}

    }
    
    public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws IOException, ServletException
    {
        doGet(request, response);
    }  
}
