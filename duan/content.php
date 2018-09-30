<?php
header("Access-Control-Allow-Origin: *");
header('content-type:application/json;charset=utf8');//输出为 json格式
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
if(preg_match_all($regex4, $conn, $matches)){  
// echo(json_encode($matches));  
echo $matches[0][0];
}else{  
   echo '0';  
}
?>


