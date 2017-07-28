$(document).ready(function() {

    $("#tabs").tabs();
    $("#sku1").focus().select();
    $('#button1').prop('disabled', true).bind('click', function() {
        send_file();
    });
    $('#logout').bind('click', function() {
        logout();
    });
    $('#picture1').hide();
    $('#picture1').on('load', function() {
        $(this).fadeIn(500);
    });
    $('#reset1').click(function() {
        formReset();
    });
	$('#sku1').keyup(function() {
  this.value = this.value.toUpperCase();
});

    $("#sku1").on('blur', function(e) {
        var inputRegex = /^\w{3}-\d{3}$/;
        var inputValue = $(this).val();
        if (!(inputRegex.test(inputValue)) || (inputValue == " ")) {
            $(this).val(null).removeClass('greenborder').addClass('redborder');
            $('#sku1_valid').html('SKU required (Format: XXX-000)')
            formValidate()
        } else {
            $(this).removeClass('redborder').addClass('greenborder');
            $('#sku1_valid').empty()
            var url = '/perl/jadrn061/fetch/check_dup_sku.cgi?sku1=' + $("#sku1").val();
            $.get(url, handleDuplicate);
        }
    });

    // Validate item cost (not null, whole number)
    $('#cost1').blur(function() {
        var inputRegex = /^\d+(?:\.\d{1,2})?$/;
        var inputValue = $('#cost1').val();
        if (!(inputRegex.test(inputValue)) || (inputValue == " ")) {
            $("#cost1").val(null);
            $("#cost1").removeClass('greenborder').addClass('redborder');
            $('#cost1_valid').html('Number Required (eg 10.0)')
        } else {
            $("#cost1").removeClass('redborder').addClass('greenborder');
            $('#cost1_valid').empty()
        }
        formValidate();
    });

    // Validate retail  (not null, whole number)
    $('#retail1').blur(function() {
        var inputRegex = /^\d+(?:\.\d{1,2})?$/;
        var inputValue = $('#retail1').val();
        if (!(inputRegex.test(inputValue)) || (inputValue == " ")) {
            $('#retail1').val(null);
            $('#retail1').removeClass('greenborder').addClass('redborder');
            $('#retail1_valid').html('Number Required (eg 10.0)')
        } else {
            $('#retail1').removeClass('redborder').addClass('greenborder');
            $('#retail1_valid').empty()
        }
        formValidate();
    });
    $('#image1').click(function() {
        $(this).val(null);
        if (!$(this).val()) {
            $('#image1_valid').html('Required.');
            $('#picture1').attr('src', '').hide();
            $(this).removeClass('greenborder').addClass('redborder');
        }
    });

    $('#image1').change(function() {
        if ($(this).val().replace(/.*(\/|\\)/, '').toLowerCase().length > 12) {
            $(this).val(null)
            $('#image1_valid').html('Filename must be less than 12 character.');
            $('#picture1').attr('src', '').hide();
            $(this).removeClass('greenborder').addClass('redborder');
        } else {
            $('#image1_valid').empty();
            $(this).removeClass('redborder').addClass('greenborder');
        }
        formValidate();
    });

    // Validate description (not null, len< 1024)
    $('#description1').on('blur', function(e) {
        if ($(this).val().length > 1024) {
            is_form_valid = false;
            $(this).removeClass('greenborder').addClass('redborder');
            $('#description1_valid').html('Max length 1024')
        } else if (!$(this).val()) {
            $(this).removeClass('greenborder').addClass('redborder');
            $('#description1_valid').html('Required')
        } else {
            $(this).removeClass('redborder').addClass('greenborder');
            $('#description1_valid').empty();
            is_form_valid = true;
        }
        formValidate();
    });

    $('#vendor1').on('blur', function(e) {
        formValidate();
    });

    $('#category1').on('change', function(e) {
        formValidate();
    });

    $('#vendor1').on('change', function(e) {
        formValidate();
    });
    // Validate feature (not null, len< 512)
    $('#features1').on('blur', function(e) {
        if ($(this).val().length > 512) {
            is_form_valid = false;
            $(this).removeClass('greenborder').addClass('redborder');
            $('#features1_valid').html('Max length 512')
        } else if (!$(this).val()) {
            $(this).removeClass('greenborder').addClass('redborder');
            $('#features1_valid').html('Required')
        } else {
            $(this).removeClass('redborder').addClass('greenborder');
            $('#features1_valid').empty();
            is_form_valid = true;
        }
        formValidate();
    });

    // Validate Manufacturer (not null, len< 50)
    $('#mid1').on('blur', function(e) {
        if ($(this).val().length > 50) {
            is_form_valid = false;
            $(this).removeClass('greenborder').addClass('redborder');
            $('#mid1_valid').html('Max length 50')
        } else if (!$(this).val()) {
            $(this).removeClass('greenborder').addClass('redborder');
            $('#mid1_valid').html('Required')
        } else {
            $(this).removeClass('redborder').addClass('greenborder');
            $('#mid1_valid').empty();
            is_form_valid = true;
        }
        formValidate();
    });

});

//Global variable
var is_form_valid = true;

function send_form_data() {
    var sku = $('#sku1').val();
    var category = $('#category1').val();
    var vendor = $('#vendor1').val();
    var mid = $('#mid1').val();
    var description = $('#description1').val();
    var features = $('#features1').val();
    var cost = $('#cost1').val();
    var retail = $('#retail1').val();
    var image = $('#image1').val().replace(/.*(\/|\\)/, '').toLowerCase();
    var url = '/perl/jadrn061/insert/insert.cgi?sku1=' + sku + "&category1=" + category + "&vendor1=" + vendor + "&mid1=" + mid + "&description1=" + description + "&features1=" + features + "&cost1=" + cost + "&retail1=" + retail + "&image1=" + image;
    $.ajax({
        url: url,
        type: "get",
        processData: false,
        contentType: false,
        success: function(response) {
            $('#status').css('color', 'blue').html("Your record has been created.");
            confirmCreate();
        },
        error: function(response) {
            $('#status').css('color', 'red').html("Sorry, an error has occured:  " + response.statusText);
        }
    });
}

function send_file() {
    var form_data = new FormData($('form')[0]);
    form_data.append("image", document.getElementById("image1").files[0]);
    $.ajax({
        url: "/perl/jadrn061/insert/upload.cgi",
        type: "post",
        data: form_data,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#status').css('color', 'blue');
            $('#status').html("Your file has been received.");
            send_form_data();
        },
        error: function(response) {
            $('#status').css('color', 'red');
            $('#status').html("Sorry, an upload error occurred, " + response.statusText + " filename " + fname);
        }
    });
}
function handleUpdate(response) {
    $('#status').css('color', 'blue');
    $('#answer').html(response);
}

function handleDuplicate(response) {
    if (response.startsWith("duplicate")) {
        $('#status').html("This record appears to be a duplicate.").css("color", "red");
    } else if (response.startsWith("ok")) {
        $('#status').html("This record is OK, not a duplicate.").css("color", "green");
    }
    formValidate();
}

function logout() {
    Cookies.remove('jadrn061SID');
    $.ajax({
        type: "GET",
        url: "http://jadran.sdsu.edu/perl/jadrn061/login.cgi",
        dataType: 'json',
        async: true,
        username: "log_me_out",
        password: "log_me_out",
        data: '{ "Logging out user" }'
    })
    //In our case, we WANT to get access denied, so a success would be a failure.
        .done(function() {
        alert('Error!')
    })
    //Likewise, a failure *usually* means we succeeded.
    //set window.location to redirect the user to wherever you want them to go
        .fail(function() {
        window.location = "http://jadran.sdsu.edu/~jadrn061/proj1/";
    });
}

function formValidate() {
    if (is_form_valid && $('#sku1').val() && ($('#category1').val() !== '-1') && ($('#vendor1').val() !== '-1') && $('#description1').val() && $('#features1').val() && $('#cost1').val() && $('#retail1').val() && ($('#image1').val())) {
        $('#button1').prop('disabled', false);
    } else {
        $('#button1').prop('disabled', true);
    }
}

function formReset(){
    document.getElementById('form1').reset();
    $('#sku1_valid').empty().removeClass();
    $('#cost1_valid').empty().removeClass();
    $('#retail1_valid').empty().removeClass();
    $('#image1_valid').empty().removeClass();
    $('#features1_valid').empty().removeClass();
    $('#description1_valid').empty().removeClass();
    $('#picture1').attr('src', '').hide();
    $('#status').empty();
    $('#sku1').removeClass();
    $('#cost1').removeClass();
    $('#retail1').removeClass();
    $('#image1').removeClass();
    $('#features1').removeClass();
    $('#description1').removeClass();
    $('#mid1').removeClass();
}

function confirmCreate() {
    var dialogStr = `Your record is created successfully.
    <table>
    <tr> <td>SKU<td><td> ${$('#sku1').val()}</td></tr>
    <tr> <td>Category<td><td> ${$('#category1').val()}</td></tr>
    <tr> <td>Vendor<td><td> ${$('#vendor1').val()}</td></tr>
    <tr> <td>Manufacturer's Id<td><td> ${$('#mid1').val()}</td></tr>
    <tr> <td>Description<td><td> ${$('#description1').val()}</td></tr>
    <tr> <td>Features<td><td> ${$('#features1').val()}</td></tr>
    <tr> <td>Cost<td><td> ${$('#cost1').val()}</td></tr>
    <tr> <td>Retail<td><td> ${$('#retail1').val()}</td></tr>
    <tr> <td>Picture<td><td> ${$('#image1').val().replace(/.*(\/|\\)/, '').toLowerCase()}</td></tr>
    </table>`;
    $("#dialog").html(dialogStr)
    $("#dialog").dialog({
  				modal: true,
                height:'auto',
                width:'auto',
                title: 'New Record Confirmation',
  				buttons: {
  				"Ok": function() {
  						$(this).dialog("close");
                        formReset();
  					}
  				}
  			});
}
