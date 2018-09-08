<?php
require_once (dirname(__FILE__) . "/../include/common.inc.php");

header("Content-Type: application/json; charset=utf-8");
require_once(dirname(__FILE__)."/../include/wap.inc.php");



if(!isset($id)){
	$id=3;
}


$query = "SELECT arc.id,arc.title,arc.litpic,arc.description,ad.sid,ad.ourl,ad.official FROM `#@__archives` as arc left join `#@__addonarticle` as ad on ad.aid=arc.id  WHERE ad.sid=$typeid and arc.arcrank>-1 ";

$dsql->SetQuery($query);//将SQL查询语句格式化
$dsql->Execute();//执行SQL操作
//通过循环输出执行查询中的结果
$data=array();
while($row = $dsql->GetArray()){
	array_push($data,$row);
}
// print_r($dsql);
echo json_encode($data);


die();

?>
