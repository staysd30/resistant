<%@ page import = "java.util.*,sdsu.*;" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
	<ul class = "rig columns-4">
	<c:forEach items="${p_beans}" var="item">
	
		<li class ="books" data-category = "${item.vendor}|${item.category}">
		<form id="only_products_view" method="post">
			<img src = "/~jadrn061/proj1/ajax_upload/_uploadDIR_/${item.image}"/>
			<p>${item.category}</p>
			<p>${item.vendor}</p>
			<p>${item.model}</p>
			<p><fmt:formatNumber value ="${item.retail}" type ="currency"/></p>
			<c:choose>
			<c:when test="${item.message=='In stock'}">
			<p style="color:green">${item.message}</p>
			</c:when>
			<c:when test="${item.message=='product coming soon'}">
			<p style="color:blue">${item.message}</p>
			</c:when>
			<c:otherwise>
			<p style="color:red">${item.message}</p>
			</c:otherwise>
			</c:choose>
			<p><input type="button" value= "View Details" class= "view_details" id= "${item.sku}"/></p>
			
		</li>
		</form>
	</c:forEach>

        </ul>
