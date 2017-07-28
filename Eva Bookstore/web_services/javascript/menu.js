/* Hera Siddiqui
jadrn061
spring 2017
cs645
*/


$(document).ready(function(){
	 $( "#tabs" ).tabs();
	history.go(1);
	
	$('#logout').click(function(){
		logout();
		});		

	
	$('#date1').datepicker({ dateFormat: 'yy-mm-dd' });
    $('#date1').datepicker();
	$('#date2').datepicker({ dateFormat: 'yy-mm-dd' });
    $('#date2').datepicker();
	
	$('#sku1').focus();
	$('#sku1').keyup(function() {
  this.value = this.value.toUpperCase();
});
	$('#date1').val($.datepicker.formatDate('yy-mm-dd',new Date()));
	processForm1();
	
	$('#button1').prop('disabled',true);
	
	$('#tabs').tabs({
    activate: function (event, ui) {
    var $activeTab = $('#tabs').tabs('option', 'active');
	if($activeTab==0)
	{
		$('#sku1').focus();
		$('#sku1').keyup(function() {
  this.value = this.value.toUpperCase();
});
		$('#date1').val($.datepicker.formatDate('yy-mm-dd',new Date()));
		$('#button1').prop('disabled',true);
		processForm1();
		formReset();
		
	}
	else
	{
		$('#sku2').focus();
		$('#sku2').keyup(function() {
  this.value = this.value.toUpperCase();
});
		$('#date2').val($.datepicker.formatDate('yy-mm-dd',new Date()));
		$('#button2').prop('disabled',true);
		processForm2();
		formReset2();
	}
	}
	});
	
	
	
	//Both Forms disabled fields starts
	$('#vendor1,#category1,#mid1,#features1,#description1,#retail1,#cost1,#picture1').prop("disabled",true);
	$('#vendor2,#category2,#mid2,#features2,#description2,#retail2,#cost2,#picture2').prop("disabled",true);
	//Both Forms disabled fields ends
	
	$.post("/jadrn061/servlet/FetchVendor",fix_vendor);
    $.post("/jadrn061/servlet/FetchCategory",fix_category);
	
	
	$('#reset1').click(function() {
        formReset();
    });
	$('#reset2').click(function() {
        formReset2();
    });



window.onbeforeunload = function () {
	logout();
};


});
let isSkU1Valid = false;
let isDate1Valid = false;
let isQuantity1Valid = false;
let isFormValid1 = false;

let isSkU2Valid = false;
let isDate2Valid = false;
let isQuantity2Valid = false;
let isFormValid2 = false;


function fix_vendor(response){
	
	//$('#status').html(response);
	var toWrite = "<option value=\"-1\">Select Vendor</option>";
    var tmpStr = response.split("|||");
    for(i=0; i<tmpStr.length; i++) {
        tmp = tmpStr[i].split("|");
        toWrite += "<option value=" + tmp[0] + ">"+tmp[1]+"</option>\n";
        }
    $('.vendor').append(toWrite);
}

function fix_category(response){
	
	//$('#status').html(response);
	var toWrite = "<option value=\"-1\">Select Category</option>";
    var tmpStr = response.split("|||");
    for(i=0; i<tmpStr.length; i++) {
        tmp = tmpStr[i].split("|");
        toWrite += "<option value=" + tmp[0] + ">"+tmp[1]+"</option>\n";
        }
    $('.category').append(toWrite);
}


function processForm1()
{
	$('#sku1').on('blur',function(){
		var inputRegex = /^\w{3}-\d{3}$/;
        var inputValue = $(this).val();
        if (!(inputRegex.test(inputValue)) || (inputValue == " ")) {
            $(this).val(null).removeClass('greenborder').addClass('redborder');
            $('#sku1_valid').html('SKU required (Format: XXX-000)');
            isSkU1Valid = false
			} else {
            $(this).removeClass('redborder').addClass('greenborder');
            $('#sku1_valid').empty()            
			checkSKU();
			formValidate();
			}
			
		    
	});
	
	$('#quantity1').on('blur',function(){
		var inputRegex = /^[1-9][0-9]*$/;
		var inputValue = $('#quantity1').val();
		if (!(inputRegex.test(inputValue)) || (inputValue == " ")) {
            $(this).val(null).removeClass('greenborder').addClass('redborder');
            $('#quantity1_valid').html('Enter a number greater than 0');
			isQuantity1Valid = false
			} else {
            $(this).removeClass('redborder').addClass('greenborder');
            $('#quantity1_valid').empty();
			isQuantity1Valid = true
			formValidate();
            }
			
			
		
	});
	
	$('#date1').on('blur',function(){
		let success = false;
		try{
			var dateResult = $.datepicker.parseDate('yy-mm-dd',$('#date1').val());
			success = true;
		}
		catch(e)
		{
			$(this).val(null).removeClass('greenborder').addClass('redborder');
            $('#date1_valid').html('Enter a valid date.');
			isDate1Valid = false
			} 
		if(success){
			$(this).removeClass('redborder').addClass('greenborder');
			$('#date1_valid').empty();
			isDate1Valid = true
		}
	setTimeout(function () {formValidate();},100);
	});
	
	$('#button1').bind('click',function(){	
		$('#quantity1').blur();
		$('#date1').blur();
		$('#sku1').blur();		
		formValidate();
		setTimeout(function() {if(isFormValid1){
						sendFormData1();}},800);
	 });
	 
	 
}

function checkSKU(){
	        var getDetails = $('#sku1').serialize();
		    $.post("/jadrn061/servlet/ProductDetails",getDetails,function(response){
				if(response==-1){
					$('#sku1_valid').html("This record does not exist!!").css("color","red");
					$('#sku1').removeClass('greenborder').addClass('redborder'); 
					$('#category1').val(-1);
					$('#vendor1').val(-1);
					$('#mid1').val(null);
					$('#description1').val(null);
					$('#features1').val(null);
					$('#cost1').val(null);
					$('#retail1').val(null);
					$('#picture1').attr("src", "").hide();
					isSkU1Valid = false
					}
		        else{
					isSkU1Valid = true
					var a = $.parseJSON(response);
					var record = a[0];
					$('#category1').val(record[1]);
					$('#vendor1').val(record[2]);
					$('#mid1').val(record[3]);
					$('#description1').val(record[4]);
					$('#features1').val(record[5]);
					$('#cost1').val(record[6]);
					$('#retail1').val(record[7]);
					$('#picture1').attr("src", "/~jadrn061/proj1/ajax_upload/_uploadDIR_/" + record[8].toLowerCase()).show();
			 
			
				}
				
			
		});
		
}

function formValidate() {
    if ( $('#sku1').val() &&  $('#quantity1').val() &&  $('#date1').val() && ($('#category1').val() !== '-1') && ($('#vendor1').val() !== '-1') && $('#description1').val() && $('#features1').val() && $('#cost1').val() && $('#retail1').val() && isSkU1Valid && isDate1Valid && isQuantity1Valid) {
        $('#button1').prop('disabled', false);
		isFormValid1 = true;
    } else {
        $('#button1').prop('disabled', true);
		isFormValid1 = false;
    }
}

function formReset(){
    document.getElementById('form1').reset();
    $('#sku1_valid').empty().removeClass();
    $('#quantity1_valid').empty().removeClass();
    $('#date1_valid').empty().removeClass();
    $('#picture1').attr('src', '').hide();
    $('#status').empty();
    $('#sku1').removeClass();
    $('#date1').removeClass();
    $('#quantity1').removeClass();
	$('#sku1').focus();
	setTimeout(function() { $('#date1').val($.datepicker.formatDate('yy-mm-dd',new Date())); },100);
    
}

function processForm2()
{
	$('#sku2').on('blur',function(){
		var inputRegex = /^\w{3}-\d{3}$/;
        var inputValue = $(this).val();
        if (!(inputRegex.test(inputValue)) || (inputValue == " ")) {
            $(this).val(null).removeClass('greenborder').addClass('redborder');
            $('#sku2_valid').html('SKU required (Format: XXX-000)')
            isSkU2Valid = false;
			} else {
            $(this).removeClass('redborder').addClass('greenborder');
            $('#sku2_valid').empty();
			checkSKU2();
			formValidate2();
			}
		    
	});
	
	$('#quantity2').on('blur',function(){
		var inputRegex = /^[1-9][0-9]*$/;
		var inputValue = $('#quantity2').val();
		if (!(inputRegex.test(inputValue)) || (inputValue == " ")) {
            $(this).val(null).removeClass('greenborder').addClass('redborder');
            $('#quantity2_valid').html('Enter a number greater than 0');
			isQuantity2Valid = false;
			} else {
            $(this).removeClass('redborder').addClass('greenborder');
            $('#quantity2_valid').empty();
			isQuantity2Valid = true;
			formValidate2();
            }
			
			
		
	});
	
	$('#date2').on('blur',function(){
		let success = false;
		try{
			var dateResult = $.datepicker.parseDate('yy-mm-dd',$('#date2').val());
			success = true;
		}
		catch(e)
		{
			$(this).val(null).removeClass('greenborder').addClass('redborder');
            $('#date2_valid').html('Enter a valid date.');
			isDate2Valid = false;
			} 
		if(success){
			$(this).removeClass('redborder').addClass('greenborder');
			$('#date2_valid').empty();
			isDate2Valid = true;
			formValidate2();	
		}
		setTimeout(function () {formValidate2();},100);
	});
	
	
	$('#button2').bind('click',function(){
		$('#quantity2').blur();
		$('#date2').blur();
		$('#sku2').blur();
		formValidate2();
		setTimeout(function() {if (isFormValid2){
			
			sendFormData2();}},1000);
		
	 });
}


function formValidate2() {
	
    if ( $('#sku2').val() &&  $('#quantity2').val() &&  $('#date2').val() && ($('#category2').val() !== '-1') && ($('#vendor2').val() !== '-1') && $('#description2').val() && $('#features2').val() && $('#cost2').val() && $('#retail2').val() && isSkU2Valid && isQuantity2Valid && isDate2Valid) {
        $('#button2').prop('disabled', false);
		isFormValid2 = true;
    } else {
        $('#button2').prop('disabled', true);
		isFormValid2 = false;
    }
}



function formReset2(){
    document.getElementById('form2').reset();
    $('#sku2_valid').empty().removeClass();
    $('#quantity2_valid').empty().removeClass();
    $('#date2_valid').empty().removeClass();
    $('#picture2').attr('src', '').hide();
    $('#status2').empty();
	$('#message2').empty();
    $('#sku2').removeClass();
    $('#date2').removeClass();
    $('#quantity2').removeClass();
	$('#sku2').focus();
	setTimeout(function() { $('#date2').val($.datepicker.formatDate('yy-mm-dd',new Date())); },100);
    
}


function checkSKU2(){
	        var getDetails = $('#sku2').serialize();
		    $.post("/jadrn061/servlet/OnHandProductDetails",getDetails,function(response){
				if(response==-1){
			      $('#sku2_valid').html("SKU not in inventory ordered!!").css("color","red");
				  $('#sku2').removeClass('greenborder').addClass('redborder'); 
				  $('#category2').val(-1);
			$('#vendor2').val(-1);
			$('#mid2').val(null);
			$('#description2').val(null);
			$('#features2').val(null);
			$('#cost2').val(null);
			$('#retail2').val(null);
			$('#picture2').attr("src", "" ).hide();
			$('#status2').val(null);
			$('#message2').val(null);
				 isSkU2Valid = false;
				}
              else{
				isSkU2Valid = true;			
		//	$('#status2').html(response);
			var a = $.parseJSON(response);
			var record = a[0];
			$('#category2').val(record[1]);
			$('#vendor2').val(record[2]);
			$('#mid2').val(record[3]);
			$('#description2').val(record[4]);
			$('#features2').val(record[5]);
			$('#cost2').val(record[6]);
			$('#retail2').val(record[7]);
			$('#picture2').attr("src", "/~jadrn061/proj1/ajax_upload/_uploadDIR_/" + record[8].toLowerCase()).show();
			getQuantity();
			  }
		});
}

function getQuantity(){
	         var getQuantityData = $('#sku2').serialize();
		     $.post("/jadrn061/servlet/GetQuantity",getQuantityData,function(response){
				$('#status2').html(response);
			    var a = $.parseJSON(response);
			    var record = a[0];
				$('#status2').html("You have " + record[0] + " in inventory");
				
			});
}

function sendFormData1(){
    $('#button1').prop('disabled',true);
	var formData1 = $('#sku1,#quantity1,#date1').serialize();
	$.post("/jadrn061/servlet/InventoryReceived",formData1,function(response){
		$('#status').html(response);
		
	 });
	setTimeout(function() { formReset(); },5000);
}

function sendFormData2(){
	$('#button2').prop('disabled',true);
	var formData2 = $('#sku2,#quantity2,#date2').serialize();
	$.post("/jadrn061/servlet/InventoryRemoved",formData2,function(response){
		$('#message2').html(response);
		
	});
	setTimeout(function() { formReset2(); },5000);
}

function logout(){
	$.post("/jadrn061/servlet/Logout",function(response){});
        jQuery.get("/jadrn061/logout.txt", function(data){
			$('body').html(data);
		});
		window.setTimeout(function(){location.replace("http://jadran.sdsu.edu/jadrn061/login.html")}, 700);
}

