<?php
/**
 * @version        $Id: ajax_feedback.php 1 8:38 2010年7月9日Z tianya $
 * @package        DedeCMS.Member
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
require_once(dirname(__FILE__).'/config.php');
AjaxHead();
//if($myurl == '') echo('');
//
//else
//{
    $uid  = $cfg_ml->M_LoginID;
    $face = $cfg_ml->fields['face'] == '' ? $GLOBALS['cfg_memberurl'].'/images/nopic.gif' : $cfg_ml->fields['face'];
//    echo "验证码：<input name=\"validate\" type=\"text\" id=\"validate\" size=\"10\" class=\"form-control\" style=\"height:38px;width:60px;margin-right:6px;text-transform: uppercase;\" class=\"nb\" />";
//      echo "<img src='{$cfg_cmsurl}/include/vdimgck.php' style='cursor:pointer' id='validateimg' onclick=\"this.src=this.src+'?'\"  title='点击我更换图片' alt='点击我更换图片' />\r\n";
    echo "";
    if($cfg_feedback_ck=='Y')
    {
        echo "验证码：<input name=\"validate\" type=\"text\" id=\"validate\" size=\"10\" class=\"form-control\" style=\"height:24px;width:60px;margin-right:6px;text-transform: uppercase; display:inline\" class=\"nb\" />";
        echo "<img src='{$cfg_cmsurl}/include/vdimgck.php' style='cursor:pointer' id='validateimg' onclick=\"this.src=this.src+'?'\"  title='点击我更换图片' alt='点击我更换图片' />\r\n";
    }
//}

