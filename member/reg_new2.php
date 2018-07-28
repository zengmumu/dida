<?php
/**
 * @version        $Id: reg_new.php 1 8:38 2010年7月9日Z tianya $
 * @package        DedeCMS.Member
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
require_once(dirname(__FILE__)."/config.php");
require_once DEDEINC.'/membermodel.cls.php';
$re=array();


 $dopost="regbase";
 $mtype="个人";
 if(!isset($uname)){
    $uname=$userid;
 }

if($cfg_mb_allowreg=='N')
{
    $re["status"]=0;
   $re["msg"]='系统关闭了新用户注册！';
   echo json_encode($re);
    exit();
}

if(!isset($dopost)) $dopost = '';
$step = empty($step)? 1 : intval(preg_replace("/[^\d]/", '', $step));

if($step == 1)
{
    if($cfg_ml->IsLogin())
    {
        if($cfg_mb_reginfo == 'Y')
        {
            //如果启用注册详细信息
            if($cfg_ml->fields['spacesta'] == 0 || $cfg_ml->fields['spacesta'] == 1)
            {
                 ShowMsg("尚未完成详细资料，请完善...", "index_do.php?fmdo=user&dopost=regnew&step=2", 0, 1000);
                 exit;
            }
        }
        $re["status"]=0;
        $re["msg"]='你已经登陆系统，无需重新注册！';
        echo json_encode($re);
      
        exit();
    }
    if($dopost=='regbase')
    {
        $svali = GetCkVdValue();
/*        if(preg_match("/1/", $safe_gdopen)){
            if(strtolower($vdcode)!=$svali || $svali=='')
            {
                ResetVdValue();
                $re["status"]=0;
                $re["msg"]='验证码错误！';
                echo json_encode($re);
               
                exit();
            }
        }*/
        
        $faqkey = isset($faqkey) && is_numeric($faqkey) ? $faqkey : 0;
        if($safe_faq_reg == '1')
        {
            if($safefaqs[$faqkey]['answer'] != $rsafeanswer || $rsafeanswer=='')
            {
                ShowMsg('验证问题答案错误', '-1');
                exit();
            }
        }
        
        $userid = trim($userid);
        $pwd = trim($userpwd);
        $pwdc = trim($userpwdok);
        $rs = CheckUserID($userid, '用户名');
        if($rs != 'ok')
        {
            // ShowMsg($rs, '-1');
            $re["status"]=0;
        $re["msg"]=$rs;
        echo json_encode($re);
            exit();
        }
        if(strlen($userid) > 20 || strlen($uname) > 36)
        {
            $re["status"]=0;
                $re["msg"]='你的用户名过长，不允许注册！';
                echo json_encode($re);
           
            exit();
        }
        if(strlen($userid) < $cfg_mb_idmin || strlen($pwd) < $cfg_mb_pwdmin)
        { 
            $re["status"]=0;
                $re["msg"]='你的用户名或密码过短，不允许注册！';
                echo json_encode($re);
           
            exit();
        }
        // if($pwdc != $pwd)
        // {
        //     ShowMsg('你两次输入的密码不一致！', '-1');
        //     exit();
        // }
       

        $uname = HtmlReplace($uname, 1);
        //用户笔名重复检测
        if($cfg_mb_wnameone=='N')
        {
            $row = $dsql->GetOne("SELECT * FROM `#@__member` WHERE uname LIKE '$uname' ");
            if(is_array($row))
            {
                $re["status"]=0;
                $re["msg"]='用户名不能重复！';
                echo json_encode($re);
               
                exit();
            }
        }
        if(!CheckEmail($email))
        {
            $re["status"]=0;
                $re["msg"]='Email格式不正确！';
                echo json_encode($re);
           
            exit();
        }
        
       
        
        if($cfg_md_mailtest=='Y')
        {
            $row = $dsql->GetOne("SELECT mid FROM `#@__member` WHERE email LIKE '$email' ");
            if(is_array($row))
            {
                 $re["status"]=0;
                $re["msg"]='你使用的Email已经被另一帐号注册，请使其它帐号！';
                echo json_encode($re);
               
                exit();
            }
        }
    
        //检测用户名是否存在
        $row = $dsql->GetOne("SELECT mid FROM `#@__member` WHERE userid LIKE '$userid' ");
        if(is_array($row))
        {
             $re["status"]=0;
             $re["msg"]="你指定的用户名 {$userid} 已存在，请使用别的用户名！";
             echo json_encode($re);
        
            exit();
        }
        if($safequestion==0)
        {
            $safeanswer = '';
        }
        else
        {
            if(strlen($safeanswer)>30)
            {
                 $re["status"]=0;
                $re["msg"]="你的新安全问题的答案太长了，请控制在30字节以内！";
                echo json_encode($re);

                exit();
            }
        }
   
        //会员的默认金币
        $dfscores = 0;
        $dfmoney = 0;
        $dfrank = $dsql->GetOne("SELECT money,scores FROM `#@__arcrank` WHERE rank='10' ");
        if(is_array($dfrank))
        {
            $dfmoney = $dfrank['money'];
            $dfscores = $dfrank['scores'];
        }
        $jointime = time();
        $logintime = time();
        $joinip = GetIP();
        $loginip = GetIP();
        $pwd = md5($userpwd);
		$mtype = RemoveXSS(HtmlReplace($mtype,1));
		$safeanswer = HtmlReplace($safeanswer);
		$safequestion = HtmlReplace($safequestion);
        
        $spaceSta = ($cfg_mb_spacesta < 0 ? $cfg_mb_spacesta : 0);
        
        $inQuery = "INSERT INTO `#@__member` (`mtype` ,`userid` ,`pwd` ,`uname` ,`money` ,`email` ,`scores` ,`jointime` ,`joinip` ,`logintime` ,`loginip` )
       VALUES ('$mtype','$userid','$pwd','$uname','$dfmoney','$email','$dfscores',
       '$jointime','$joinip','$logintime','$loginip'); ";
        if($dsql->ExecuteNoneQuery($inQuery))
        {
            $mid = $dsql->GetLastID();
    
            //写入默认会员详细资料
            if($mtype=='个人'){
                $space='person';
            }else if($mtype=='企业'){
                $space='company';
            }else{
                $space='person';
            }
    
            //写入默认统计数据
            $membertjquery = "INSERT INTO `#@__member_tj` (`mid`,`article`,`album`,`archives`,`homecount`,`pagecount`,`feedback`,`friend`,`stow`)
                   VALUES ('$mid','0','0','0','0','0','0','0','0'); ";
            $dsql->ExecuteNoneQuery($membertjquery);
    
            //写入默认空间配置数据
            $spacequery = "INSERT INTO `#@__member_space`(`mid` ,`pagesize` ,`matt` ,`spacename` ,`spacelogo` ,`spacestyle`, `sign` ,`spacenews`)
                    VALUES('{$mid}','10','0','{$uname}的空间','','$space','',''); ";
            $dsql->ExecuteNoneQuery($spacequery);
    
            //写入其它默认数据
            $dsql->ExecuteNoneQuery("INSERT INTO `#@__member_flink`(mid,title,url) VALUES('$mid','织梦内容管理系统','http://www.dedecms.com'); ");
            
            $membermodel = new membermodel($mtype);
            $modid=$membermodel->modid;
            $modid = empty($modid)? 0 : intval(preg_replace("/[^\d]/",'', $modid));
            $modelform = $dsql->getOne("SELECT * FROM #@__member_model WHERE id='$modid' ");
            
            if(!is_array($modelform))
            {
                $re["status"]=0;
              $re["msg"]="模型表单不存在";
              echo json_encode($re);
              
                exit();
            }else{
                $dsql->ExecuteNoneQuery("INSERT INTO `{$membermodel->table}` (`mid`) VALUES ('{$mid}');");
            }
            $rs = $cfg_ml->CheckUser($userid,$userpwd);  
             $cfg_ml->DelCache($cfg_ml->M_ID);
            
            $myuid=$cfg_ml->M_ID;
            if(preg_match("/^\d*$/",$oldid)){
                $upquery = "Update  `dede_test_unlock` set user= $myuid where user=$oldid";
                $rs2 = $dsql->ExecuteNoneQuery($upquery);
             }
            
            
            
             $re["status"]=1;
              $re["msg"]="注册成功";
              echo json_encode($re);
              exit();
          }
      }
      }
            ?>