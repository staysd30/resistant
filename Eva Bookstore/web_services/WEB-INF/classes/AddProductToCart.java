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

public class AddProductToCart extends HttpServlet {
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
		
	ArrayList myCartProducts = new ArrayList();	
	HttpSession session = request.getSession();
    CartBean cartBean = null;
	Object objCartBean = session.getAttribute("jadrn061");
			 if(objCartBean!=null) {
               cartBean = (CartBean) objCartBean ;
             } else {
            cartBean = new CartBean();
			session.setAttribute("jadrn061", cartBean);
             }			
	String message ="";	
    String sku = (String) request.getParameter("sku");	
	String quantity = (String) request.getParameter("quantity");
	PrintWriter out = response.getWriter();
	String query = "select on_hand_quantity from on_hand where sku ='" + sku + "'";
    String sqlResult = DBHelper.doQueryTry(query);
	int onhand=Integer.parseInt(sqlResult);
	int quantityparse= (Integer.parseInt(quantity));
	if((Integer.parseInt(sqlResult)) >=(Integer.parseInt(quantity)))
	{
		String sku1="";
		int quantity1=0;
		int productIndex=0;
		int line= cartBean.getLineProductsCount();
		int quantityhelper=0;
		myCartProducts = cartBean.getCartProducts();
	    for(int size=0;size<line;size++) {
        CartProductBean cartProduct= (CartProductBean) myCartProducts.get(size);
        sku1=cartProduct.getSku();
	    quantity1=cartProduct.getQuantity();
		productIndex=size;
		System.out.println("/////////////////////////in for loop");
		System.out.println(productIndex);
		System.out.println(sku1);
		System.out.println(sku1);
		}
		if(sku.equals(sku1))
		    {
			quantityparse=quantityparse+quantity1;
			
			if(quantityparse > onhand)
			    {
				quantityhelper= onhand-quantity1;
				out.print("Cannot add "+quantity+" .You can add upto " +quantityhelper+" products");
			    }
			else {
				  cartBean.addAlreadyCart(productIndex,quantityparse);
			     }
			
		   }
		
	
		else {
		
	    Vector<String[]> v = DBHelper.runQuery("select * from product where sku ='" +sku + "';");
		for(int i=0; i < v.size(); i++)  {
		String [] tmp = v.elementAt(i);
		String query1 = "select name from category where id ='" + tmp[1] + "'";
        String sqlResult1 = DBHelper.doQueryTry(query1);
		String query2 = "select name from vendor where id ='" + tmp[2] + "'";
        String sqlResult2 = DBHelper.doQueryTry(query2);
		
		message ="product in cart";
        cartBean.addCartProduct(tmp[0],sqlResult1,sqlResult2,tmp[3],tmp[4],tmp[5],tmp[8],tmp[6],tmp[7],message,quantity);
		}
		out.print("product added to cart");
	    }
	    					    
          
    }
	else {out.print("Could not add only "+ Integer.parseInt(sqlResult)+ " in stock");}
}



}