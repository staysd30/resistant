<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">



<head>
	<title>Main Menu</title>
	<meta http-equiv="content-type" 
		content="text/html;charset=utf-8" />
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<script src="/jquery/jquery.js"></script>
	<script src="/jadrn065/login_example/logout.js"></script>

	    
      
</head>

<body>
<% if(session.getAttribute("username") == null)
	response.sendRedirect("/jadrn065/jsp/login_err.jsp");
%>
    <div>
        <h2>You have Logged In !!!</h2>
	<h3>Welcome <%= session.getAttribute("username") %></h3>
	<h3>The message is: <%= session.getAttribute("message") %>
	<h3>Your session id is <%= session.getId() %>



        <div id="status">
        </div>
	<a href="/jadrn065/servlet/Logout">Logout Now</a>
    </div>
    
</body>
</html>

