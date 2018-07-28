<?php
header("Access-Control-Allow-Origin: *");
header('content-type:application/json;charset=utf8');//输出为 json格式
 if(isset($_GET["page"])){//看get方法传过来的参数有没有page
$page=$_GET["page"];
}else{
$page=0;//page 默认
}
if(!isset($_GET["id"])){
	$id="hot";
}else{
	$id=$_GET["id"];
}
$start=$page*10;//开始抓取的joke条目
$end=$page*10+10;//结束抓取的条目



  $conn=file_get_contents("http://www.yidianzixun.com/home/q/news_list_for_channel?channel_id=$id&cstart=$start&cend=$end&infinite=true&refresh=1&__from__=wap&appid=yidian&_=1517464988241");
  echo $conn
 //file_get_contents 是php可以完全一个网页里面的内容。
?>