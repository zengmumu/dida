<?php
header("Access-Control-Allow-Origin: *");
header('content-type:application/json;charset=utf8');//输出为 json格式



 $conn=file_get_contents("http://www.yidianzixun.com/home/q/hot_search_keywords?appid=yidian&_=1516083427037");
 echo $conn;
 //file_get_contents 是php可以完全一个网页里面的内容。
?>