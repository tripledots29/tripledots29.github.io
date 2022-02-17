<?php
ini_set("session.save_path", "/home/unn_w18010680/sessionData");
session_start();
?>

<?php
require_once('functions.php');
echo makePageStart("Edit Book Form");
echo makeHeader();
?>

<?php

$bookISBN = filter_has_var(INPUT_GET, 'bookISBN') ? $_GET['bookISBN'] : null; //variable bookISBN is the bookISBN carried from the link clicked in the book list

//$newBookISBN = trim($bookISBN,"X");
$newBookISBN = preg_replace('/[^0-9]/', '', $bookISBN);

if (isset($_SESSION['logged-in']) and ($_SESSION['logged-in']) == true) {	//the user could easily type this page into the URL so it also needs to be restricted by if the user is in a logged in session
	echo makeNavMenu("logout.php");
	echo startMain();
	
	if (empty($bookISBN)) {
		echo "<p>Please <a href='chooseBookList.php'>choose</a> a valid book.</p>\n"; //if there is no ISBN attached to that book then the user will be redirected to choose a valid book
	}
	else {
		try {
			require_once("functions.php");
			$dbConn = getConnection();

			$sqlQueryAllData = "SELECT bookISBN, bookTitle, bookYear, bookPrice, catDesc, pubName
					 FROM NBL_books
					 INNER JOIN NBL_category
					 ON NBL_category.catID = NBL_books.catID
					 INNER JOIN NBL_publisher
					 ON NBL_publisher.pubID = NBL_books.pubID			 
					 WHERE bookISBN = $newBookISBN";
			//select all useful information from the book database for the form where the bookISBN is equal to ISBN given from the book list

			$sqlQueryPubs = "SELECT pubName
					FROM NBL_publisher
					order by pubName";
			//select the publisher names ready for the dropdown list
			$queryResultPubs = $dbConn->query($sqlQueryPubs);
			//query this data
			

			$sqlQueryCats = "SELECT catDesc
					 FROM NBL_category
					 order by catDesc";				 
			//select the category descriptions ready for the dropdown list
		    $queryResultCats = $dbConn->query($sqlQueryCats);
			//query this data


			

			$queryResult = $dbConn->query($sqlQueryAllData);
			
			$rowObj = $queryResult->fetchObject();
			//fetch the objects of the row where the bookISBN was equal

			//form details are sent to the updateBook file
			echo "
			<h1>Update '{$rowObj->bookTitle}'</h1> 
			<form id='updateBook' action='updateBook.php' method='get'>
				<p>Book ISBN <input type='text' name='bookISBN' value='$bookISBN' readonly /></p>
				<p>Book Title <input type='text' name='bookTitle' size='100' value='{$rowObj->bookTitle}' /></p>
				<p>Book Year <input type='number' name='bookYear' min='1000' max = '2020' value='{$rowObj->bookYear}' /></p>";
				//bookISBN is set to readonly so the user cannot change this as it is the primary key for the update
				//bookTitle is set to type text with a with a maximum size of 100 to prevent data spam or user error
				//bookYear is set to type number with a min and max to prevent no unsanitary data entering the table. The max is set to this year and earliest to 1000 to prevent no impossible data entering the system

				//publisher names dropdown section
				echo"<label>Publisher Name<select name ='pubName'>";								
				while($currentPubName = $queryResultPubs->fetchObject()){ //while loop for searching through the publisher names

					if($rowObj->pubName == $currentPubName->pubName) { //if the publisher name from the query of all data (taken from where the bookISBN was passed) is equal to the publisher  then set the variable selected the string selected so the in the dropdown the preset option is this value
					$selected = 'selected';
					}
					else{ //if not then the selected variable is not written to 
						$selected = '';
					}
					echo"<option value = '{$currentPubName->pubName}' $selected > {$currentPubName->pubName}</option>"; 
					//echo out the dropdown with all the publishers, with one preselected
				}
				echo"</select></label> 

				<p></p>";
				//end the dropdown
				
				//category descriptions dropdown section which uses the same loop as publisher name 
				echo"<label>Category Description<select name ='catDesc'>";								
				while($currentCatDesc = $queryResultCats->fetchObject()){

					if($rowObj->catDesc == $currentCatDesc->catDesc) { 
					$selected = 'selected';
					}
					else{
						$selected = '';
					}
					echo"<option value = '{$currentCatDesc->catDesc}' $selected > {$currentCatDesc->catDesc}</option>";
				}
				echo"</select></label>
				
				
				<p>Book Price <input type='number' name='bookPrice' min='0.01' min='99.99' step='0.01' value='{$rowObj->bookPrice}' /></p>	
				<p><input type='submit' name='submit' value='Update Book'></p>
			</form>
			";
			//bookPrice is set to to a number that has a min price of a penny and max of 99.99 with a step increase of 0.01. This is so the user cannot input incorrect data
		}
		catch (Exception $e){
			echo "<p>Book details not found: ".$e->getMessage()."</p>\n"; // if there is an error because the book details are not found this will catch the error
		}
	}
}

//if the user has not logged in then this will be run instead, informing them to login and set the nav bar to login button
else {
	echo makeNavMenu("login.php");
	echo startMain();
	echo"<p>Please login first <a href = 'loginForm.php'> here</a></p>\n"; 
}

echo endMain();
echo makeFooter("Book Update Form"); 
echo makePageEnd();

?>