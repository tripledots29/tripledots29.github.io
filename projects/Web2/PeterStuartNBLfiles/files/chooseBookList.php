<?php
ini_set("session.save_path", "/home/unn_w18010680/sessionData");
session_start();
?>

<?php
require_once('functions.php');
echo makePageStart("Book List"); //sets title to book list for consistency
echo makeHeader();
?>

<?php
if (isset($_SESSION['logged-in']) and ($_SESSION['logged-in']) == true) { //if session is set and user is logged into the session then...
	echo makeNavMenu("logout.php"); //change nav to say log out because the user is now logged in
	echo startMain();
	echo makeFooter("Book Info"); //footer is set to book info as the user can see books as they are logged in
	try {		
		require_once("functions.php"); //connect to the database using a function from the functions php doc
		$dbConn = getConnection(); //set variable dbConn to getting connection to this database

		$sqlQuery = "SELECT bookISBN, bookPrice, bookTitle, bookYear, catDesc
					 FROM NBL_books
					 INNER JOIN NBL_category
					 ON NBL_category.catID = NBL_books.catID
					 ORDER BY bookTitle";
		// create an sql statement to select all the information that the user needs to see in the book list
		$queryResult = $dbConn->query($sqlQuery);
		//query this statement
		
			 
	
		echo"<h2>All books available to edit</h2>
			 <h3>Simply click a book's name to edit its details</h3>"; //tell the user that these are all the books
		//table of books from sql
		echo"<table>";
		echo"<tr><th>Book ISBN</th><th>Book Title</th><th>Book Year</th><th>Category Description</th><th>Book Price</th><tr>"; //set table headings 
		while ($rowObj = $queryResult->fetchObject()) {	//for every row of data
			echo"<tr><td>{$rowObj->bookISBN}</td><td><a href='editBookForm.php?bookISBN={$rowObj->bookISBN}'>{$rowObj->bookTitle}</a></td><td>{$rowObj->bookYear}</td><td>{$rowObj->catDesc}</td><td>{$rowObj->bookPrice}</td><tr>"; //fill in the book list with each book's valuable info and set the title to a clickable link where the bookISBN is sent
		}
		echo"</table>"; //end the table now all information is inputted into it
	}
	catch (Exception $e){
		echo "<p>Query failed: ".$e->getMessage()."</p>\n"; //if the query is unsuccessful
	}

}

else { //this else is if the user is not logged in so the nav button is set to login and they are told to login which also links to the login form
	echo makeNavMenu("login.php"); 
	echo startMain();
	echo"<p>Please login first <a href = 'login.php'> here</a></p>\n";
	echo makeFooter("Admin Restricted Content"); //inform the user that this is restricted content that they are trying to view
}

echo endMain();
echo makePageEnd();

?>
