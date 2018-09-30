<?php
header("Content-Type: text/html; charset=utf-8");
$url=$_GET["url"];
$page=$_GET["page"];
$u="$url&page=$page";


$json=file_get_contents($u);
// echo $url;
	
	$pattern='/<li class="v_title">(.*?)<\/li>/si'; 
	preg_match_all($pattern,$json,$pg); 
	$p=preg_replace('/ href="/', '<li onclick="openPage(\'', $pg[1]); 
	$p=preg_replace('/" target="_blank">/', '\')">', $p); 
	$p=preg_replace('/曾庆林-/', '', $p); 
	$p=preg_replace('/<a/', '<li', $p); 
	$p=preg_replace('/<\/a>/', '</li>', $p); 
		$p=preg_replace('/<li onclick="/', ' onclick="', $p); 
	

foreach($p as $key=>$value)
echo $value;

?>