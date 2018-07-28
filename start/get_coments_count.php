<?php
require_once (dirname(__FILE__)."/../include/common.inc.php");

header("Content-Type: application/json; charset=utf-8");

require_once(dirname(__FILE__)."/../include/wap.inc.php");


 
    $row = $db->GetOne("select count(*) as fc from `#@__feedback` where aid=$aid");   
    if(!is_array($row)){   
    echo "0";   
        }else {   
            echo $row['fc'];   
    }   

?>
