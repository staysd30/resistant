/*  Fetch Category

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

public class AjaxGetProductsFilter extends HttpServlet {
	
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
	String vendor = (String)request.getParameter("vendor");
    String category = (String)request.getParameter("category");
    String help = (String)request.getParameter("help");
	String sort = (String)request.getParameter("sort");
	System.out.println(vendor);
	System.out.println(category);
	System.out.println(sort);

    String queryfirst = "";
	String querysort = " order by retail " + sort ;
	
	if((sort.equals("asc")) || (sort.equals("desc"))){
	System.out.println("first");
    if(!(vendor=="") && !(category=="")){
		  queryfirst += "select * from product where venID IN (" + vendor + ") AND catID IN (" + category + ") ";
		  queryfirst += querysort;
	}	
    else if(!(vendor=="") && (category=="")){
		 queryfirst += "select * from product where venID IN (" + vendor + ") ";
		 queryfirst += querysort;
	}
    else if((vendor=="") && !(category=="")){
		queryfirst += "select * from product where catID IN (" + category + ") ";
		queryfirst += querysort;
	}
    else{
   		queryfirst += "select * from product";
		queryfirst += querysort;
	}
	}
	else{
		System.out.println("second");
		if(!(vendor=="") && !(category=="")){
		  queryfirst += "select * from product where venID IN (" + vendor + ") AND catID IN (" + category + ") ";
		  
	}	
    else if(!(vendor=="") && (category=="")){
		 queryfirst += "select * from product where venID IN (" + vendor + ") ";
	}
    else if((vendor=="") && !(category=="")){
		queryfirst += "select * from product where catID IN (" + category + ") ";
	}
    else{
   		queryfirst += "select * from product";
	}
	}
	
	Vector<String[]> v = DBHelper.runQuery(queryfirst);
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



