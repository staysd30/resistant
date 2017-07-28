#!/usr/bin/perl

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::SaltedHash;

##---------------------------- MAIN ---------------------------------------

my $q;
my $user = "";
if(authenticate_user()) {
    send_to_main();
    }
else {
    send_to_login_error();
    }
###########################################################################

###########################################################################
sub authenticate_user {
    $q = new CGI;
    my $user = $q->param("user");
    my $password = $q->param("password");
    open DATA, "</srv/www/cgi-bin/jadrn061/passwords.dat"
        or die "Cannot open file.";
    @file_lines = <DATA>;
    close DATA;

    $OK = 0; #not authorized

    foreach $line (@file_lines) {
        chomp $line;
        ($stored_user, $stored_pass) = split /=/, $line;
        if($stored_user eq $user && Crypt::SaltedHash->validate($stored_pass, $password)) {
            $OK = 1;
            last;
            }
        }
    return $OK;
    }
###########################################################################

###########################################################################
sub send_to_login_error {
    print <<END;
Content-type:  text/html

<html>
<head>
    <meta http-equiv="refresh"
        content="0; url=http://jadran.sdsu.edu/~jadrn061/proj1/error.html" />
</head><body></body>
</html>

END
   }


###########################################################################

###########################################################################
sub send_to_main {
# args are DRIVER, CGI OBJECT, SESSION LOCATION
# default for undef is FILE, NEW SESSION, /TMP
# for login.html, don't look for any existing session.
# Always start a new one.  Send a cookie to the browser.
# Default expiration is when the browser is closed.
# WATCH YOUR COOKIE NAMES! USE JADRNXXX_SID
    my $session = new CGI::Session(undef, undef, {Directory=>'/tmp'});
    $session->expires('+1d');
    my $cookie = $q->cookie(jadrn061SID => $session->id);
    print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser
    my $sid = $session->id;
    print <<END;
    <html>

    <head>
        <link rel="stylesheet" href="/~jadrn061/proj1/newrecord.css" />
        <link rel="stylesheet" href="/~jadrn061/proj1/css/jquery-ui.min.css" />
        <link rel="stylesheet" href="/~jadrn061/proj1/css/jquery-ui.structure.min.css" />
        <link rel="stylesheet" href="/~jadrn061/proj1/css/jquery-ui.theme.min.css" />
        <link rel="stylesheet" href="/~jadrn061/proj1/newrecord.css" />

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" type="text/javascript"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.3/js.cookie.min.js" type="text/javascript"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" type="text/javascript"></script>
        <script src="/~jadrn061/proj1/ajax_get_lib.js"></script>

        <script src="/~jadrn061/proj1/fetch_js/fetch_vendor.js"></script>
        <script src="/~jadrn061/proj1/newrecord.js"></script>
        <script src="/~jadrn061/proj1/deleterecord.js"></script>
        <script src="/~jadrn061/proj1/fetch_js/update_data_fetch.js"></script>

    </head>

    <body>
        <div class="main">
            <div class="header">
                <h1>Eva Bookstore</h1></div>
            <div class="absolute">
                <button id='logout' class="ui-button ui-corner-all ui-widget ui-btn-icon-left">Logout</button></div>
            <div id="tabs" class="ui-tabs ui-corner-all ui-widget ui-widget-content">
                <ul>
                    <li><a href="#tabs-1"><span>New Record</span></a></li>
                    <li><a href="#tabs-2"><span>Edit Record</span></a></li>
                    <li><a href="#tabs-3"><span>Delete Record</span></a></li>
                </ul>
                <div id="tabs-1">
                    <h2>New Record</h2>
                    <h3 id="status" style='color:red;text-align:center'></h3>
                    <form method="POST" action="" enctype="multipart/form-data" name="form1" id="form1">
                        <table>
                            <tr>
                                <td>SKU</td>
                                <td><input type="text" name="sku" size="15" id="sku1"></td>
                                <td id='sku1_valid'></td>
                            </tr>
                            <tr>
                                <td>Category </td>
                                <td><select id="category1" name="category" class="category"></select></td>
                            </tr>
                            <tr>
                                <td>Vendor </td>
                                <td><select id="vendor1" name="vendor" class="vendor"></select></td>
                            </tr>
                            <tr>
                                <td>Manufacturer's Id </td>
                                <td><input type="text" name="mid" id="mid1"></td>
                                <td id='mid1_valid'></td>
                            </tr>
                            <tr>
                                <td>Description </td>
                                <td><input type="text" name="description" id="description1"></td>
                                <td id='description1_valid'></td>
                            </tr>
                            <tr>
                                <td>Features </td>
                                <td><input type="text" name="features" id="features1"></td>
                                <td id='features1_valid'></td>
                            </tr>
                            <tr>
                                <td>Cost </td>
                                <td><input type="text" name="cost" required id="cost1"></td>
                                <td id='cost1_valid'></td>
                            </tr>
                            <tr>
                                <td>Retail </td>
                                <td><input type="text" name="retail" required id="retail1"></td>
                                <td id='retail1_valid'></td>
                            </tr>
                            <tr>
                                <td>Image </td>
                                <td><input type="file" name="image1" id="image1" onchange="document.getElementById('picture1').src = window.URL.createObjectURL(this.files[0])" /></td>
                                <td id='image1_valid'></td>
                                <td><img src="" id="picture1" alt="picture" width="100" height="150" /></td>

                            </tr>
                            <tr>
                                <td><input type='button' value='Submit' class='submit_btn' id='button1' /></td>
                                <td><input type='reset' value='Reset' class='reset_btn' id='reset1' /></td>
                            </tr>
                        </table>
                    </form>
                </div>
                <div id="tabs-2">
                    <h2>Edit Existing Record</h2>
                    <h3 id="update_status" style='color:red;text-align:center'></h3>
                    <form id="form2" method="POST" action="" enctype="multipart/form-data" name="form2">
                        <table>
                            <tr>
                                <td>SKU </td>
                                <td> <input type="text" name="sku2" size="15" id="sku2"></td>
                                <td id='sku2_valid'></td>
                            </tr>
                            <tr>
                                <td>Category </td>
                                <td><select id="category2" name="category2" class="category"></select></td>
                            </tr>
                            <tr>
                                <td>Vendor </td>
                                <td><select id="vendor2" name="vendor2" class="vendor"></select></td>
                            </tr>
                            <tr>
                                <td>Manufacturer's Id </td>
                                <td><input type="text" name="mid" id="mid2"></td>
                                <td id='mid2_valid'></td>
                            </tr>
                            <tr>
                                <td>Description </td>
                                <td><input type="text" name="description" id="description2"></td>
                                <td id='description2_valid'></td>
                            </tr>
                            <tr>
                                <td>Features </td>
                                <td><input type="text" name="features" id="features2"></td>
                                <td id='features2_valid'></td>
                            </tr>
                            <tr>
                                <td>Cost </td>
                                <td><input type="text" name="cost" id="cost2"></td>
                                <td id='cost2_valid'></td>
                            </tr>
                            <tr>
                                <td>Retail </td>
                                <td><input type="text" name="retail" id="retail2"></td>
                                <td id='retail2_valid'></td>
                            </tr>
                            <tr>
                                <td>Image </td>
                                <td><input type="file" name="image2" id="image2" onchange="document.getElementById('picture2').src = window.URL.createObjectURL(this.files[0])" /></td>
                                <td id='image2_valid'></td>
                                <td><img src="" id="picture2" alt="picture" width="100" height="150" /></td>
                            </tr>
                            <tr>
                                <td><input type='button' value='Edit' class='submit_btn' id='button2'></td>
                                <td><input type='reset' value='Reset' class='reset_btn' id='reset2' /></td>
                            </tr>
                        </table>

                    </form>
                </div>
                <div id="tabs-3">
                    <h2>Delete Record</h2>
                    <h3 id="delete_status" style='color:red;text-align:center'></h3>
                    <form method="POST" action="" name="form3" id="form3">
                        <table>
                            <tr>
                                <td>SKU </td>
                                <td> <input type="text" name="sku" size="15" id="sku3"></td>
                                <td id='sku3_valid'></td>
                            </tr>
                            <tr>
                                <td>Category </td>
                                <td><select id="category3" name="category2" class="category" disabled></select></td>
                            </tr>
                            <tr>
                                <td>Vendor </td>
                                <td><select id="vendor3" name="vendor2" class="vendor" disabled></select></td>
                            </tr>
                            <tr>
                                <td>Manufacturer's Id </td>
                                <td><input type="text" name="mid" id="mid3" disabled></td>
                            </tr>
                            <tr>
                                <td>Description </td>
                                <td><input type="text" name="description" id="description3" disabled></td>
                            </tr>
                            <tr>
                                <td>Features </td>
                                <td><input type="text" name="features" id="features3" disabled></td>
                            </tr>
                            <tr>
                                <td>Cost </td>
                                <td><input type="text" name="cost" id="cost3" disabled></td>
                            </tr>
                            <tr>
                                <td>Retail </td>
                                <td><input type="text" name="retail" id="retail3" disabled></td>
                            </tr>
                            <tr>
                                <td>Image </td>
                                <td><img src="" id="picture3" alt="picture" width="100" height="150" style="display: none;" /></td>
                            </tr>
                            <tr>
                                <td><input type='button' value='Delete' class='submit_btn' id='button3'></td>
                                <td><input type='reset' value='Reset' class='reset_btn' id='reset3' /></td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        </div>
        <div id="dialog" class="ui-dialog-title"></div>
    </body>

    </html>

END
}
###########################################################################
