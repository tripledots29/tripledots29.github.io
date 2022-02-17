<?php // HOME PAGE
ini_set("session.save_path", "/home/unn_w18010680/sessionData");
session_start(); 

require_once('functions.php'); 
echo makePageStart("Northumbria Books Limited"); //pass the value to set the title to this
echo makeHeader(); //sets header 

if (isset($_SESSION['logged-in']) and ($_SESSION['logged-in']) == true) {	 //see if they are logged in 
	echo makeNavMenu("logout.php"); //if logged in then set the login/logout button to logout
}
else
{
	echo makeNavMenu("login.php"); //if logged out then set the login/logout button to login

}

echo startMain(); 
?>
<h2>Welcome</h2>
<p>This is the Northumbria Book Limited home page</p> 
<p>Look above for special offers</p>
<script type="text/javascript" src="offers.js"></script>
<?php //basic welcome page inside main functions
echo endMain();

echo makeFooter("Home Page"); //pass this string so the page is known (footers mainly used for troubleshooting)
echo makePageEnd();
?>