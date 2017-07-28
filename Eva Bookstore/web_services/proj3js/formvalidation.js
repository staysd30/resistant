

$(document).ready(function() {

	$("#same_bill_ship").on("change", function() {
		var checked = $(this).is(':checked');
		if (checked) {
			var result = isValidShipping();
			if (!result.valid) {
				$("#same_bill_ship").attr("checked", false);
			} else {
				var shipinfo = result.values;
				$("#name_bill").val(shipinfo.name);
				$("#add1_bill").val(shipinfo.address1);
				$("#add2_bill").val(shipinfo.address2);
				$("#city_bill").val(shipinfo.city);
				$("#state_bill").val(shipinfo.state);
				$("#zipcode_bill").val(shipinfo.zipcode);
				$("#phone_bill").val(shipinfo.phone);
				$("#creditCardNumber").focus();
			}
		}
	});
	
	$('#place_order_summary').on('click',function(e){
		var isValidForm = isValidShipping().valid && isValidBilling().valid && isValidPayment().valid;
		if(isValidForm){
			var getDetails = $("#name,#address1,#address2,#city,#state,#zipcode,#phone").serialize();
	        $.post("/jadrn061/servlet/OrderSummary",getDetails,function(response){
		    $('body').html(response);
	});
		}
		e.preventDefault();
	});	
});






var checkZipCodeFormat = function(zipcode) {
	var inputRegex = /^[0-9]{5}(-[0-9]{4})?$/;
	return inputRegex.test(zipcode);
}


var checkPhoneFormat = function(phone) {
	var inputRegex = /^\(?[0-9]{3}(\-|\)) ?[0-9]{3}-[0-9]{4}$/;	
	return inputRegex.test(phone);
}


var checkCardNumberFormat = function(creditCardNumber) {
	var inputRegex = /^[0-9]{16}$/;
	return inputRegex.test(creditCardNumber);
}

var isEmpty = function(value) {
	return (value == "" || value == null);
};

var checkCardCodeFormat = function(securityCode) {
	var inputRegex = /^[0-9]{3,4}$/;
	return inputRegex.test(securityCode);
}




var isValidShipping = function() {

	var values = {};
	var result = {
		valid : true,
		values : values
	};

	var name = $("#name").val();
	if (isEmpty(name)) {
		$("#name_error").text("Enter Name");
		result.valid = false;
	} else {
		values["name"] = name;
		$("#name_error").text("");
	}

	var address1 = $("#address1").val();
	if (isEmpty(address1)) {
		$("#address1_error").text("Enter Address Line 1");
		result.valid = false;
	} else {
		values["address1"] = address1;
		$("#address1_error").text("");
	}
	
	var address2 = $("#address2").val();
	values["address2"] = address2;

	var city = $("#city").val();
	if (isEmpty(city)) {
		$("#city_error").text("Enter City");
		result.valid = false;
	} else {
		values["city"] = city;
		$("#city_error").text("");
	}

	var state = $("#state").val();
	if (state == 'Select State') {
		$("#state_error").text("Select State");
		result.valid = false;
	} else {
		values["state"] = state;
		$("#state_error").text("");
	}

	var zipcode = $("#zipcode").val();
	if (isEmpty(zipcode) || !checkZipCodeFormat(zipcode)) {
		$("#zipcode_error").text("Enter valid ZipCode");
		result.valid = false;
	} else {
		values["zipcode"] = zipcode;
		$("#zipcode_error").text("");
	}

	var phone = $("#phone").val();
	if (isEmpty(phone) || !checkPhoneFormat(phone)) {
		$("#phone_error").text("Enter valid Phone Number");
		result.valid = false;
	} else {
		values["phone"] = phone;
		$("#phone_error").text("");
	}

	result.values = values;
	return result;

}



var isValidBilling = function() {

	var values = {};
	var result = {
		valid : true,
		values : values
	};

	var name = $("#name_bill").val();
	if (isEmpty(name)) {
		$("#name_bill_error").text("Enter Name");
		result.valid = false;
	} else {
		values["name"] = name;
		$("#name_bill_error").text("");
	}

	var address1 = $("#add1_bill").val();
	if (isEmpty(address1)) {
		$("#add1_bill_error").text("Enter Address Line 1");
		result.valid = false;
	} else {
		values["address1"] = address1;
		$("#add1_bill_error").text("");
	}
	
	var address2 = $("#add2_bill").val();
	values["address2"] = address2;

	var city = $("#city_bill").val();
	if (isEmpty(city)) {
		$("#city_bill_error").text("Enter City");
		result.valid = false;
	} else {
		values["city"] = city;
		$("#city_bill_error").text("");
	}

	var state = $("#state_bill").val();
	if (state == 'Select State') {
		$("#state_bill_error").text("Select State");
		result.valid = false;
	} else {
		values["state"] = state;
		$("#state_bill_error").text("");
	}

	var zipcode = $("#zipcode_bill").val();
	if (isEmpty(zipcode) || !checkZipCodeFormat(zipcode)) {
		$("#zipcode_error").text("Enter valid ZipCode");
		result.valid = false;
	} else {
		values["zipcode"] = zipcode;
		$("#zipcode_bill_error").text("");
	}

	var phone = $("#phone_bill").val();
	if (isEmpty(phone) || !checkPhoneFormat(phone)) {
		$("#phone_bill_error").text("Enter valid Phone Number");
		result.valid = false;
	} else {
		values["phone"] = phone;
		$("#phone_bill_error").text("");
	}

	result.values = values;
	return result;

}


var isValidPayment = function(){
	var values = {};
	
	var result = {
		valid : true,
		values : values
	};

	
	var cardtype = $('#creditcard').val();
	if (cardtype == -1) {
		$("#cardtype_error").text("Select card type");
		result.valid = false;
	} else {
		values["cardtype"] = cardtype;
		$("#cardtype_error").text("");
	}
	
	
	var creditCardNumber = $("#creditCardNumber").val();
	if (!checkCardNumberFormat(creditCardNumber)) {
		$("#creditCardNumber_error").text("Enter a valid card number");
		result.valid = false;
	} else {
		values["creditCardNumber"] = creditCardNumber;
		$("#creditCardNumber_error").text("");
	}
	
	var securityCode = $("#securitycode").val();
	if (!checkCardCodeFormat(securityCode)) {
		$("#securityCode_error").text("Enter a valid security code");
		result.valid = false;
	} else {
		values["securityCode"] = securityCode;
		$("#securityCode_error").text("");
	}

	result.values = values;
	return result;
}
