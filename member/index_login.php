<?php


/**
 * @version        $Id: index_do.php 1 8:24 2010年7月9日Z tianya $
 * @package        DedeCMS.Member
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT,DELETE');
require_once(dirname(__FILE__)."/config.php");

if(empty($dopost)) $dopost = '';
if(empty($fmdo)) $fmdo = '';
if(empty($keeptime)) $keeptime=-1;
if($keeptime>-1){
    $cfg_ml = new MemberLogin($keeptime);
}


/*********************
function login()
*******************/


if($fmdo=='login')
{
    //用户登录
    if($dopost=="login")
    {
        if(!isset($vdcode))
        {
            $vdcode = '';
        }
        $svali = GetCkVdValue();
        
        
/*        if(preg_match("/2/",$safe_gdopen)){
            if(strtolower($vdcode)!=$svali || $svali=='')
            {
                ResetVdValue();
                $res=array();
                $res["status"]=0;
                $res["msg"]="验证码错误！";
                echo (json_encode($res));
              
                exit();
            }
            
        }*/

        if(CheckUserID($userid,'',false)!='ok')
        {
            ResetVdValue();
            $res=array();
            $res["status"]=0;
            $res["msg"]="你输入的用户名 {$userid} 不合法！";
            echo (json_encode($res));
           
            exit();
        }
        if($pwd=='')
        {
            ResetVdValue();
            $res=array();
            $res["status"]=0;
            $res["msg"]="密码不能为空！";
            echo (json_encode($res));
            
            exit();
        }

        //检查帐号
        $rs = $cfg_ml->CheckUser($userid,$pwd);  
        
       
        
        if($rs==0)
        {
            ResetVdValue();
          
            $res=array();
            $res["status"]=0;
            $res["msg"]="用户名不存在！";
            echo (json_encode($res));
            exit();
        }
        else if($rs==-1) {
            ResetVdValue();
              $res=array();
            $res["status"]=0;
            $res["msg"]="密码错误！";
            echo (json_encode($res));
          
            exit();
        }
        else if($rs==-2) {
            ResetVdValue();
              
         
            exit();
        }
        else
        {
            // 清除会员缓存
            $cfg_ml->DelCache($cfg_ml->M_ID);
            $myuid=$cfg_ml->M_ID;
            if(preg_match("/^\d*$/",$oldid)){
                $upquery = "Update  `dede_test_unlock` set user= $myuid where user=$oldid";
                $rs2 = $dsql->ExecuteNoneQuery($upquery);
             }
            
            if(empty($gourl) || preg_match("#action|_do#i", $gourl))
            {
                //ShowMsg("成功登录，5秒钟后转向系统主页...","index.php",0,2000);
                $res=array();
                $res["status"]=1;
                $res["msg"]="登陆成功";
                echo (json_encode($res));
            }
            else
            {
                $gourl = str_replace('^','&',$gourl);
                //ShowMsg("成功登录，现在转向指定页面...",$gourl,0,2000);
                $res=array();
                $res["status"]=1;
                $res["msg"]="登陆成功";
                echo (json_encode($res));
            }
            exit();
        }
    }
}

    //退出登录
    else if($dopost=="exit")
    {
        $cfg_ml->ExitCookie();
        #api{{
        if(defined('UC_API') && @include_once DEDEROOT.'/uc_client/client.php')
        {
            $ucsynlogin = uc_user_synlogout();
        }
        #/aip}}
        // ShowMsg("成功退出登录！","index.php",0,2000);
                $res=array();
                $res["status"]=1;
                $res["msg"]="退出成功";
                echo (json_encode($res));
        exit();
    }



?>