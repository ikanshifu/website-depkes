<?php
 $conn = new mysqli('localhost','root','','health_form');
 if($conn->connect_error){
    die('Connection Failed : '.$conn->connect_error);
 }
?>