/*  Fetch CartSize

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



public class CartSize extends HttpServlet { 
          
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
			myCartProducts = cartBean.getCartProducts();
			int productsin = myCartProducts.size();
			
			
			int count=cartBean.getProductCount();
			result.println(count);
	
        }      
}



