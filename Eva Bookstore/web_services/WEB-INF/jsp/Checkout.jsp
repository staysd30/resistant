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

<div id="banner">
		<h1>Eva Bookstore</h1>
	</div>


    <ul id ="menu">
	         <li><h1 id="my_name">Eva Bookstore</h1></li>
        	<li><a id="products" class="selected" href="proj3.html" >All Products</a></li>
         	<li><a id="aboutus" href="aboutus.html">About Us</a></li>
         	<li><a id="contact" href="contactus.html">Contact</a></li>
            <li><div id="cart">
       		<img src="proj3images/shcart.jpeg" alt="shopping cart" id="cart_image"/></li>
			<li><div id="checkout_count">${jadrn061.productCount}</div>
       	    </li>
             <li><div id="search_box"><label>Search</label>
        	<input type="text" name="search" id="search" size="22" placeholder="  Search"/>
        </div></li>
       </ul>

<div id="user_form">
<h1>Please enter your shipping information</h1>

<form action="" method="post">
<fieldset>
<table>
<tr><td>Name *:</td><td><input type="text" name="name" id="name" placeholder="Full Name" size="35"></td><td id ="name_error"></td></tr>
<tr><td>Address *:</td><td><input type="text" name="address1" id="address1" placeholder="Address Line 1" size="35"></td><td id ="address1_error"></td>
</tr>
<tr><td></td><td><input type="text" name="address2" id="address2" placeholder="Address Line2" size="35"></td></tr>
<tr><td>City *:</td><td><input type="text" name="city" id="city" placeholder="City" size="35"></td><td id ="city_error"></td></tr>
 <tr><td>State *:</td><td><select name="state" id="state">
    <option value="Select State">Select State</option>
	<option value="AL">Alabama</option>
	<option value="AK">Alaska</option>
	<option value="AZ">Arizona</option>
	<option value="AR">Arkansas</option>
	<option value="CA">California</option>
	<option value="CO">Colorado</option>
	<option value="CT">Connecticut</option>
	<option value="DE">Delaware</option>
	<option value="DC">District of Columbia</option>
	<option value="FL">Florida</option>
	<option value="GA">Georgia</option>
	<option value="HI">Hawaii</option>
	<option value="ID">Idaho</option>
	<option value="IL">Illinois</option>
	<option value="IN">Indiana</option>
	<option value="IA">Iowa</option>
	<option value="KS">Kansas</option>
	<option value="KY">Kentucky</option>
	<option value="LA">Louisiana</option>
	<option value="ME">Maine</option>
	<option value="MD">Maryland</option>
	<option value="MA">Massachusetts</option>
	<option value="MI">Michigan</option>
	<option value="MN">Minnesota</option>
	<option value="MS">Mississippi</option>
	<option value="MO">Missouri</option>
	<option value="MT">Montana</option>
	<option value="NE">Nebraska</option>
	<option value="NV">Nevada</option>
	<option value="NH">New Hampshire</option>
	<option value="NJ">New Jersey</option>
	<option value="NM">New Mexico</option>
	<option value="NY">New York</option>
	<option value="NC">North Carolina</option>
	<option value="ND">North Dakota</option>
	<option value="OH">Ohio</option>
	<option value="OK">Oklahoma</option>
	<option value="OR">Oregon</option>
	<option value="PA">Pennsylvania</option>
	<option value="RI">Rhode Island</option>
	<option value="SC">South Carolina</option>
	<option value="SD">South Dakota</option>
	<option value="TN">Tennessee</option>
	<option value="TX">Texas</option>
	<option value="UT">Utah</option>
	<option value="VT">Vermont</option>
	<option value="VA">Virginia</option>
	<option value="WA">Washington</option>
	<option value="WV">West Virginia</option>
	<option value="WI">Wisconsin</option>
	<option value="WY">Wyoming</option>
</select></td><td id ="state_error"></td></tr>

<tr><td>Zip Code *:</td>
    <td><input type="text" name="zipcode" id="zipcode" size="35" maxlength="10"></td><td id ="zipcode_error" placeholder="XXXXX"></td></tr>

<tr></tr>
<tr><td>Contact Phone *:</td><td><input type="text" name="phone" id="phone" placeholder="XXX-XXX-XXXX" size="35">
</td><td id ="phone_error"></td></tr>
</table>
</fieldset>
<p><input type="checkbox" id ="same_bill_ship"><label>Check if Shipping and Billing address same</label></p>
<h1>Please enter your billing information</h1>
<fieldset>
<table>
<tr><td>Name (as it appears on credit card) *:</td>
    <td><input type="text" name="nameOnCard" id="name_bill" placeholder="Name on Card" size="35"></td><td id ="name_bill_error" ></td></tr>
	<tr><td>Address *:</td><td><input type="text" name="address1" id="add1_bill" placeholder="Address Line 1" size="35"><td id ="add1_bill_error"></td></td>
</tr>
<tr><td></td><td><input type="text" name="address2" id="add2_bill" placeholder="Address line 2" size="35"></td><td id ="add2_bill_error"></td></tr>
<tr><td>City *:</td><td><input type="text" name="city" id="city_bill" placeholder="City" size="35"></td><td id ="city_bill_error"></td></tr>
    <td>State *:</td>
    <td><select name="state" id="state_bill">
	<option value="Select State">Select State</option>
	<option value="AL">Alabama</option>
	<option value="AK">Alaska</option>
	<option value="AZ">Arizona</option>
	<option value="AR">Arkansas</option>
	<option value="CA">California</option>
	<option value="CO">Colorado</option>
	<option value="CT">Connecticut</option>
	<option value="DE">Delaware</option>
	<option value="DC">District of Columbia</option>
	<option value="FL">Florida</option>
	<option value="GA">Georgia</option>
	<option value="HI">Hawaii</option>
	<option value="ID">Idaho</option>
	<option value="IL">Illinois</option>
	<option value="IN">Indiana</option>
	<option value="IA">Iowa</option>
	<option value="KS">Kansas</option>
	<option value="KY">Kentucky</option>
	<option value="LA">Louisiana</option>
	<option value="ME">Maine</option>
	<option value="MD">Maryland</option>
	<option value="MA">Massachusetts</option>
	<option value="MI">Michigan</option>
	<option value="MN">Minnesota</option>
	<option value="MS">Mississippi</option>
	<option value="MO">Missouri</option>
	<option value="MT">Montana</option>
	<option value="NE">Nebraska</option>
	<option value="NV">Nevada</option>
	<option value="NH">New Hampshire</option>
	<option value="NJ">New Jersey</option>
	<option value="NM">New Mexico</option>
	<option value="NY">New York</option>
	<option value="NC">North Carolina</option>
	<option value="ND">North Dakota</option>
	<option value="OH">Ohio</option>
	<option value="OK">Oklahoma</option>
	<option value="OR">Oregon</option>
	<option value="PA">Pennsylvania</option>
	<option value="RI">Rhode Island</option>
	<option value="SC">South Carolina</option>
	<option value="SD">South Dakota</option>
	<option value="TN">Tennessee</option>
	<option value="TX">Texas</option>
	<option value="UT">Utah</option>
	<option value="VT">Vermont</option>
	<option value="VA">Virginia</option>
	<option value="WA">Washington</option>
	<option value="WV">West Virginia</option>
	<option value="WI">Wisconsin</option>
	<option value="WY">Wyoming</option>
</select></td><td id ="state_bill_error"></td></tr>
<tr><td>Zip Code *:</td>
    <td><input type="text" name="zipcode" id="zipcode_bill" placeholder="XXXXX" size="35" maxlength="10"></td><td id ="zipcode_bill_error"></td></tr>

<tr></tr>
<tr><td>Contact Phone *:</td><td><input type="text" name="phone" id="phone_bill" placeholder="XXX-XXX-XXXX" size="35">
</td><td id ="phone_bill_error"></td></tr>
</table>
</fieldset>
<h1>Credit Card Information</h1>
<fieldset>
<table>
<tr><td>Credit Card *:</td>
<td><select name="creditCardType" id="creditcard">
    <option value="">Select Credit Card</option>
    <option value="amex">American Express</option>
    <option value="visa">Visa</option>
    <option value="mc">Mastercard</option>
    <option value="discover">Discover</option>

    </select></td><td id ="cardtype_error"></td></tr>
<tr><td>Credit Card Number:</td>
    <td><input type="text" name="creditCardNumber" id="creditCardNumber"></td><td id ="creditCardNumber_error"></td></tr>
<tr><td>Expiration Date:</td>
    <td><select name="expdatemon" id="expdatemon">
	<option>01</option>
	<option>02</option>
	<option>03</option>
	<option>04</option>
	<option>05</option>
	<option>06</option>
	<option>07</option>
	<option>08</option>
	<option>09</option>
	<option>10</option>
	<option>11</option>
	<option>12</option>
	</select>


	<select name="expdateyr" id="expdateyr">
	<option>2017</option>
	<option>2018</option>
	<option>2019</option>
	<option>2020</option>
	<option>2021</option>
	<option>2022</option>
	<option>2023</option>
	<option>2024</option>
	<option>2025</option>
	<option>2026</option>
	<option>2027</option>
	<option>2028</option>
	</select>
	</td>


	</tr>
<tr><td>Security Code *: </td><td><input type ="text" name="securitycode" id="securitycode"></td><td id ="securityCode_error"></td></tr>
</table>
</fieldset>
<div id = "check_out">
<input type="button" value="Complete Order"id="place_order_summary" class="button">
<input type="button" value="Back To Shopping Cart" id="back_to_cart" class="button">
</div>
</div>
</form>
</body>
</html>
