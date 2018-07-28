<?php
require_once (dirname(__FILE__) ."/../include/common.inc.php");

header("Content-Type: application/json; charset=utf-8");

require_once(dirname(__FILE__)."/../include/wap.inc.php");
   


$res=array(); 
$sql="SELECT * FROM `#@__test_unlock` as tp WHERE tp.user=$user and  tp.type=$type";   
$dsql->SetQuery($sql);//将SQL查询语句格式化
$dsql->Execute();//执行SQL操作
//通过循环输出执行查询中的结果
while($row = $dsql->GetArray()){
array_push($res,$row);
}
echo json_encode($res);
//或者采取这种方式输出内容
 
 


  exit();
    

 
  
  




?>
