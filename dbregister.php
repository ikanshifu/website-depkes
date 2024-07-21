<?php
 $first_name = $_POST['first_name'];
 $last_name = $_POST['last_name'];
 $email = $_POST['email'];
 $phone = $_POST['phone'];
 $username = $_POST['username'];
 $password = $_POST['password'];
 
 $conn = new mysqli('localhost','root','','health_form');
 if($conn->connect_error){
    die('Connection Failed : '.$conn->connect_error);
 }else{
    $stmt = $conn->prepare("insert into patient_data(first_name, last_name, email, phone, username, password)
    values(?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $first_name, $last_name, $email, $phone, $username, $password);
    $stmt->execute();
    echo "Your account has been successfully created";
    $stmt->close();
    $conn->close();
 }
?>