<?php
function litimgurls($imgid=0)
{
    global $lit_imglist,$dsql;
    //获取附加表
    $row = $dsql->GetOne("SELECT c.addtable FROM #@__archives AS a LEFT JOIN #@__channeltype AS c 
                                                            ON a.channel=c.id where a.id='$imgid'");
    $addtable = trim($row['addtable']);
    
    //获取图片附加表imgurls字段内容进行处理
    $row = $dsql->GetOne("Select imgurls From `$addtable` where aid='$imgid'");
    
    //调用inc_channel_unit.php中ChannelUnit类
    $ChannelUnit = new ChannelUnit(2,$imgid);
    
    //调用ChannelUnit类中GetlitImgLinks方法处理缩略图
    $lit_imglist = $ChannelUnit->GetlitImgLinks($row['imgurls']);
    
    //返回结果
    return $lit_imglist;
}
function bigimg() {
    return "";
}
function checkBtnDown() {
    return "";
}
function checkBtnDemo() {
     return "";
}
function adds($str){
	return addslashes(htmlspecialchars($str));
}
function GetParentTypename($id){
  global $dsql ;
  
   $reid = $dsql->GetOne("SELECT reid FROM dede_arctype where id=$id");
   $reid = $reid['reid'];
   if(empty($reid)){ //当前栏目不存在父级id,查询当前栏目名称
    $row1 = $dsql->GetOne("SELECT typename FROM dede_arctype where id=$id");
    return $row1['typename'];
   }else{//当前栏目存在父级id,查询父级栏目名称
    $row1 = $dsql->GetOne("SELECT typename FROM dede_arctype where id=$reid");
    return "<a href='/plus/list.php?tid=".$reid."'>".$row1['typename']."</a>";
   }
 }