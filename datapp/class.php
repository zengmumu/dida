
<?php 

header("Content-Type: application/json; charset=utf-8");
$conn=file_get_contents("class.js");
$da= json_decode($conn,true);

$data["kc"]=$da;
 echo(json_encode($data));
 ?>