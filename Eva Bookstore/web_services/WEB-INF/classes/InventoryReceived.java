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
public class InventoryReceived extends HttpServlet {
    public void doGet(HttpServletRequest request,
      HttpServletResponse response)
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
        String qty = (String) request.getParameter("quantity");
        String date = (String) request.getParameter("date");
		String query = "select * from on_hand where sku ='" + sku + "';";
		Vector<String[]> sqlResult = DBHelper.runQuery(query);
		PrintWriter result = response.getWriter();
		if(sqlResult.isEmpty())
		{
			String sql_2 = "INSERT INTO on_hand (sku, last_date_modified, on_hand_quantity) VALUES('"+sku+"','"+date+"',"+qty+");";
			int sql_2_Result = Integer.parseInt(DBHelper.updateQuery(sql_2));
			if(sql_2_Result==0){
                result.print("Could not insert data in on_hand table!");
            }
            else{
                result.print("Data inserted in on_hand table.");
            }
		}
		else
		{
			String sql_2 = "UPDATE on_hand  set last_date_modified = '"+date+"', on_hand_quantity = on_hand_quantity + "+qty+" where sku ='"+sku+"';";
			int sql_2_Result = Integer.parseInt(DBHelper.updateQuery(sql_2));
			 if(sql_2_Result==0){
                result.print("Could not update on_hand table.");
            }
            else{
                result.print("On_hand table updated!!");
            } 
		}
        String sql_1 = "INSERT INTO merchandise_in VALUES ('"+sku+"','"+date+"',"+qty+");";
        int sql_1_Result = Integer.parseInt(DBHelper.updateQuery(sql_1));
       
        if(sql_1_Result==0) result.print("Could not insert in merchandise in table!");
		else result.print("Your data was inserted !!");
     

    }
    
    public void doPost(HttpServletRequest request,HttpServletResponse response)
    throws IOException, ServletException
    {
    	doGet(request, response);
    }  
}

