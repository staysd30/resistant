<!doctype html public "-//w3c//dtd html 4.0 transitional//en">
<html>

<head>
   <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
   <meta name="GENERATOR" content="Mozilla/4.61 [en] (WinNT; I) [Netscape]">
   <meta name="Author" content="Anil K. Vijendran">
   <title>JSP Examples</title>
</head>
<body bgcolor="#FFFFFF">

<h1>Here is a JSP example</h1>
<%! java.util.Date d = new java.util.Date(); %>
The date and time are:  <%= new java.util.Date() %><br />
The date and time are: <%= d %><br />
The session id is <%= session.getId() %> <br />
The parameter is <%= request.getParameter("foo") %>
</body>
</html>
