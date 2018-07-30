<?php
require_once (dirname(__FILE__). "/../include/common.inc.php");

header("Content-Type: application/json; charset=utf-8");

require_once(dirname(__FILE__)."/../include/wap.inc.php");
 /* 文档类
 *
 * @version        $Id: arc.archives.class.php 4 15:13 2010年7月7日Z tianya $
 * @package        DedeCMS.Libraries
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
// require_once(DEDEINC."/typelink.class.php");
// require_once(DEDEINC."/channelunit.class.php");
// require_once(DEDEINC."/downmix.inc.php");
// require_once(DEDEINC.'/ftp.class.php');

 


// $query = "
//      INSERT INTO dede_test_unlock (unlock,user,type)
//      VALUES('$unlock','$user','$type');
//     ";
//     $dsql->ExecuteNoneQuery($query);
//     
//    

$time = GetMkTime(mktime());
$res=array(); 
$row=$dsql->GetOne("
	 SELECT id FROM `#@__test_unlock` as tp WHERE tp.unlock=$unlock and  tp.user=$user and tp.type=$type;
	  	");   
if(is_array( $row)){
	 $res["status"]=1;
	 $res["msg"]="解锁成功";
	 echo (json_encode($res));
	 exit();

}else{
// echo $user;
	
	$sql = "INSERT INTO `#@__test_unlock` ( `unlock`, `user`, `type`,`addtime`) VALUES ($unlock,$user,$type,$time);";//插入记录数据库
	// $dsql->SetQuery($sql);//格式化查询语句
	// $dsql->ExecNoneQuery();//执行SQL操作
	$dsql->ExecuteNoneQuery($sql);
		if(!preg_match("/^\d{6}$/",$user)){
			 $dsql->ExecuteNoneQuery("UPDATE `#@__member` set scores=scores+1 WHERE mid=$user ");
		}
	if(isset($add)){
		$dsql->ExecuteNoneQuery("UPDATE `#@__member` set scores=scores+$add WHERE mid=$user");
		$res["add"]=$add;
	}
	if(isset($reduce)){
		$dsql->ExecuteNoneQuery("UPDATE `#@__member` set scores=scores-$reduce WHERE mid=$user");
		$res["reduce"]=$reduce;
	}
	
	$gid = $dsql->GetLastID(); //获取插入后的最后的ID,然后再传给下一个页面


	if(isset($typeid)){
  	$row=$dsql->GetOne("
	 SELECT id FROM `#@__test_unlock` as tp WHERE tp.unlock=$typeid and  tp.user=$user and tp.type=3;
	  	");   
  	if(!is_array( $row)){

           $sq="Select id From `#@__arctiny` as tu where tu.id>$unlock and tu.typeid=$typeid and arcrank>=0";   
           $last=$dsql->GetOne($sq); 
           
         
            if(!is_array($last)){

            
            	$sql3 = "INSERT INTO `#@__test_unlock` ( `unlock`, `user`, `type`,`addtime`) VALUES ($typeid,$user,3,$time);";
            	$dsql->ExecuteNoneQuery($sql3);
            	$res["chapter"]=$typeid;
            } 

	} 
      }


	
	  $res["status"]=1;
	  $res["msg"]="解锁成功";
	   $res["gid"]=$gid;
	 
	  echo (json_encode($res));
}
  exit();
    

 
  
  




?>
