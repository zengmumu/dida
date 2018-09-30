<?php
require_once (dirname(__FILE__) . "/include/common.inc.php");

header("Content-Type: application/json; charset=utf-8");

require_once(dirname(__FILE__)."/include/wap.inc.php");
if(empty($type)){

$query = "
	 SELECT tp.id,tp.reid,tp.topid,tp.typename FROM `qkt_arctype` as tp WHERE tp.topid=138  and tp.reid!=138
	  	";
}
if(isset($type)){

$query = "
	 SELECT tp.id,tp.reid,tp.topid,tp.typename FROM `qkt_arctype` as tp WHERE tp.topid=138  and tp.reid=$type
	  	";
}
//顶级导航列表
$dsql->SetQuery($query);
$dsql->Execute();
$items = array();
while($row=$dsql->GetObject())
	
{
	 array_push($items, $row);
 
}
echo json_encode($items);
die();

?>
