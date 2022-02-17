<?php // Credits
ini_set("session.save_path", "/home/unn_w18010680/sessionData");
session_start(); // start the session to see if they are logged in 

require_once('functions.php'); 
echo makePageStart("Credits"); //pass the value to set the title to this
echo makeHeader();
if (isset($_SESSION['logged-in']) and ($_SESSION['logged-in']) == true) {	
	echo makeNavMenu("logout.php"); //if logged in then set the login/logout button to logout
}
else
{
	echo makeNavMenu("login.php"); //if logged out then set the login/logout button to login

}
echo startMain();
?>

<h2>Credits Page</h2>
<p>Name: Peter David Stuart</p> 
<p>Student ID: W18010680</p> 

<!-- week 1 php recap and introduction to PDOs/sql stuff helped to initilise the site with database functions -->
<p>Credits: Elvin, G. (2020) 'PHP re-cap' [Recorded lecture]. KF5002: Web Programming. Northumbria University. 24 September. Available at: <a href= "https://northumbria.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=a9896639-d130-4009-908a-ac4000c0b774&start=undefined">HERE</a> (Accessed: 8 October 2020). </p>

<p>Credits: Elvin, G. (2020) 'PHP exceptions and PDO' [Recorded lecture]. KF5002: Web Programming. Northumbria University. 24 September. Available at: <a href= "https://northumbria.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=31ed319d-8d03-4e57-9ca8-ac4000f91ffa&start=undefined">HERE</a> (Accessed: 8 October 2020). </p> 

<!-- week 2  database management which helped with choosing, editting and updating the books -->

<p>Credits: Anderson, E. (2020) 'Database Information Management' [Recorded lecture]. KF5002: Web Programming. Northumbria University. 1 October. Available at: <a href= "https://northumbria.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=98f9b7ca-4f92-48b3-8b74-ac45014a5282&start=undefined">HERE</a> (Accessed: 8 October 2020). </p> 

<!-- week 3 valditity and sanitisation helped with keeping data entered and received to be safe for the site/database -->

<p>Credits: Elvin, G. (2020) 'Validating Data' [Recorded lecture]. KF5002: Web Programming. Northumbria University. 8 October. Available at: <a href= "https://northumbria.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=c2ba8b4c-54b1-416e-8c1c-ac4d00b3f276&start=undefined">HERE</a> (Accessed: 14 October 2020). </p> 

<p>Credits: Elvin, G. (2020) 'Sanitising Data' [Recorded lecture]. KF5002: Web Programming. Northumbria University. 8 October. Available at: <a href= "https://northumbria.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=6471cbac-1a2a-477d-9a01-ac4d00c58ea3&start=2.688519">HERE</a> (Accessed: 14 October 2020). </p> 


<!-- week 4 hashing and session. these helped with the session of the login/logout system on the site and i learned about password verification -->

<p>Credits: Elvin, G. (2020) 'Hashing' [Recorded lecture]. KF5002: Web Programming. Northumbria University. 15 October. Available at: <a href= "https://northumbria.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=97a179e9-aca7-415c-b75f-ac5400f13d0b&start=undefined">HERE</a> (Accessed: 21 October 2020). </p> 


<p>Credits: Elvin, G. (2020) 'Sessions' [Recorded lecture]. KF5002: Web Programming. Northumbria University. 15 October. Available at: <a href= "https://northumbria.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=76e883c7-6175-47c7-8002-ac5500c1f9ee&start=undefined">HERE</a> (Accessed: 21 October 2020). </p> 

<!-- week 5 functions continued. this lecture helped make my site consistent as i implemented functions that displayed the same nav menu and header on every page. also i added functions that passed variables such as a different footer, title and even a variable that changed depending on whether the user was logged in or not -->

<p>Credits: Elvin, G. (2020) 'Further way to use functions' [Recorded lecture]. KF5002: Web Programming. Northumbria University. 22 October. Available at: <a href= "https://northumbria.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=22deda57-e7f5-447c-be08-ac5a00e8a713&start=undefined">HERE</a> (Accessed: 28 October 2020). </p> 

<!-- week 6 handling exceptions. this lecture assissted me with catching errors and therefore i added many inside my site when handling data that could be wrong -->

<p>Credits: Elvin, G. (2020) 'Handling exceptions' [Recorded lecture]. KF5002: Web Programming. Northumbria University. 29 October. Available at: <a href= "https://northumbria.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=5e72f307-1187-4f54-8ba0-ac610155178a&start=undefined">HERE</a> (Accessed: 4 November 2020). </p> 

<!-- week 7 introduction to javascript. This set of lectures introduced me to the basic variables, operators and functions within the javascript language-->

<p>Credits: Vasiliou, C. (2020) 'Introduction to Javascript' [Recorded lecture]. KF5002: Web Programming. Northumbria University. 5 November. Available at: <a href= "https://elp.northumbria.ac.uk/ultra/courses/_666611_1/outline/edit/document/_9385316_1?courseId=_666611_1">HERE</a> (Accessed: 11 November 2020). </p> 

<!-- week 8 events and forms. this set of javascript lectures assissted me further on how to implement functions into form data. also i learned of event handlers and how to validate my form-->

<p>Credits: Vasiliou, C. (2020) 'Events, Forms and DOM' [Recorded lecture]. KF5002: Web Programming. Northumbria University. 12 November. Available at: <a href= "https://elp.northumbria.ac.uk/ultra/courses/_666611_1/outline/edit/document/_9383569_1?courseId=_666611_1">HERE</a> (Accessed: 18 November 2020). </p> 

<!-- week 10 ajax. this set of lectures pre-recorded by Rooksby, J featured vital information to assist with the final part of my assignment. i learnt how to fetch html/json data using methods like finding the application type in the headers of the called URL -->

<p>Credits: Rooksby, J. (2020) 'Structured data: xml and json AJAX' [Recorded lecture]. KF5002: Web Programming. Northumbria University. 26th November. Available at: <a href= "https://elp.northumbria.ac.uk/ultra/courses/_666611_1/outline/edit/document/_9441961_1?courseId=_666611_1">HERE</a> (Accessed: 2 December 2020). </p> 

<!-- This is how i understood what a preg_replace funtion was and how it could help me with a problem i encountered with two books in the database. i could not edit these specific ones and i realised it was because there was a letter at the ends which could not be fetched by my sql select statement, therefore my only possible solution was to investigate this handy function -->
<p>Credits: W3Schools (2020) PHP preg_replace() Function. Available at: <a href= "https://www.w3schools.com/php/func_regex_preg_replace.asp">HERE</a>  (Accessed: 1 January 2021)</p>

<?php 
echo endMain();
echo makeFooter("Harvard Referenced");
echo makePageEnd();
?>