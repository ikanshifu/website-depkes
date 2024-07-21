<?php
 include 'connect.php';

 $username = $_POST['username'];
 $password = $_POST['password'];

 $stmt = $conn->prepare("insert into patient_login(username, password)
 values(?, ?)");
 $stmt->bind_param("ss", $username, $password);
 $stmt->execute();
 echo "Successfully login";
 $stmt->close();
 $conn->close();
?>