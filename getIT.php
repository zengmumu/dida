<?php
require_once (dirname(__FILE__) . "/include/common.inc.php");

header("Content-Type: application/json; charset=utf-8");

require_once(dirname(__FILE__)."/include/wap.inc.php");


if(!isset($id)){
	$id=3;
}



$query = "
	 SELECT tp.body FROM `#@__addonarticle` as tp WHERE tp.aid=$id
	  	";
//顶级导航列表

$row=$dsql->GetOne($query);
$arraylist=explode(',',$row['body']); 
$data=array();
foreach($arraylist as $v){
	$q="
	 SELECT * FROM `#@__archives` as tp WHERE tp.id=$v
	";
	$r=$dsql->GetOne($q);
	$r["channel"]==1?$addId='dede_addonarticle':$addId='dede_addonarticle'.$r["channel"];
	$q2="
	 SELECT * FROM $addId as tp WHERE tp.aid=$v
	";
	$r2=$dsql->GetOne($q2);
//	print_r($r2);
	array_push($data,array_merge($r, $r2));
	
	
}
echo json_encode($data);
//print_r($arraylist);
//echo json_encode($items);
die();

?>
