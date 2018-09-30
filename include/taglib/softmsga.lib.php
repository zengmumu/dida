<?php
if(!defined('DEDEINC'))
{
    exit("Request Error!");
}
/**
 * 下载说明标签
 *
 * @version        $Id: softmsg.lib.php 1 9:29 2010年7月6日Z tianya $
 * @package        DedeCMS.Taglib
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
 
/*>>dede>>
<name>下载说明</name>
<type>软件内容模板</type>
<for>V55,V56,V57</for>
<description>下载说明标签</description>
<demo>
{dede:softmsg /}
</demo>
<attributes>
</attributes> 
>>dede>>*/
 
function lib_softmsga(&$ctag,&$refObj)
{
	//var_dump($refObj);
	//die("aaaa");
    global $dsql;
    //$attlist="type|textall,row|24,titlelen|24,linktype|1";
    //FillAttsDefault($ctag->CAttribute->Items,$attlist);
    //extract($ctag->CAttribute->Items, EXTR_SKIP);
   // $revalue = '';
   // $row = $dsql->GetOne(" SELECT * FROM `#@__softconfig` ");
   // if(is_array($row)) $revalue = $row['downmsg'];
   // return $revalue;
   	$aid=$refObj->ArcID;
$typeid=$dsql->GetOne("SELECT typeid FROM `#@__arctiny` where id=$aid ");
$typeid=$typeid['typeid'];	//var_dump($typeid);
$reid=$dsql->GetOne("SELECT reid FROM `#@__arctype` where id=$typeid ");
$reid=$reid['reid'];


$crossid=$dsql->GetOne("SELECT crossid FROM `#@__arctype` where id=$reid ");
$crossid=$crossid['crossid'];
$fsoftlink=$dsql->GetOne("SELECT softlinks  FROM `#@__addonsoft17` where aid=$crossid ");
$fsoftlink=$fsoftlink['softlinks'];
 $row['sites'] = preg_replace("#[\r\n]{1,}#", "\n", $fsoftlink);
   $sites = explode("\n", trim($row['sites']));

$dtp = new DedeTagParse();
    $dtp->LoadSource($fsoftlink);
	
    $downlinks = '';
  foreach($dtp->CTags as $ctag)
        {
           $link = trim($ctag->GetInnerText());		
			
			
            $serverName = trim($ctag->GetAtt('text'));
			$v[ $serverName]=$link;
			$downlinks.="<li><a href='$link'> $serverName</a></li>";
        }


   
// var_dump( $downlinks);
// die("--------");
//return  $fsoftlink;
//die("------")
return $downlinks;
	
}