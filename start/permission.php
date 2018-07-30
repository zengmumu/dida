<?php
require_once (dirname(__FILE__) . "/../include/common.inc.php");

header("Content-Type: application/json; charset=utf-8");

//require_once(dirname(__FILE__)."/../include/wap.inc.php");
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


   

    $arr=array();

    $id = $_GET["id"];
    
    if($ptype==3){
       $sq="Select id From `#@__arctype` as tu where tu.id<$id and tu.reid=$typeid  order by id desc";
         $preid=$dsql->GetOne($sq);
         // echo $sq;
        // exit();

       
        if(is_array($preid)){
              $preid=$preid["id"];  
            $sql="Select id From `#@__test_unlock`as tu where tu.unlock=$preid and tu.type=$ptype and tu.user=$user";
            $unlockid=$dsql->GetOne($sql);
          // echo $sql;
          // print_r($unlockid);
            if(is_array( $unlockid)){
                $arr["status"]=1;
                $arr["msg"]="成功";
            }else{
                 $arr["stats"]=0;
                 $arr["msg"]='请完成前面的章节，解锁当前内容';
               
            }
        }else{

             $arr["status"]=1;
             $arr["msg"]="成功";
        }
   }


   if($ptype==2){
   	// 查找 比当前id还小并且是一个typeid
    $aid=$dsql->GetOne("Select id From `#@__arctiny` as arc  where arc.id<$id And arc.typeid=$typeid and arcrank>-1 order by id desc");
   
    if(is_array($aid)){

       $aid=$aid["id"];

       // 查找在test_unlock里面有没有有
        $unlockid=$dsql->GetOne("Select id From `#@__test_unlock` as tu  where tu.unlock=$aid and tu.type=$ptype and tu.user=$user");
        if(is_array($unlockid)){
            $arr["status"]=1;
            $arr["msg"]="成功";

        }else{
             $arr["stats"]=0;
             $arr["msg"]='请完成前面的单元，解锁当前内容';
           
        }
    }else{
         $arr["status"]=1;
         $arr["msg"]="成功";
       
    }
    
   }


   if($ptype==1){
   $sql="Select id From `#@__test_unlock` as tu where tu.unlock=$id and tu.type=$ptype and tu.user=$user";
     $unlockid=$dsql->GetOne($sql);
     // echo $sql;
     // echo  " ";
     // print_r ($unlockid); 
    if(is_array($unlockid)){
            $arr["status"]=1;
            $arr["msg"]="成功";
        }else{
             $arr["stats"]=0;
             $arr["msg"]='请完成前面的课程，解锁当前内容';
           
        }
    
   }

   echo json_encode($arr);
  
           // $typeid= $dsql->GetOne("Select typeid From `dede_arctiny` where id=$aid And arcrank>-1 ");
           //  $typeid=$typeid["typeid"];
           //  $preR =  $dsql->GetOne("Select id From `dede_arctiny` where id<$aid And arcrank>-1 And typeid=$typeid order by id desc");
           //  // echo ( $typeid);
            
           //  $nextR = $dsql->GetOne("Select id From `dede_arctiny` where id>$aid And arcrank>-1 And typeid=$typeid order by id asc");
            // print_r($nextR);
            // $next = (is_array($nextR) ? " where arc.id={$nextR['id']} " : ' where 1>2 ');
            // $pre = (is_array($preR) ? " where arc.id={$preR['id']} " : ' where 1>2 ');
            // $query = "Select arc.id,arc.title,arc.shorttitle,arc.typeid,arc.ismake,arc.senddate,arc.arcrank,arc.money,arc.filename,arc.litpic,
            //             t.typedir,t.typename,t.namerule,t.namerule2,t.ispart,t.moresite,t.siteurl,t.sitepath
            //             from `dede_archives` arc left join dede_arctype t on arc.typeid=t.id  ";
            // $nextRow = $dsql->GetOne($query.$next);
            // $preRow = $dsql->GetOne($query.$pre);
            // echo($next);
            // echo($pre);
            
  




?>
