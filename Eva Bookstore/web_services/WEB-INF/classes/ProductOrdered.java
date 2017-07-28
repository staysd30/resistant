/*  Product Ordered

    Hera Siddiqui
    jadrn061	
    CS645
    Spring 2017
 */
import java.util.ArrayList;
import java.io.*;
import java.util.Vector;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;
import java.util.Date;
import java.text.SimpleDateFormat;

public class ProductOrdered extends HttpServlet { 
         
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
             ArrayList myCartProducts = new ArrayList();
	         HttpSession session = request.getSession();
			 CartBean cartBean = null;
	         Object objCartBean = session.getAttribute("jadrn061");
			 if(objCartBean!=null) {
               cartBean = (CartBean) objCartBean ;
             } else {
            cartBean = new CartBean();
             }
	    
	   
	   PrintWriter result = response.getWriter();
	   int line= cartBean.getLineProductsCount();
	   String sku="";
	   int quantity=0;
	   Date date1 = new Date();
	   String date = new SimpleDateFormat("yyyy-MM-dd").format(date1);
	   myCartProducts = cartBean.getCartProducts();
	   for(int size=0;size<line;size++) {
       CartProductBean cartProduct= (CartProductBean) myCartProducts.get(size);
       sku=cartProduct.getSku();
	   quantity=cartProduct.getQuantity();
	   String sql_1 = "UPDATE on_hand SET on_hand_quantity = on_hand_quantity - "+quantity+", last_date_modified = '"+date+"' WHERE sku = '"+sku+"' AND on_hand_quantity >= "+quantity+";";

        int sql_1_Result = Integer.parseInt(DBHelper.updateQuery(sql_1));
        
             if(sql_1_Result==0)
			       {
					 result.print("Could not remove from inventory!");
					  
				   }
             else{
                   String sql_2 = "INSERT INTO merchandise_out VALUES ('"+sku+"','"+date+"',"+quantity+");";
                   int sql_2_Result = Integer.parseInt(DBHelper.updateQuery(sql_2));
                   if(sql_2_Result==0){
                     result.print("Could not insert in merchandise out!");
                                      }
                  else{
                       result.print("Order successfully placed");
                      }
                }
    
  }
  session.removeAttribute("jadrn061"); 
  session.invalidate();
  
     }      
}



