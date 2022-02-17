
<?php
require_once('functions.php');
echo makePageStart("Login");
echo makeHeader();
echo makeNavMenu(""); //send no data to the nav so the login button cannot be pressed as they are on that page now
echo startMain();
?> 



<form method="post" action="loginProcess.php">  <!-- send the details of this logon form to the login process doc -->
		Username <input type="text" name="username"> <!-- input type is text and the name sent is username -->
		Password <input type="password" name="password"> <!-- input type is password to hide text inputted, and the name sent is password -->
		<input type="submit" value="Logon">
</form>

<p>Or go back to <a href = 'index.php'> HOME</a></p> <!-- redirects the user back home if this was a misclick-->

<?php 
echo endMain();
echo makeFooter("try logging in"); //send footer data to assist the user
echo makePageEnd();
?>
