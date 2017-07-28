$(document).ready(function() {
    $('#tabs-3').click(function() {
        $('#sku3').focus();
    });
    $('#button3').prop('disabled', true).bind('click', function() {
        confirmDelete();
    });
    $('#reset3').click(function() {
        resetDeleteForm(true);
    });
	$('#sku3').keyup(function() {
  this.value = this.value.toUpperCase();
});
    $("#sku3").on('blur', function(e) {
        var inputRegex = /^\w{3}-\d{3}$/;
        var inputValue = $(this).val();
        if (!(inputRegex.test(inputValue)) || (inputValue == " ")) {
            $(this).val(null).removeClass('greenborder').addClass('redborder');
            $('#sku3_valid').html('SKU required (Format: XXX-000)')
            $('#button3').prop('disabled', true)
            document.getElementById('form3').reset();
            $('#picture3').attr("src", '').hide();
            $('#delete_status').empty();
        }
        else {
            $(this).removeClass('redborder').addClass('greenborder');
            $('#sku3_valid').empty()
            var url = '/perl/jadrn061/fetch/delete_fetch.cgi?sku3=' + $("#sku3").val();
            $.get(url, handleDelete);
        }
    });
});

function handleDelete(response) {
    if (response.startsWith("invalid")) {
        var sku_value = $("#sku3").val();
        $('#delete_status').html("SKU not found.").css("color", "red");
        resetDeleteForm(false);
        $("#sku3").val(sku_value);
        return;
    } else if (response.startsWith("ok")) {
        $('#delete_status').html("Record deleted.").css("color", "green");
        $("#dialog").empty();
        resetDeleteForm(false);
        return;
    } else {
        var records = new Array();
        $('#delete_status').empty();
        records = response.split("|");
        $('#sku3').text(records[0]);
        $('#category3').val(records[1]);
        $('#vendor3').val(records[2]);
        $('#mid3').val(records[3]);
        $('#description3').val(records[4]);
        $('#features3').val(records[5]);
        $('#cost3').val(records[6]);
        $('#retail3').val(records[7]);
        $('#picture3').attr("src", "/~jadrn061/proj1/ajax_upload/_uploadDIR_/" + records[8].toLowerCase()).show();
        $('#button3').prop('disabled', false)
    }
}
function processDelete() {
    var url = '/perl/jadrn061/delete/delete_data.cgi?sku3=' + $("#sku3").val();
    var req = new HttpRequest(url, handleDelete);
    req.send();
}

function resetDeleteForm(complete) {
    $('#button3').prop('disabled', true);
    document.getElementById('form3').reset();
    $('#picture3').attr("src", '').hide();
    $('#sku3').removeClass();
    if(complete){
        $('#delete_status').empty();
    }
}

function confirmDelete() {
    var dialogStr = `Confirm do you want to delete this record.
    <table>
    <tr> <td>SKU<td><td> ${$('#sku3').val()}</td></tr>
    <tr> <td>Category<td><td> ${$('#category3').val()}</td></tr>
    <tr> <td>Vendor<td><td> ${$('#vendor3').val()}</td></tr>
    <tr> <td>Manufacturer's Id<td><td> ${$('#mid3').val()}</td></tr>
    <tr> <td>Description<td><td> ${$('#description3').val()}</td></tr>
    <tr> <td>Features<td><td> ${$('#features3').val()}</td></tr>
    <tr> <td>Cost<td><td> ${$('#cost3').val()}</td></tr>
    <tr> <td>Retail<td><td> ${$('#retail3').val()}</td></tr>
    <tr> <td>Picture<td><td> ${$('#picture3').attr("src").replace(/^.*[\\\/]/, '')}</td></tr>
    </table>`;
    $("#dialog").html(dialogStr)
    $("#dialog").dialog({
  				modal: true,
                height:'auto',
                width:'auto',
                title: 'Delete Record Confirmation',
  				buttons: {
  				"Delete": function() {
                        processDelete();
  						$(this).dialog("close");
  					},
                "Cancel": function() {
                    resetDeleteForm(true);
                        $(this).dialog("close");
                        }
  				}
  			});
}
