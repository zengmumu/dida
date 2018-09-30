<?php
header("Access-Control-Allow-Origin: *");
header('content-type:application/json;charset=utf8');//输出为 json格式
//set_time_limit(1000);
 if(isset($_GET["id"])){//看get方法传过来的参数有没有page
$id=$_GET["id"];
}else{
$id='0I8a55r4';//page 默认
}

 $conn=file_get_contents("http://www.yidianzixun.com/article/$id");
//echo $conn;
//echo("<br/>-----------------------------------$id<br/>");
 //file_get_contents 是php可以完全一个网页里面的内容。
$regex4="/<div class=\"content-bd\".*?>.*?<\/div>/ism";
$regex5="/var url = \"(.*?)\";/ism";
if(preg_match_all($regex5, $conn, $matches2)){
    //echo $matches2[1][0];
    $conn2=file_get_contents($matches2[1][0]);
     echo($conn2);

  }else if(preg_match_all($regex4, $conn, $matches)){
echo(json_encode($matches));
echo $matches[0][0];
}else{
  /*if(preg_match_all($regex5, $conn, $matches2)){
    //echo $matches2[1][0];
    $conn2=file_get_contents($matches2[1][0]);
     echo($conn2);

  }*/
  echo "0";
}
?>


