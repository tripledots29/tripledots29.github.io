<?php

function getConnection() {
try {
$connection = new PDO("mysql:host=localhost;dbname=unn_w18010680",
 "unn_w18010680", "bec02ky71"); // connect to my database
$connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
return $connection;
} catch (Exception $e) {
throw new Exception("Connection error ". $e->getMessage(), 0, $e); //if cant connect
}
}

//page start used to set the head and basic html tags needed for a new page. also links the stylesheet to keep website theme consistent
function makePageStart($title) {
$pageStartContent = <<<PAGESTART
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>$title</title>
<link href="mystyle.css" rel="stylesheet" type="text/css">
</head>
<body>
PAGESTART;
$pageStartContent .="\n";
return $pageStartContent; // return the content as a variable to later be echoed by each page using it
}

//another basic html function to set the header on each page and the aside content which will be filled with html and json data using javascript
function makeHeader(){
$headContent = <<<HEAD
<header>
<h1>Northumbria Books Limited</h1>
</header>

<aside id="offers"></aside>

<aside id="JSONoffers"></aside>

HEAD;
$headContent .="\n";
return $headContent;
}


function makeNavMenu($status) { //navigation to all parts of the website, featuring a button which changes depending on whether the user is logged in or not and sends them to the correct page to change this status. This button is floated right to stand out and remain consistent
$loginoutbutton = strtoupper(substr($status,0,-4)); //the button to login/out is made prominent in caps and removes the .php at the end using substring
$navMenuContent = <<<NAVMENU
<nav>
<ul>
<li><a href="index.php">Home</a></li>
<li><a href="chooseBookList.php">Edit Books (ADMIN ONLY)</a></li>
<li><a href="orderBooksForm.php">Buy a Book</a></li>
<li><a href="credits.php">Credits</a></li>
<li style="float:right"><a href="$status">$loginoutbutton</a></li>
</ul>
</nav>
NAVMENU;
$navMenuContent .= "\n";
return $navMenuContent;
}
function startMain() { //open the main area of the page
return "<main>\n";
}
function endMain() { //ends the main area of the page
return "</main>\n";
}
function makeFooter($footerText) { //sets the footer to data dependent on the page/status
$footContent = <<<FOOT
<footer>
<p>$footerText</p>
</footer>
FOOT;
$footContent .="\n";
return $footContent;
}
function makePageEnd() { //ends each page, listed at the end of each file
return "</body>\n</html>";
}
?>
