<?php
require_once (dirname(__FILE__) ."/../include/common.inc.php");

header("Content-Type: application/json; charset=utf-8");



if(!isset($tid)){
	$tid=3;
}



//$sql = "
//	 SELECT count(tun.id) as num FROM `#@__test_unlock` as tun left join `#@__archives` as arc on arc.id=tun.unlock  WHERE arc.typeid=$tid
//	  	and arcrank>=0 and tun.user=$user";
$sql2="
SELECT ROUND(T1.co/T2.totalCo*100,1) as pre,T1.co,T2.totalCo
    FROM 
     (SELECT count(tun.id) as co FROM `#@__test_unlock` as tun left join `#@__archives` as arc on arc.id=tun.unlock left join `#@__arctype` as ty on  ty.id=arc.typeid WHERE ty.reid=$tid
	  	and arc.arcrank>=0 and tun.user=$user) T1,
      (SELECT count(arc.id) as totalCo FROM `#@__archives` as arc left join `#@__arctype` as ty on ty.id=arc.typeid WHERE ty.reid=$tid and arc.arcrank>=0) T2;
";

//$dsql->SetQuery($sql2);//将SQL查询语句格式化
//$dsql->Execute();//执行SQL操作
//通过循环输出执行查询中的结果
$row = $dsql->GetOne($sql2);
//print_r($row);
//echo ($row);
//while($row = $dsql->GetArray()){
//	array_push($data,$row);
//}

echo json_encode($row);

die();

?>
