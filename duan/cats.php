<?php
header("Access-Control-Allow-Origin: *");
header('content-type:application/json;charset=utf8');//输出为 json格式


 $conn=file_get_contents("http://www.yidianzixun.com/home/q/get_pc_slides?appid=web_yidian&_=1517236215408");
 echo $conn;
 //file_get_contents 是php可以完全一个网页里面的内容。
?>