#!/usr/bin/perl
# cs645 
# SIDDIQUI HERA
# JADRN061

use DBI;
use CGI;
use JSON;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn061";
my $username = "jadrn061";
my $password = "driven";
my $database_source = "dbi:mysql:$database:$host:$port";

my $dbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';

my $q = new CGI;
my $sku = $q->param("sku1");
my $vendor = $q->param("vendor1");
my $category = $q->param("category1");
my $mid = $q->param("mid1");
my $description = $q->param("description1");
my $features= $q->param("features1");
my $cost = $q->param("cost1");
my $retail = $q->param("retail1");
my $image = $q->param("image1");

my $query = "insert into product values('$sku','$category','$vendor','$mid','$description','$features','$cost','$retail','$image')";
my $sth = $dbh->prepare($query);
$response = $sth->execute();
$sth->finish();
$dbh->disconnect();
print "Content-type: text/html\n\n";
if($response) {
    $response = "Success: New Record instered into database";
    }
else {
    $response = "Failure: Something went wrong";
    }
