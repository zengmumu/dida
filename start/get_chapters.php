<?php

require_once (dirname(__FILE__)."/../include/common.inc.php");

header("Content-Type: application/json; charset=utf-8");

require_once(dirname(__FILE__)."/../include/wap.inc.php");


if(!isset($reid)){
	$reid=2;
}



$sql = "
	 SELECT id,reid,typename FROM `#@__arctype` as arct WHERE arct.reid=$reid
	  	";


$dsql->SetQuery($sql);//��SQL��ѯ����ʽ��
$dsql->Execute();//ִ��SQL����
//ͨ��ѭ�����ִ�в�ѯ�еĽ��
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
