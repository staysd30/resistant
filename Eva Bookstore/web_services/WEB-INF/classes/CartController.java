
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;


public class CartController extends HttpServlet {
//public static final String addToCart
public void doPost(HttpServletRequest request, HttpServletResponse response)
throws ServletException, IOException {
PrintWriter result = response.getWriter();	
String strAction = request.getParameter("action");

if(strAction!=null && !strAction.equals("")) {

if (strAction.equals("update")) {
updateCart(request);
        String toDo = "/WEB-INF/jsp/ShoppingCart.jsp";
        RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher(toDo); 
        dispatcher.forward(request, response);
} else if(strAction.equals("delete")){
deleteCart(request);
       String toDo = "/WEB-INF/jsp/ShoppingCart.jsp";
        RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher(toDo); 
        dispatcher.forward(request, response);
}
else if(strAction.equals("checkout")){
String toDo = "/WEB-INF/jsp/Checkout.jsp";
        RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher(toDo); 
        dispatcher.forward(request, response);	
	
}
        
//response.sendRedirect("/jadrn061/web_services/WEB-INF/jsp/ShoppingCart.jsp");
}

else{
	String toDo = "/WEB-INF/jsp/ShoppingCart.jsp";
        RequestDispatcher dispatcher = request.getServletContext().getRequestDispatcher(toDo); 
        dispatcher.forward(request, response);
	
}

}
protected void deleteCart(HttpServletRequest request) {
HttpSession session = request.getSession();
String strProductIndex = request.getParameter("productIndex");
CartBean cartBean = null;
Object objCartBean = session.getAttribute("jadrn061");
if(objCartBean!=null) {
cartBean = (CartBean) objCartBean ;
} else {
cartBean = new CartBean();
}
cartBean.deleteCartProduct(strProductIndex);
}
protected void updateCart(HttpServletRequest request) {
HttpSession session = request.getSession();
String strQuantity = request.getParameter("quantity");
String strProductIndex = request.getParameter("productIndex");
System.out.println(strQuantity);//remove
System.out.println(strProductIndex);//remove
CartBean cartBean = null;
Object objCartBean = session.getAttribute("jadrn061");
if(objCartBean!=null) {
cartBean = (CartBean) objCartBean ;
} else {
cartBean = new CartBean();
}
System.out.println(strQuantity);System.out.println(strProductIndex);
cartBean.updateCartProduct(strProductIndex, strQuantity);
}
protected void addToCart(HttpServletRequest request) {
HttpSession session = request.getSession();

String message ="";
String sku = request.getParameter("sku");
String strQuantity = request.getParameter("quantity");
String query = "select on_hand_quantity from on_hand where sku ='" + sku + "'";
String sqlResult = DBHelper.doQueryTry(query);
if((Integer.parseInt(sqlResult)) >(Integer.parseInt(strQuantity)))
			{message = "can add product";}
		else 
			{message = "cannot add only " +Integer.parseInt(sqlResult) +"in stock";}
		System.out.println(strQuantity);
		System.out.println(sqlResult);
		System.out.println(message);
/*String vendor = request.getParameter("vendor");
String category = request.getParameter("category");
String model = request.getParameter("model");
String description = request.getParameter("description");
String features = request.getParameter("features");
String image = request.getParameter("image");
String cost = request.getParameter("cost");
String retail = request.getParameter("retail");

String message = request.getParameter("message");*/
/*CartBean cartBean = null;
Object objCartBean = session.getAttribute("jadrn061");
if(objCartBean!=null) {
cartBean = (CartBean) objCartBean ;
} else {
cartBean = new CartBean();
session.setAttribute("jadrn061", cartBean);
}
cartBean.addCartProduct(sku,category,vendor,model,description,features,image,cost,retail,message,strQuantity);*/
}
}