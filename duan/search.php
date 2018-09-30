<?php
header("Access-Control-Allow-Origin: *");
header('content-type:application/json;charset=utf8');//输出为 json格式
 if(isset($_GET["page"])){//看get方法传过来的参数有没有page
$word=$_GET["word"];	
}else{
$word="中国";//page 默认
}

$word=urlencode($word);

$start=$page*10;//开始抓取的joke条目
$end=$page*10+10;//结束抓取的条目


 $conn=file_get_contents("http://www.yidianzixun.com/home/q/search_channel?word=$word");
 echo $conn;
 //file_get_contents 是php可以完全一个网页里面的内容。
?>