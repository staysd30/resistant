#!/usr/bin/perl
# cs645 
# SIDDIQUI HERA
# JADRN061
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
my $sku = $q->param("sku1");

my $query = "select sku from product where sku='$sku'";


my $sth = $dbh->prepare($query);
$sth->execute();

$count = $sth->rows;

while(my @row=$sth->fetchrow_array()) {
    $response = $row[0];
    }
if($response) {
    $response = "duplicate";
    }
else {
    $response = "ok";
    }
$sth->finish();
$dbh->disconnect();    
print "Content-type: text/html\n\n";
print $response;
