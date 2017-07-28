// cs645 spring 2017
// HERA SIDDIQUI
// jadrn061

$(document).ready(function() {
    $('#tabs-3').click(function(){
         $('#sku3').focus();
		$('#sku3').keyup(function() {
  this.value = this.value.toUpperCase();
}); 
     });
     $('#button3').prop('disabled', true).bind('click', function() {
         send_file();
     });
	 

    $("#sku3").on('blur',function(e) {
        var url = '/perl/jadrn061/fetch/delete_fetch.cgi?sku3='+ $("#sku3").val();
       $.get(url, handleDelete);
        });
		
		

    $("#sku3").on('blur', function(e) {
            var inputRegex = /^\w{3}-\d{3}$/;
            var inputValue = $(this).val();
            if (!(inputRegex.test(inputValue)) || (inputValue == " ")) {
                $(this).val(null).removeClass('greenborder').addClass('redborder');
                $('#sku3_valid').html('SKU required (Format: XXX-000)')
                formValidate();
            } else {
                $(this).removeClass('redborder').addClass('greenborder');
                $('#sku1_valid').empty()
                var url = '/perl/jadrn061/fetch/check_dup_sku.cgi?sku1=' + $("#sku1").val();
                $.get(url, handleDuplicate);
            }
        });
});

function handleDelete(response){
	var records = new Array();
    records = response.split("|");
	$('#sku3').text(records[0]);
	$('#category3').val(records[1]);
	$('#vendor3').val(records[2]);
	$('#mid3').val(records[3]);
	$('#description3').val(records[4]);
	$('#features3').val(records[5]);
	$('#cost3').val(records[6]);
	$('#retail3').val(records[7]);
	var rec3 = records[8];
    $('#picture3').attr("src","/~jadrn061/proj1/ajax_upload/_uploadDIR_/"+rec3.toLowerCase());

}
