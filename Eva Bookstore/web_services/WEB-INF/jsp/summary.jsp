<%@ page import = "java.util.*,sdsu.*;" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>



            <?xml version="1.0" encoding="utf-8"?>
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

            <head>
                <title>Eva Bookstore</title>
                <meta http-equiv="content-type" content="text/html;charset=utf-8" />
                <meta http-equiv="Content-Style-Type" content="text/css" />
                <script type="text/javascript" src="/jquery/jquery.js"></script>
                <script type="text/javascript" src="/jquery/jQueryUI.js"></script>
                <script type="text/javascript" src="/jadrn061/proj3js/firstpage.js"></script>
                <script type="text/javascript" src="/jadrn061/proj3js/formvalidation.js"></script>
                <link rel="stylesheet" type="text/css" href="proj3css/firstpage.css" />
            </head>

            <body>

                <p>
                    <h1>Please Confirm Your Order</h1>
                </p>

                <p>
                    <h1>Your Order Summary</h1></p>
                <div class="container center_div">
                    <div class='fixed'>
                        <table>
                            <tr>
                                <td>Name:
                                    <c:out value="${confirm.name}" />
                                </td>
                            </tr>
                            <tr>
                                <td>Address1:
                                    <c:out value="${confirm.address1}" />
                                </td>
                            </tr>
                            <tr>
                                <td>Address2:
                                    <c:out value="${confirm.address2}" />
                                </td>
                            </tr>
                            <tr>
                                <td>City:
                                    <c:out value="${confirm.city}" />
                                </td>
                            </tr>
                            <tr>
                                <td>State:
                                    <c:out value="${confirm.state}" />
                                </td>
                            </tr>
                            <tr>
                                <td>ZipCode:
                                    <c:out value="${confirm.zipcode}" />
                                </td>
                            </tr>
                            <tr>
                                <td>Contact:
                                    <c:out value="${confirm.phone}" />
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="fixed">
                        <table>
                            <tr>
                                <td>Total:
                                    <fmt:formatNumber value="${jadrn061.orderTotal}" type="currency" /> </td>
                            </tr>
							<tr>
                                <td>Shipping:
                                    <fmt:formatNumber value="5" type="currency" /> </td>
                            </tr>
                            <tr>
                                <td>Tax:
                                    <fmt:formatNumber value="${jadrn061.orderTax}" type="currency" />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="check_out">
                    <form action="http://jadran.sdsu.edu/jadrn061/proj3.html">
                        <input type="button" value="Place Order" id="final_place_order" class="button">
                        <input type="submit" value="Cancel Order" id="back_to_first" class="button">
                    </form>
                </div>
                <table class="try" width="75%" border="1">
                    <tr>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Vendor</th>
                        <th>Category</th>
                        <th>Unit Cost</th>
                        <th>Quantity</th>
                        <th>Total Cost</th>
                    </tr>
                    <jsp:useBean id="jadrn061" scope="session" class="sdsu.CartBean" />

                    <form name="orderform" method="POST" action="" id="orderform">
                        <c:forEach items="${jadrn061.cartProducts}" var="cartItem" varStatus="counter">
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
                                <td>
                                    <c:out value="${cartItem.quantity}" />

                                    <td>
                                        <fmt:formatNumber value="${cartItem.totalCost}" type="currency" />
                                    </td>
                                    <input type='hidden' name='formhelper_${cartItem.sku}' value="${cartItem.sku}" />
                                    <input type='hidden' name='productIndex_${cartItem.sku}' value='<c:out value="${counter.count}" />' id="productIndex_${cartItem.sku}">
                            </tr>
                        </c:forEach>
                    </form>
                </table>

            </body>

            </html>
