<?php

if (isset($_POST['submit']))
{
    $name = $_POST['name'];
    $mailFrom = $_POST['mail'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];


    $mailTo = "peter.stuart@northumbria.ac.uk";
    $headers = "From: ".$mailFrom;
    $txt = "You have received an email from ".$name.". \n\n".$message;

    mail($mailTo, $subject, $txt, $headers);

    header("Location: index.html?mailsend");
}

?>