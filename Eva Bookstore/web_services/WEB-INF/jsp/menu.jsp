<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<!-- Siddiqui Hera Jadrn061
   spring 2017
   project #2 -->



<head>
	<title>Main Menu</title>
	<meta http-equiv="content-type" 
		content="text/html;charset=utf-8" />
	 <meta name="viewport" content="width=device-width, initial-scale=1">
     <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />	
	<link rel="stylesheet" href="../css/menu.css">
    <script type="text/javascript" src="/jquery/jquery.js"></script>
     <script type="text/javascript" src="/jquery/jQueryUI.js"></script>
       <script type="text/javascript" src="../javascript/menu.js"></script>
	    <link rel="stylesheet" href="../css/jquery-ui.min.css" />
        <link rel="stylesheet" href="../css/jquery-ui.structure.min.css" />
        <link rel="stylesheet" href="../css/jquery-ui.theme.min.css" />
</head>

<body >
	

	<div class = "header"><h1>Eva Bookstore Inventory</h1></div>
	<div class="absolute"><h3>Welcome ${username}</h3> <button id='logout' class="ui-button ui-corner-all ui-widget ui-btn-icon-left">Logout</button></div>
	
   <div id="tabs" class="ui-tabs ui-corner-all ui-widget ui-widget-content">
    <ul id="menu">
      <li><a href="#tabs-1">Inventory Received</a></li>
      <li><a href="#tabs-2">Inventory Sent Out</a></li>
     
    </ul>
    <div id="tabs-1">
	<h2>Add Inventory </h2>
	<form method="POST" action=""  name ="form1" id ="form1">
		<h3 id ="status"></h3>
		
	<table id ="meta table"> 
	<tr><td>
		 <table id ="table1">
		    <tr>
	           <td>SKU</td>
			   <td><input type ="text" name="sku"  id ="sku1"></td>
			   <td id='sku1_valid'></td>
		   </tr>
           <tr> 		   
			   <td>Quantity</td>
			   <td><input type ="text" name ="quantity"  id ="quantity1"></td>
			   <td id='quantity1_valid'></td>
		  </tr>
           <tr>		  
               <td>Date</td>
                <td><input type ="text" name ="date"  id ="date1" placeholder ="yyyy-mm-dd"></td>
                <td id='date1_valid'></td>				
            </tr>
			
			<tr>
	           <td>Category </td>
			   <td><select id="category1" name ="category" class= "category"></select></td>
                           
            </tr>
			<tr>
	           <td>Vendor </td>
			   <td><select id ="vendor1" name="vendor" class ="vendor"></select></td>
            </tr>
			
			<tr>
	           <td>Manufacturer's Id </td>
			   <td><input type ="text" name ="mid" id="mid1" ></td>
            </tr>
			<tr>
	           <td>Description </td>
			   <td><input type="text" name ="description" id ="description1" ></td>
            </tr>
			<tr>
	           <td>Features </td>
			   <td><input type="text" name ="features" id ="features1"></td>
            </tr> 
			<tr>
	           <td>Cost </td>
			   <td><input type="text" name ="cost" id ="cost1"></td>
            </tr>
			<tr>
	           <td>Retail </td>
			   <td><input type="text" name ="retail" id="retail1"></td>
            </tr>
			  <tr><td><h3 id ="message1"></h3></td></tr>
	</table>
		 		</td><td>
	           <div name='image-div'>
			   <td><img src="" id= "picture1" alt = "" width="100" height="150"/></td>
			           
              </div>
			  </td>
			   </tr>
			   </table>
              <div class = 'abs_submit'><td><input type="reset" value="Reset" id = "reset1"></td>
			<td><input type="button" value= "Submit" class= "button1" id= "button1"/></td></div>
		 </form>
	</div>
    <div id="tabs-2">
	<h2>Remove Inventory </h2>
          <form method="POST" action="" id = "form2">
		  <h3 id ="status2"></h3>
           <table id = "meta-table2">
		   <tr><td>
		   <table id ="table2">
              <tr>
              <td>SKU </td>
              <td> <input type ="text" name="sku"  id ="sku2"></td>
			  <td id='sku2_valid'></td>
			  </tr>
			  <tr>
			  <td>Quantity
			   <td><input type ="text" name ="quantity"  id ="quantity2"></td>
			   <td id='quantity2_valid'></td></tr>
			   <tr>
               <td>Date</td>
                <td><input type ="text" name ="date"  id ="date2" placeholder ="yyyy-mm-dd"></td>
				<td id='date2_valid'></td>
              </tr>
			  
              <tr>
              <td>Category </td>
              <td><select id="category2" name ="category" class ="category"></select></td>
              </tr>
              <tr>
              <td>Vendor </td>
              <td><select id ="vendor2" name="vendor" class ="vendor"></select></td>
              </tr>
              <tr>
              <td>Manufacturer's Id </td>
              <td><input type ="text" name ="mid" id ="mid2"></td>
              </tr>
              <tr>
              <td>Description </td>
              <td><input type="text" name ="description" id ="description2"></td>
              </tr>
              <tr>
              <td>Features </td>
              <td><input type="text" name ="features" id ="features2"></td>
              </tr>
              <tr>
              <td>Cost </td>
              <td><input type="text" name ="cost" id ="cost2"></td>
              </tr>
              <tr>
              <td>Retail </td>
              <td><input type="text" name ="retail" id ="retail2"></td>
              </tr>
			  <tr><td><h3 id ="message2"></h3></td></tr>
              </table>
		 		</td><td>
	           <div name='image-div2'><td><img src="" id= "picture2" alt = "" width="100" height="150"/></td></div>
			  </td>
			   </tr>
			   </table>
			   <div class = 'abs_submit'><input type="reset" value="Reset" id = "reset2">
			   <input type="button" value="Submit" class="button2" id = "button2"></div>
              </form>
			  </div>
			  </div>

</body>
</html>

