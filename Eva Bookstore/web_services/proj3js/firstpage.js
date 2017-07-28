


$(document).ready(function()
{
	$(window).scroll(function() {
	if ( $(window).scrollTop() > amountScrolled ) {
		$('a.back-to-top').fadeIn('slow');
	} else {
		$('a.back-to-top').fadeOut('slow');
	}
});	
    productsInCart();
	$.ajaxSetup ({
    // Disable caching of AJAX responses
    cache: false});
	$.get("/jadrn061/servlet/FetchVendor",fix_vendor);
    $.get("/jadrn061/servlet/FetchCategory",fix_category);
	$.get("/jadrn061/servlet/AjaxGetProducts2", handle2);
	
	$('.vendorCB').change(function(){
    productFilter();
});	
    $('.categoryCB').change(function(){
    productFilter();
});	

    $('#sorting').change(function(){   //sorting the products
    productFilter();
});	

$("#search").on( "keyup", function(event) {
	    $("input[type='checkbox']").prop('checked', false);
        if($("#search").val().trim()!=""){
		search = $("#search").val();
	    $.get("/jadrn061/servlet/SearchFilter?search="+search, handle2);
		}
		
	});



$("#cart_image").click( function(){
		$.post("/jadrn061/servlet/CartController?action=",function(response){
		$('body').html(response);
        });
   
});//after this
$(".delete" ).click(function() {
            var her = this.id.split('_');
			var sku = her[1];
    		var productIndex=$("#productIndex_"+sku).val();				
			
			  $.post("/jadrn061/servlet/CartController?action=delete&productIndex="+productIndex).done(function(respone){
			  //$('body').html(response);
			  $('#cart_image').trigger('click');});	

});


$(".update" ).click(function(){
	        
			var her = this.id.split('_');
			var sku = her[1];
    		var productIndex=$("#productIndex_"+sku).val();				
			var quantity = $("#cartquantity_"+sku).val();
            var previousValue= $('#previousquant_'+sku).val();			
              
			  var inputRegex = /^[1-9][0-9]*$/;
			  if (!(inputRegex.test(quantity)) || (quantity == " ")){
				  $("#return_update_message").text("Enter a valid quantity");
				  var  hj=$("#return_update_message").text();
				 
			     }	
              else {
				  var returnquan=0;
				  $.get("/jadrn061/servlet/CheckQuantity?sku="+sku,function(response){
				  returnquan = response;

                  if(parseInt(quantity) <= parseInt(returnquan)){
				  $.post("/jadrn061/servlet/CartController?action=update&productIndex="+productIndex+"&quantity="+quantity).done(function(respone){
			      //$('body').html(response);
			      $("#return_update_message").text("Quantity Updated");
			      $('#cart_image').trigger('click');});	
				  }
				  else{
					  
					  $("#return_update_message").text("Could not Update.Only "+returnquan+ " in stock.");
					  $("#cartquantity_"+sku).val(previousValue);
					  $("#cartquantity_"+sku).focus();
					  
				  }
				  });
			  }
				  
		});
		
		
	

$("#checkout_button").click(function(){
	$.post("/jadrn061/servlet/CartController?action=checkout",function(response){
		$('body').html(response);
	});
});

$("#final_place_order").click(function(){
	  $.post("/jadrn061/servlet/ProductOrdered",function(response){
		$('body').html("<div class='final_check_out'>" +response+back+ "</div>");
	});
	

});
/*$("#place_order_summary").click(function(){
	var getDetails = $("#name,#address1,#address2,#city,#state,#zipcode,#phone").serialize();
	$.post("/jadrn061/servlet/OrderSummary",getDetails,function(response){
		$('body').html(response);
	});
});*/

$("#back_to_cart").click(function(){
	$.post("/jadrn061/servlet/CartController?action=",function(response){
		$('body').html(response);
		
        });
});

});



function fix_vendor(response){
	var toWrite = "";
	var tmpStr = response.split('|||');     
	for(i=0; i < tmpStr.length; i++) {
	var tmp = tmpStr[i].split('|');
	if(i==0) {
	toWrite +="<input class =vendorCB type=checkbox id=vendor_cb" +tmp[0]+" name='"+tmp[1]+"' value ="+tmp[0]+"> "+tmp[1]+"</br>";

	} else {
	toWrite +="<input class =vendorCB type=checkbox id=vendor_cb"+tmp[0]+" name= '"+tmp[1]+"' value ="+tmp[0]+"> "+tmp[1]+"</br>";
	}

    }
  $("#vendor").append(toWrite);
    for(i=0; i <= tmpStr.length; i++) {
    	$("#vendor_cb"+i).change(function(){    	
		productFilter();
    	});
    }
}
	

function fix_category(response){
	var toWrite = "";
	var tmpStr = response.split('|||');     
	for(i=0; i < tmpStr.length; i++) {
	var tmp = tmpStr[i].split('|');
	if(i==0) {
	toWrite +="<input class =categoryCB type=checkbox id=category_cb"+tmp[0]+" name= '"+tmp[1]+"' value ="+tmp[0]+"> "+tmp[1]+"</br>";

	} else {
	toWrite +="<input class =categoryCB type=checkbox id=category_cb"+tmp[0]+" name= '"+tmp[1]+"' value ="+tmp[0]+"> "+tmp[1]+"</br>";
	}

    }
  $("#category").append(toWrite);
    for(i=0; i <= tmpStr.length; i++) {
    	$("#category_cb"+i).change(function(){
    	//selectCategory(this.id)
		productFilter();
    	});
    }
	
	
}

function handle2(response) {
	$('#product').html(response);
	$('.view_details').click(function(){
		
      var sku = this.id;
	  var quantity=0;
	  $.get("/jadrn061/servlet/AjaxGetProductsFullDetails?sku="+sku, function(response){// has to be in modal box
	  $('#modalinside').html(response);
	  
	  $("#modalbox").css({"display" : "block"}); 
	  $(".focus").focus();
	  
	  $("#add_to_cart").click(function(){
			  var sku= this.name;
			  var quantity = $("#book_quantity"+sku).val();

			  var inputRegex = /^[1-9][0-9]*$/;
			  if (!(inputRegex.test(quantity)) || (quantity == " ")){
				  $("#return_message").html("Enter a valid quantity");
			  }
			  else {
				  var returnquan=0;
				  $.get("/jadrn061/servlet/CheckQuantity?sku="+sku,function(response){
				  returnquan = response;
				  
				  if(parseInt(quantity) <= parseInt(returnquan)){
			  	  $.get("/jadrn061/servlet/AddProductToCart?sku="+sku+"&quantity="+quantity,function(response){$("#return_message").html(response);productsInCart();});
		          $("#return_message").html("Product added to cart");
				  //$("#book_quantity"+sku).css({"display":"none"});
				  //$("input[name="+sku+"]").css({"display":"none"});
				  //$("#return_message").html("Product already in cart");
				  // var count=0;
				   //count = count+ parseInt(quantity);
				   
				  
				  }				  
				  else{
					  $("#return_message").html("Could not Add.Only "+returnquan+ " in stock.");
				  }
		});  
			  }
		  });
		  
		  $(".close").on("click", function() {
				$("#modalbox").css({"display" : "none"});
				});
				
				
		  //
		
	});
	});
	}
	
	
function productFilter(){
     vendor=$('.vendorCB:checked').map(function() {
      return this.value;
      }).get().join(', ');
	  
      
      category=$('.categoryCB:checked').map(function() {
      return this.value;
      }).get().join(', ');
	  
	  
	  sort = $("#sorting option:selected").val();
      $.get("/jadrn061/servlet/AjaxGetProductsFilter?vendor="+vendor+"&category="+category+"&sort="+sort, handle2);
   
      
	
}
var vendor="";
var category =""
var sort="";
var search ="";
var productsInCart = function() {$.get("/jadrn061/servlet/CartSize",function(response){
	$("#checkout_count").html(response);
});

}					
var amountScrolled = 300;
var back ="<a href="+"/jadrn061/proj3.html"+">"+"Click here to continue shopping"+"</a>";
				 
	
	

	
