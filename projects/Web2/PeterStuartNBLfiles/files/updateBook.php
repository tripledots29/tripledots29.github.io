<?php
ini_set("session.save_path", "/home/unn_w18010680/sessionData");
session_start();
?>


<?php
require_once('functions.php');
echo makePageStart("Update Book");
echo makeHeader();

?>

<?php
if (isset($_SESSION['logged-in']) and ($_SESSION['logged-in']) == true) { //the user could easily type this page into the URL so it also needs to be restricted by if the user is in a logged in session
	echo makeNavMenu("logout.php");
	echo startMain();
	// Retrieve variables and check validity + trim to ensure validity
	$bookISBN = filter_has_var(INPUT_GET, 'bookISBN') ? $_GET['bookISBN'] : null;
	$bookISBN = trim($bookISBN);
	$bookTitle = filter_has_var(INPUT_GET, 'bookTitle') ? $_GET['bookTitle'] : null;
	$bookTitle = trim($bookTitle);
	$bookYear = filter_has_var(INPUT_GET, 'bookYear') ? $_GET['bookYear'] : null;
	$bookYear = trim($bookYear);
	$pubName = filter_has_var(INPUT_GET, 'pubName') ? $_GET['pubName'] : null;
	$pubName = trim($pubName);
	$catDesc = filter_has_var(INPUT_GET, 'catDesc') ? $_GET['catDesc'] : null;
	$catDesc = trim($catDesc);
	$bookPrice = filter_has_var(INPUT_GET, 'bookPrice') ? $_GET['bookPrice'] : null;
	$bookPrice = trim($bookPrice);

	$errors = false; //set errors to false orignally and only set it to true if a section of a book's information is missing

	if (empty($bookISBN)) {
		echo "<p>You need to have selected an ISBN.</p>\n";
		$errors = true;
	}
	if (empty($bookTitle)) {
		echo "<p>You need to choose a title.</p>\n";
		$errors = true;
	}
	if (empty($bookYear)) {
		echo "<p>You need to choose a year.</p>\n";
		$errors = true;
	}
	if (empty($pubName)) {
		echo "<p>You need to choose a publisher name.</p>\n";
		$errors = true;
	}
	if (empty($catDesc)) {
		echo "<p>You need to choose a category description.</p>\n";
		$errors = true;
	}
	if (empty($bookPrice)) {
		echo "<p>You need to choose a price.</p>\n";
		$errors = true;
	}
	if ($errors === true) {
		echo "<p>Please try <a href='chooseBookList.php'>again</a>.</p>\n"; //if there are errors (sections missing) then the user is redirected to the book list to choose again
	}


	else { //if no errors are found
		try {

			require_once("functions.php"); //connect to the database
			$dbConn = getConnection();

			/*these are queries i had to make because i did not know how to pass the pub ID and cat ID while having the descriptions show in the editBookForm dropdowns. Therefore these queries select the ID where the descriptions sent from the form are equal to the descriptions in the publisher/category table. This is probably not the intended solution but i found that it works perfectly while still adheering to the coding techniques taught */

			$sqlQuerySetPubID = "SELECT pubID
					FROM NBL_publisher
					WHERE pubName = '$pubName';";
			
			$sqlQuerySetCatID = "SELECT catID
					FROM NBL_category
					WHERE catDesc = '$catDesc';";

			$queryPubID = $dbConn->query($sqlQuerySetPubID);
			$queryCatID = $dbConn->query($sqlQuerySetCatID); //query these select statements
			
			$pubID = $queryPubID->fetchObject(); //fetch the objects given from this query and set themto the variables to be input into the database
			$catID = $queryCatID->fetchObject();

			$updateSQL = "UPDATE NBL_books SET bookTitle = '$bookTitle', bookYear = '$bookYear', pubID = '{$pubID->pubID}', catID = '{$catID->catID}', bookPrice = '$bookPrice'  WHERE bookISBN = '$bookISBN';"; //update the database with the data given by the user in the form
			$dbConn->exec($updateSQL); //execute the update
			echo "<p>Book updated. Return to <a href = 'index.php'> HOME</a></p>\n"; //inform the user that the book has been updated
		} catch (Exception $e) {
			 echo "<p>Book not updated: " . $e->getMessage() . "</p>\n"; //if there was error in updating the book then inform the user of this
		}
	}
}

//if the user could not access this page then they are told to login and the nav bar is updated to also have a login link
else { 
	echo makeNavMenu("login.php"); 
	echo startMain();
	echo"<p>Please login first <a href = 'login.php'> here</a></p>\n";
}

echo endMain();
echo makeFooter("Book Update Processing...");
echo makePageEnd();

?>