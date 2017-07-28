#!/usr/bin/perl
# CS645
# SIDDIQUI HERA
# jadrn061

use DBI;
use CGI;
my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn061";
my $username = "jadrn061";
my $password = "driven";
my $database_source = "dbi:mysql:$database:$host:$port";
my $response = "";
my $dbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';
my $q = new CGI;
my $sku = $q->param("sku3");
my $query = "select * from product where sku='$sku'";

my $sth = $dbh->prepare($query);
$sth->execute();

while(my @row=$sth->fetchrow_array()) {
   foreach $item (@row) {
     $response .= $item."|"; #field separator
	 }
    }

if($response) {
    $response = substr $response, 0, (length($response) - 1);
    }
unless($response) {
    $response = "invalid";
    }

$sth->finish();
$dbh->disconnect();

print "Content-type: text/html\n\n";
print $response;
