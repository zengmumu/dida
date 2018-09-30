<?php
require_once (dirname(__FILE__) . "/include/common.inc.php");
// header("Content-Type: text/html; charset=utf-8");
header("Content-Type: application/json; charset=utf-8");
//header("Content-type:text/vnd.wap.wml");
require_once(dirname(__FILE__)."/include/wap.inc.php");
/*if(empty($action)) $action = 'index';
$cfg_templets_dir = $cfg_basedir.$cfg_templets_dir;
$channellist = '';
$newartlist = '';
$channellistnext = '';*/
if(empty($type)) $type= 138;
$query = "
	  Select arc.typeid,arc.click,arc.id,addon.question,addon.optiontype,addon.difficulty,addon.optiona,addon.optionb,addon.optionc,addon.optiond,addon.explans,addon.answer,addon.falsecount,addon.truecount From `#@__archives` arc 
	  left join `#@__arctype` tp on tp.id=arc.typeid
	  left join `#@__addonarticle21` addon on addon.aid=arc.id
	  WHERE addon.aid = arc.id
          AND tp.id =$type
	  OR tp.reid =$type
	  OR tp.topid =$type
	  	";

//顶级导航列表
$dsql->SetQuery($query);
$dsql->Execute();
$items = array();
while($row=$dsql->GetObject())
	
{
	 array_push($items, $row);
 
}
// if($type==140){
// $conn=file_get_contents("learn/script/json.js");
// $data = json_decode($conn, true);
// $re=array_merge($items,$data );  


// $data2["data"]=$re;
//  echo(json_encode($data2));

// }else{

$data["data"]=$items;
echo(json_encode($data));
// }


?>
