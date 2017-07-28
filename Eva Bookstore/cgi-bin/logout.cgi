#!/usr/bin/perl
#   CS645, Spring 2017
#   Siddiqui Hera
#   jadrn061

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $sid = $q->cookie("jadrn061SID") || undef;
$session = new CGI::Session(undef, $sid, {Directory => '/tmp'});
$session->delete();
$session->flush();
my $cookie = $q->cookie(jadrn061SID => '');
print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser


print <<END;

<html>
<head>

</head>
<body>
<h2>You are now logged out<h2>
</body>
</html>

END
