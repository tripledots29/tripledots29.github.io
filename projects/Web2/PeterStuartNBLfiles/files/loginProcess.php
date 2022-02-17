<?php
ini_set("session.save_path", "/home/unn_w18010680/sessionData");
session_start();
?>

<?php
require_once('functions.php'); //calls the functions file with all the functions in to make the page work
echo makePageStart("Login Processing"); //set title to login processing
echo makeHeader();
echo makeNavMenu(""); //nav should not contain a login/logout button as this is currently being processed
echo startMain();
?>

<?php
$username = filter_has_var(INPUT_POST, 'username') ? $_POST['username']: null;
$username = trim($username);
$password = filter_has_var(INPUT_POST, 'password') ? $_POST['password']: null;
$password = trim($password);

//make sure that the variables are being sent and then trim them down to ensure validity

if (empty($username) || empty($password)) {
	echo "<p> You need to provide a  username and password. Please try <a href='login.php'> again</a>.</p>\n";
	echo makeFooter("Not logged in");
	//if either of these variables do come back as null then the user is informed to input them both again
}

else {
	try {
		//once they have input both a username and a password it clears the session
		unset($_SESSION['username']);
		unset($_SESSION['logged-in']);
		require_once("functions.php");
		$dbConn = getConnection();
		//query to select the password hash from the user where the username equals the one input
		$querySQL = "SELECT passwordHash FROM NBL_users WHERE username = :username";
		$stmt = $dbConn->prepare($querySQL);
		$stmt->execute(array(':username' => $username));
		//executes the statement using the username 
		$user = $stmt->fetchObject();
		//returns that record as a variable called user

		//if a record is returned from this query
		if($user) {
			if (password_verify($password, $user->passwordHash)) {
			//the password is verified
				echo"<p>Logon success</p>\n";
				echo"<a href='chooseBookList.php'>You may edit books here</a>\n";		
				$_SESSION['logged-in'] = true; //session login is true because user login has been successful
				$_SESSION['username'] = $username;	//session username is set to the username variable that was input
				echo makeFooter("Logged in"); //make the footer say logged in (mostly for troubleshooting purposes)
			}
			else {
				echo"<p>Username or Password incorrect. Please try <a href = 'login.php'> again</a></p>\n"; //if the password was wrong then the user is informed that either username or password could be wrong so they do not know if they inputted a valid user, this is for security reasons
				echo makeFooter("Not logged in"); //make the footer say not logged in (mostly for troubleshooting purposes)
			}
		}
		else {
			echo"<p>Username or Password incorrect. Please try <a href = 'login.php'> again</a></p>\n"; // if there is no user record returned then the user is informed that either username or password could be wrong which is true as we do not know if the password entered was correct and this also ensures security as it identical to the message if they did get the username correct
			echo makeFooter("Not logged in"); //make the footer say not logged in (mostly for troubleshooting purposes)
		}
	}
	catch (Exeption $e) {
		echo"Record not found: " . $e->getMessage(); //if there is an error in receiving a record then this error message will be triggered by a catch
	}
}

echo endMain();
echo makePageEnd();
?>