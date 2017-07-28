#!/usr/bin/perl
# cs645 
# SIDDIQUI HERA
# JADRN061

use DBI;
use CGI;
use JSON;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn061";
my $username = "jadrn061";
my $password = "driven";
my $database_source = "dbi:mysql:$database:$host:$port";

my $dbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';

my $q = new CGI;
my $sku = $q->param("sku2");
my $vendor = $q->param("vendor2");
my $category = $q->param("category2");
my $mid = $q->param("mid2");
my $description = $q->param("description2");
my $features= $q->param("features2");
my $cost = $q->param("cost2");
my $retail = $q->param("retail2");
my $image = $q->param("image2");
my $query = "";
my($name,$path,$extension) = fileparse($image,qr/|.[^.]*/);
	my $filename = $name.$extension;
	$filename = lc($filename);
if($image ne ""){	
	
	$query = "update product set catID ='$category',venID ='$vendor',vendorModel ='$mid',description='$description',
     features ='$features',cost ='$cost',retail ='$retail',image ='$filename' where sku = '$sku'";
	 }
else
	{
	$query = "update product set catID ='$category',venID ='$vendor',vendorModel ='$mid',description='$description',
     features ='$features',cost ='$cost',retail ='$retail' where sku = '$sku'";
	 } 
my $sth = $dbh->prepare($query);
$sth->execute();
$sth->finish();
$dbh->disconnect();
print <<EOF;
Content-type:  text/html

<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	<meta http-equiv="content-type" 
		content="text/html;charset=utf-8" />	
</head>
<body>
<h2>Success, the file $image has been uploaded</h2>
</body>
</html>
EOF