/*  Fetch Products

    Hera Siddiqui
    jadrn061	
    CS645
    Spring 2017
 */




import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;

/**
 * The simplest possible servlet.
 *
 * @author James Duncan Davidson
 */

public class AjaxGetProducts2 extends HttpServlet {
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
        throws IOException, ServletException  {
	String message ="";
	PrintWriter out = response.getWriter();
	Vector<String[]> v = DBHelper.runQuery("select * from product;");
	//System.out.println(v);
	ProductBean [] beans = new ProductBean[v.size()];
	for(int i=0; i < v.size(); i++)  {
		String [] tmp = v.elementAt(i);
		String query = "select on_hand_quantity from on_hand where sku ='" + tmp[0] + "'";
        String sqlResult = DBHelper.doQueryTry(query);
		if(sqlResult.isEmpty()) {message = "product coming soon";}
		else if(Integer.parseInt(sqlResult)== 0)
			{message = "more on the way";}
		else 
			{message = "In stock";}
		String query1 = "select name from category where id ='" + tmp[1] + "'";
        String sqlResult1 = DBHelper.doQueryTry(query1);
		String query2 = "select name from vendor where id ='" + tmp[2] + "'";
        String sqlResult2 = DBHelper.doQueryTry(query2);
		beans[i] = new ProductBean(tmp[0],sqlResult1,sqlResult2,tmp[3],tmp[4],
			tmp[5],tmp[8],Float.parseFloat(tmp[6]),Float.parseFloat(tmp[7]),message);
		}
	request.setAttribute("p_beans",beans);
	String toDo = "/WEB-INF/jsp/AjaxProducts.jsp";
        RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher(toDo); 
        dispatcher.forward(request, response);  						    

    }
}



