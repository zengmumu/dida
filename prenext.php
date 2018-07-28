<?php
require_once (dirname(__FILE__) . "/include/common.inc.php");

header("Content-Type: application/json; charset=utf-8");

require_once(dirname(__FILE__)."/include/wap.inc.php");
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


   

    

    /**
     *  获取上一篇，下一篇链接
     *
     * @access    public
     * @param     string  $gtype  获取类型
     *                    pre:上一篇  preimg:上一篇图片  next:下一篇  nextimg:下一篇图片
     * @return    string
     */
  
           $typeid= $dsql->GetOne("Select typeid From `#@__arctiny` where id=$aid And arcrank>-1 ");
            $typeid=$typeid["typeid"];
            $preR =  $dsql->GetOne("Select id From `#@__arctiny` where id<$aid And arcrank>-1 And typeid=$typeid order by id desc");
            // echo ( $typeid);
            
            $nextR = $dsql->GetOne("Select id From `#@__arctiny` where id>$aid And arcrank>-1 And typeid=$typeid order by id asc");
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
