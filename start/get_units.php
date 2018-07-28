<?php
require_once (dirname(__FILE__) ."/../include/common.inc.php");

header("Content-Type: application/json; charset=utf-8");

require_once(dirname(__FILE__)."/../include/wap.inc.php");


if(!isset($tid)){
	$tid=3;
}



$sql = "
	 SELECT id,typeid,title FROM `#@__archives` as arc WHERE arc.typeid=$tid
	  	and arcrank>=0";


$dsql->SetQuery($sql);//将SQL查询语句格式化
$dsql->Execute();//执行SQL操作
//通过循环输出执行查询中的结果
$data=array();
while($row = $dsql->GetArray()){
	array_push($data,$row);
}
// print_r($dsql);
echo json_encode($data);
//print_r($arraylist);
//echo json_encode($items);
die();

?>
