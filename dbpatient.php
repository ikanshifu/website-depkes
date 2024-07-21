<?php
 include 'connect.php';

 $weight = $_POST['weight'];
 $height = $_POST['height'];
 $bloodPressure = $_POST['bloodPressure'];
 $bloodSugar = $_POST['bloodSugar'];
 $cholesterol = $_POST['cholesterol'];
 $gout = $_POST['gout'];

 $stmt = $conn->prepare("insert into patient_data(weight, height, bloodPressure, bloodSugar, cholesterol, gout)
 values(?, ?, ?, ?, ?, ?)");
 $stmt->bind_param("iiiiii", $weight, $height, $bloodPressure, $bloodSugar, $cholesterol, $gout);
 $stmt->execute();
 echo "Successfully submit patient data";
 $stmt->close();
 $conn->close();
?>