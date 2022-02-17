<?php
ini_set("session.save_path", "/home/unn_w18010680/sessionData");
session_start();
?>

<?php
require_once('functions.php');
echo makePageStart("Logout");
echo makeHeader();
echo makeNavMenu(""); //send no data to the nav so the logout button cannot be pressed as they are on that page now
echo startMain();


$_SESSION = array(); //empties the session array
session_destroy(); //destroys the session
echo"<p>You have logged out. Return to <a href = 'index.php'> HOME</a></p>\n"; //redirects the user now they have logged out


echo endMain();
echo makeFooter("Logged out");
echo makePageEnd();
?>