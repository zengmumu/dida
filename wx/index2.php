<?php
	//定义常量 
	header("Content-type: text/html; charset=utf-8");  
define(DB_HOST, 'mkxw3l5g.2293lan.dnstoo.com:3306');  
        define(DB_USER, 'qktcms_f');  
        define(DB_PASS, 'w6b4qgj8');  
        define(DB_DATABASENAME, 'qktcms');  
        define(DB_TABLENAME, 'qkt_archives');  
//数据库表的列名  

//mysql_connect  
$conn =@mysql_connect(DB_HOST, DB_USER, DB_PASS) or die("connect failed" . mysql_error());  
mysql_select_db(DB_DATABASENAME, $conn); 
mysql_query("SET NAMES UTF8"); 
// $sql ="SELECT a.id,a.title,b.aid FROM qkt_archives AS a, qkt_addonarticle21  AS b WHERE a.title LIKE '%js%' or b.explans LIKE '%js%'AND a.id=b.aid LIMIT 0 , 20"; 
 $sql ="SELECT * FROM qkt_archives AS a WHERE a.title LIKE '%js%' LIMIT 0 , 20"; 
$result = mysql_query($sql, $conn); 
$content = array();             

while ($row=mysql_fetch_array($result, MYSQL_ASSOC))//与$row=mysql_fetch_assoc($result)等价  
{  
	  $content[] = array("Title"=>"$row[title]", "Description"=>"", "PicUrl"=>"", "Url" =>"http://www.qingkt.com/plus/view.php?aid=$row[aid]");
	
    
}  
print_r($content[0]);
mysql_free_result($result);  
mysql_close($conn);  

?>