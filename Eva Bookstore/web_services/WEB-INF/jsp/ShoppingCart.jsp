<%@ page import = "java.util.*,sdsu.*;" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

            <?xml version="1.0" encoding="UTF-8"?>
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
            <!-- Siddiqui Hera Jadrn061
   spring 2017
   project #3 -->

            <head>
                <title>Eva Bookstore</title>
                <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
                <meta http-equiv="Pragma" content="no-cache" />
                <meta http-equiv="Expires" content="0" />
                <meta http-equiv="Content-Style-Type" content="text/css" />
                <script type="text/javascript" src="/jquery/jquery.js"></script>
                <script type="text/javascript" src="/jquery/jQueryUI.js"></script>
                <script type="text/javascript" src="/jadrn061/proj3js/firstpage.js"></script>
                <link rel="stylesheet" type="text/css" href="proj3css/firstpage.css" />
                <script type="text/javascript" src="/jadrn061/proj3js/formvalidation.js"></script>
                <link rel="stylesheet" href="../css/jquery-ui.min.css" />
                <link rel="stylesheet" href="../css/jquery-ui.structure.min.css" />
                <link rel="stylesheet" href="../css/jquery-ui.theme.min.css" />
            </head>

            <body>
                <div id="main_out">


                    <div id="banner">
                        <h1>Eva Bookstore</h1>
                    </div>


                    <ul id="menu">
					    <li><h1 id="my_name">Eva Bookstore</h1></li>
                        <li><a id="products" class="selected" href="proj3.html">All Products</a></li>
                        <li><a id="aboutus" href="aboutus.html">About Us</a></li>
                        <li><a id="contact" href="contactus.html">Contact</a></li>
                        <li>
                            <div id="cart">
                                <img src="proj3images/shcart.jpeg" alt="shopping cart" id="cart_image" />
								</li>
                        <li>
                            <div id="checkout_count">${jadrn061.productCount}</div>
                        </li>
                        <li>
                            
                                <input type="text" name="search" id="search" size="22" placeholder="  Search" />
                            </div>
                        </li>
                    </ul>


                    <h1>My Shopping Cart</h1>
					
                    <div class='container'>
                        <div class="fixed">
                            <table class="cart_table">
                                <tr>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Vendor</th>
                                    <th>Category</th>
                                    <th>Unit Cost</th>
                                    <th>Quantity</th>
                                    <th>Total Cost</th>
                                    <th>Edit</th>
                                </tr>
                                <jsp:useBean id="jadrn061" scope="session" class="sdsu.CartBean" />
                                <c:if test="${jadrn061.lineProductsCount==0}">
                                    <tr>
                                        <td colspan="4">
                                            <font size="2" face="Verdana, Arial, Helvetica, sans-serif">- Cart is currently empty -<br/></td>
                                    </tr>
                                </c:if>
                                <c:forEach items="${jadrn061.cartProducts}" var="cartItem" varStatus="counter">
                                    <form name="updelform_${cartItem.sku}" method="POST" action="" id="updelform_${cartItem.sku}">
                                        <tr>
                                            <td><img src="/~jadrn061/proj1/ajax_upload/_uploadDIR_/${cartItem.image}" width="150" height="auto" /></td>
                                            <td>
                                                <c:out value="${cartItem.description}" />
                                            </td>
                                            <td>
                                                <c:out value="${cartItem.vendor}" />
                                            </td>
                                            <td>
                                                <c:out value="${cartItem.category}" />
                                            </td>
                                            <td>
                                                <fmt:formatNumber value="${cartItem.cost}" type="currency" />
                                            </td>
                                            <td><input type="text" id="cartquantity_${cartItem.sku}" value='<c:out value="${cartItem.quantity}"/>'></br>
                                                <input type="button" name="update_${cartItem.sku}" value="update" id="update_${cartItem.sku}" class="update"><label id="return_update_message"></label></td>

                                            <td>
                                                <fmt:formatNumber value="${cartItem.totalCost}" type="currency" />
                                            </td>
                                            <input type='hidden' name='formhelper_${cartItem.sku}' value="${cartItem.sku}" />
                                            <input type='hidden' name='previousquant_${cartItem.quantity}' id="previousquant_${cartItem.sku}" value='${cartItem.quantity}' />
                                            <input type='hidden' name='productIndex_${cartItem.sku}' value='<c:out value="${counter.count}" />' id="productIndex_${cartItem.sku}">
                                            <td><input type="button" name="delete_${cartItem.sku}" value="delete" / id="delete_${cartItem.sku}" class="delete"></td>
                                        </tr>
                                    </form>
                                </c:forEach>
                            </table>
                        </div>
                        <div class="flex-item">
                            <table class="summary_table">
                                <c:choose>
                                    <c:when test="${jadrn061.lineProductsCount==0}">
                                        <tr>
                                            <td>Shipping:
                                                <fmt:formatNumber value="0" type="currency" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Tax:
                                                <fmt:formatNumber value="0" type="currency" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Subtotal:
                                                <fmt:formatNumber value="0" type="currency" />
                                            </td>
                                        </tr>
                                    </c:when>
                                    <c:otherwise>
                                        <tr>
                                            <td>Shipping:
                                                <fmt:formatNumber value="5" type="currency" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Tax:
                                                <fmt:formatNumber value="${jadrn061.orderTax}" type="currency" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Subtotal:
                                                <fmt:formatNumber value="${jadrn061.orderTotal}" type="currency" />
                                            </td>
                                        </tr>
                                    </c:otherwise>
                                </c:choose>
                            </table>
                        </div>
                    </div>
                    <p></p>
                    <p></p>
                    <form action="http://jadran.sdsu.edu/jadrn061/proj3.html">
                        <div id="check_out"><input type="submit" value="Continue Shopping" class="button" />
                            <c:choose>
                                <c:when test="${jadrn061.lineProductsCount==0}">
                                    <input type="button" value="Proceed To Checkout" id="checkout_button" style="display:none" class="button"/>
                                </c:when>
                                <c:otherwise>
                                    <input type="button" value="Proceed To Checkout" id="checkout_button" class="button" />
                                </c:otherwise>
                            </c:choose>
                    </form>
                    </div>


            </body>

            </html>
