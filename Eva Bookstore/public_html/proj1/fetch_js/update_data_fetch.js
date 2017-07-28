// cs645
// SIDDIQUI HERA
// jadrn061

$(document).ready(function() {
    $('#reset2').click(function() {
        resetUpdateForm(true);
    });
    $('#button2').prop('disabled', true).bind('click', function() {
        confirmEdit();
    });
    $('#picture2').hide();
    $('#picture2').on('load', function() {
        $(this).fadeIn(500);
    });
	$('#sku2').keyup(function() {
  this.value = this.value.toUpperCase();
});
    $("#sku2").on('blur', function(e) {
        var inputRegex = /^\w{3}-\d{3}$/;
        var inputValue = $(this).val();
        if (!(inputRegex.test(inputValue)) || (inputValue == " ")) {
            $(this).val(null).removeClass('greenborder').addClass('redborder');
            $('#sku2_valid').html('SKU required (Format: XXX-000)')
            formValidate()
        } else {
            $(this).removeClass('redborder').addClass('greenborder');
            $('#sku2_valid').empty()
            var url = '/perl/jadrn061/fetch/update_data_fetch.cgi?sku2=' + $(this).val();
            $.get(url, handle_Update);
        }
    });
    // Validate item cost (not null, whole number)
    $('#cost2').blur(function() {
        var inputRegex = /^\d+(?:\.\d{1,2})?$/;
        var inputValue = $(this).val();
        if (!(inputRegex.test(inputValue)) || (inputValue == " ")) {
            $(this).val(null);
            $(this).removeClass('greenborder').addClass('redborder');
            $('#cost2_valid').html('Number Required (eg 10.0)')
        } else {
            $(this).removeClass('redborder').addClass('greenborder');
            $('#cost2_valid').empty()
        }
        updateFormValidate();
    });
    $('#retail2').blur(function() {
        var inputRegex = /^\d+(?:\.\d{1,2})?$/;
        var inputValue = $(this).val();
        if (!(inputRegex.test(inputValue)) || (inputValue == " ")) {
            $(this).val(null);
            $(this).removeClass('greenborder').addClass('redborder');
            $('#retail2_valid').html('Number Required (eg 10.0)')
        } else {
            $(this).removeClass('redborder').addClass('greenborder');
            $('#retail2_valid').empty()
        }
        updateFormValidate();
    });

    $('#description2').on('blur', function(e) {
        if ($(this).val().length > 1024) {
            is_form_valid = false;
            $(this).removeClass('greenborder').addClass('redborder');
            $('#description2_valid').html('Max length 1024')
        } else if (!$(this).val()) {
            $(this).removeClass('greenborder').addClass('redborder');
            $('#description2_valid').html('Required')
        } else {
            $(this).removeClass('redborder').addClass('greenborder');
            $('#description2_valid').empty();
            is_form_valid = true;
        }
        updateFormValidate();
    });

    // Validate feature (not null, len< 512)
    $('#features2').on('blur', function(e) {
        if ($(this).val().length > 512) {
            is_form_valid = false;
            $(this).removeClass('greenborder').addClass('redborder');
            $('#features2_valid').html('Max length 512')
        } else if (!$(this).val()) {
            $(this).removeClass('greenborder').addClass('redborder');
            $('#features2_valid').html('Required')
        } else {
            $(this).removeClass('redborder').addClass('greenborder');
            $('#features2_valid').empty();
            is_form_valid = true;
        }
        updateFormValidate();
    });

    // Validate Manufacturer (not null, len< 50)
    $('#mid2').on('blur', function(e) {
        if ($(this).val().length > 50) {
            is_form_valid = false;
            $(this).removeClass('greenborder').addClass('redborder');
            $('#mid2_valid').html('Max length 50')
        } else if (!$(this).val()) {
            $(this).removeClass('greenborder').addClass('redborder');
            $('#mid2_valid').html('Required')
        } else {
            $(this).removeClass('redborder').addClass('greenborder');
            $('#mid2_valid').empty();
            is_form_valid = true;
        }
        updateFormValidate();
    });

});

function handle_Update(response) {
    if (response.startsWith("invalid")) {
        var sku_value = $("#sku2").val();
        $('#update_status').html("SKU not found.").css("color", "red");
        resetUpdateForm(false);
        $("#sku2").val(sku_value);
        return;

    } else {
        var records = new Array();
        records = response.split("|");
        $('#sku2').text(records[0]);
        $('#category2').val(records[1]);
        $('#vendor2').val(records[2]);
        $('#mid2').val(records[3]);
        $('#description2').val(records[4]);
        $('#features2').val(records[5]);
        $('#cost2').val(records[6]);
        $('#retail2').val(records[7]);
        $('#picture2').attr("src", "/~jadrn061/proj1/ajax_upload/_uploadDIR_/" + records[8].toLowerCase()).show();
        updateFormValidate();
    }
}
function send_form_data2() {
    var sku = $('#sku2').val();
    var category = $('#category2').val();
    var vendor = $('#vendor2').val();
    var mid = $('#mid2').val();
    var description = $('#description2').val();
    var features = $('#features2').val();
    var cost = $('#cost2').val();
    var retail = $('#retail2').val();
    var image = $('#image2').val();
    var url = '/perl/jadrn061/insert/update_data_insert.cgi?sku2=';
    url += sku + "&category2=" + category + "&vendor2=" + vendor + "&mid2=" + mid + "&description2=" + description + "&features2=" + features + "&cost2=" + cost + "&retail2=" + retail + "&image2=" + image;
    var req = new HttpRequest(url, handleEdit_inventory);
    req.send();
    resetUpdateForm(true);
}
function send_file2() {
    var message = 0;
    var form_data = new FormData($('form')[1]);
    form_data.append("image", document.getElementById("image2").files[0]);
    $.ajax({
        url: "/perl/jadrn061/insert/upload_edit.cgi",
        type: "post",
        async: true,
        data: form_data,
        processData: false,
        contentType: false,
        success: function(response) {
            send_form_data2();
        },
        error: function(response) {
            alert("File upload failed.")
        }
    });

}
function handleEdit_inventory(response) {
    $('#update_status').css('color', 'blue');
    $('#update_status').html(response);

}
function updateFormValidate() {
    if (is_form_valid && $('#sku2').val() && ($('#category2').val() !== '-1') && ($('#vendor2').val() !== '-1') && $('#description2').val() && $('#features2').val() && $('#cost2').val() && $('#retail2').val()) {
        $('#button2').prop('disabled', false);
    } else {
        $('#button2').prop('disabled', true);
    }
}

function confirmEdit() {
    var dialogStr = `Confirm do you want to edit this record.
    <table>
    <tr> <td>SKU<td><td> ${$('#sku2').val()}</td></tr>
    <tr> <td>Category<td><td> ${$('#category2').val()}</td></tr>
    <tr> <td>Vendor<td><td> ${$('#vendor2').val()}</td></tr>
    <tr> <td>Manufacturer's Id<td><td> ${$('#mid2').val()}</td></tr>
    <tr> <td>Description<td><td> ${$('#description2').val()}</td></tr>
    <tr> <td>Features<td><td> ${$('#features2').val()}</td></tr>
    <tr> <td>Cost<td><td> ${$('#cost2').val()}</td></tr>
    <tr> <td>Retail<td><td> ${$('#retail2').val()}</td></tr>
    <tr> <td>Picture<td><td> ${$('#image2').val().replace(/.*(\/|\\)/, '').toLowerCase()}</td></tr>
    </table>`;
    $("#dialog").html(dialogStr)
    $("#dialog").dialog({
        modal: true,
        height: 'auto',
        width: 'auto',
        title: 'Edit Record Confirmation',
        buttons: {
            "Edit": function() {
                if ($('#image2').get(0).files.length === 0) {
                    send_form_data2();
                } else {
                    send_file2();
                }
                $(this).dialog("close");
            },
            "Cancel": function() {
                resetUpdateForm(true);
                $(this).dialog("close");
            }
        }
    });
}
function resetUpdateForm(complete) {
    $('#button2').prop('disabled', true);
    document.getElementById('form2').reset();
    $('#picture2').attr("src", '').hide();
    $('#sku2').removeClass();
    if (complete) {
        $('#update_status').empty();
    }
}
