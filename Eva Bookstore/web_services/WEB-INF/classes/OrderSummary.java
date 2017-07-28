
import java.io.*;
import java.util.*;
import java.util.Vector;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;



public class OrderSummary extends HttpServlet { 
          
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
       String toDo=""; 
	   String name = request.getParameter("name");
	   String address1 = request.getParameter("address1");
	   String address2 = request.getParameter("address2");
	   String city = request.getParameter("city");
	   String state = request.getParameter("state");
       String zipcode = request.getParameter("zipcode");
	   String phone = request.getParameter("phone");
	   
	         ArrayList myCartProducts = new ArrayList();
	         HttpSession session = request.getSession();
			 CartBean cartBean = null;
	         Object objCartBean = session.getAttribute("jadrn061");
			  
			 if(objCartBean!=null) {
               cartBean = (CartBean) objCartBean ;
			   
             } else {
            
			System.out.println("Your session has expired");
            }
	    int line= cartBean.getLineProductsCount();
		myCartProducts = cartBean.getCartProducts();
		/*List<String> shipSum = new ArrayList<String> ();
		shipSum.add(name);
		shipSum.add(address1);
		shipSum.add(address2);
		shipSum.add(city);
		shipSum.add(state);
		shipSum.add(zipcode);
		shipSum.add(phone);*/
		
		ShippingBean  beans = new ShippingBean(name,address1,address2,city,state,zipcode,phone);
		
		request.setAttribute("jadrn061",cartBean);
		request.setAttribute("confirm",beans);
		toDo = "/WEB-INF/jsp/summary.jsp";     
        RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher(toDo);  
        dispatcher.forward(request, response);  
        
		
	
	
        }      
}



