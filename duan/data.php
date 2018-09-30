<?php
header("Access-Control-Allow-Origin: *");
header('content-type:application/json;charset=utf8');//输出为 json格式
 if(isset($_GET["page"])){//看get方法传过来的参数有没有page
$page=$_GET["page"];	
}else{
$page=0;//page 默认
}
$start=$page*10;//开始抓取的joke条目
$end=$page*10+10;//结束抓取的条目
 $conn=file_get_contents("http://mb.yidianzixun.com/api/q/?path=channel|news-list-for-channel&channel_id=u12131&fields=docid&fields=category&fields=date&fields=image&fields=image_urls&fields=like&fields=source&fields=title&fields=url&fields=comment_count&fields=summary&fields=up&cstart=$start&cend=$end&version=999999&infinite=true");
 echo $conn;
 //file_get_contents 是php可以完全一个网页里面的内容。
?>