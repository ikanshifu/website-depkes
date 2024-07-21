<?php
 include 'connect.php';

 $first_name = $_POST['first_name'];
 $last_name = $_POST['last_name'];
 $email = $_POST['email'];
 $phone = $_POST['phone'];
 $username = $_POST['username'];
 $password = $_POST['password'];
 $cpassword = $_POST['cpassword'];

 $stmt = $conn->prepare("insert into patient_register(first_name, last_name, email, phone, username, password, cpassword) values(?, ?, ?, ?, ?, ?, ?)");
 $stmt->bind_param("sssssss", $first_name, $last_name, $email, $phone, $username, $password, $cpassword);
 $stmt->execute();
 echo "Your account has been successfully created";
 $stmt->close();
 $conn->close();
?>