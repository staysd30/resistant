<%@ page import = "java.util.*,sdsu.*;" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
            <c:forEach items="${p_beans}" var="item">
			<h1>${item.description}</h1>
                <form id="detailed_view_products" method="post" name="detailed_view_form">
                    <table class="model-table" data-category="${item.vendor}|${item.category}">
                        <tr>
                            <td>
                                <img src="/~jadrn061/proj1/ajax_upload/_uploadDIR_/${item.image}" />
                            </td>
                            <td class="details_data_din">
                                <p id="book_category"><b>Category:</b>&nbsp &nbsp ${item.category}</p>
                                <p id="book_vendor"><b>Vendor:</b>&nbsp &nbsp ${item.vendor}</p>
                                <p id="book_mid"><b>ISBN:</b>&nbsp &nbsp ${item.model}</p>
                                <p id="book_description"><b>Description:</b> &nbsp &nbsp ${item.description}</p>
                                <p id="book_features"><b>Features:</b> &nbsp &nbsp ${item.features}</p>
                                <p id="book_retail"><b>Price:</b> &nbsp &nbsp
                                    <fmt:formatNumber value="${item.retail}" type="currency" />
                                </p>
                                <c:choose>
                                <c:when test="${item.message =='In stock'}">
								    <p id="book_message" class="instock">${item.message}</p>
                                    <p class="book_quantity"><b>Quantity:</b><input class="focus" type="text" id="book_quantity${item.sku}" value="" /></p>
                                    <p><input type="button" value="Add to Cart" id="add_to_cart" name="${item.sku}" /></p>
                                    <p id="return_message"></p>
                                </c:when>
								<c:when test="${item.message =='product coming soon'}">
								<p id="book_message" class="coming">${item.message}</p>
								</c:when>
								<c:otherwise>
								<p id="book_message" class="more">${item.message}</p>
								</c:otherwise>
								</c:choose>
                            </td>
                        </tr>
                    </table>
                </form>
            </c:forEach>
