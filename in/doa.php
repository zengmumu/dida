<?php
/**
 * @
 * @Description:
 * @Copyright (C) 2011 helloweba.com,All Rights Reserved.
 * -----------------------------------------------------------------------------
 * @author: Liurenfei (lrfbeyond@163.com)
 * @Create: 2012-5-1
 * @Modify:
*/
require_once(dirname(__FILE__)."/../include/common.inc.php");

$action = $_GET['action'];
if ($action == 'import') { //导入XLS
    include_once("excel/reader.php");
	$tmp = $_FILES['file']['tmp_name'];
	if (empty ($tmp)) {
		echo '请选择要导入的Excel文件！';
		exit;
	}
	
	$save_path = "xls/";
	$file_name = $save_path.date('Ymdhis') . ".xls";
	if (copy($tmp, $file_name)) {
		$xls = new Spreadsheet_Excel_Reader();
		$xls->setOutputEncoding('utf-8');
		$xls->read($file_name);
		
	for ($i=2; $i<=$xls->sheets[0]['numRows']; $i++) {
			$id = $xls->sheets[0]['cells'][$i][1];
			$typeid = $xls->sheets[0]['cells'][$i][2];			
			$title = $xls->sheets[0]['cells'][$i][3];
			$body =addslashes($xls->sheets[0]['cells'][$i][4]);
			$data_values .= "('$id','$typeid','$title',1),";
			$data_values2 .= "('$id','$typeid','$body'),";
			$data_values3 .= "('$id','$typeid',1),";
//			echo $id."<br/>";

		}
//		print_r($xls->sheets[0]);
		$data_values = substr($data_values,0,-1); //去掉最后一个逗号
		$data_values2  = substr($data_values2,0,-1);
		$data_values3  = substr($data_values3,0,-1);
//		echo $data_values;
	 
//		$query = mysql_query("insert into student (name,sex,age) values $data_values");//批量插入数据表中
//		echo 	"insert into student (name,sex,age) values $data_values";
		 $arcquery = "insert into  dede_archives (`id`,`typeid`,`title`,`channel`) values $data_values";
//		 echo $arcquery;
			          $dsql->ExecuteNoneQuery($arcquery);
//			    
//			        //保存到附近加表
				    $query = "insert into  dede_addonarticle (`aid`,`typeid`,`body`) values  $data_values2";
//				    echo $query;
			        $dsql->ExecuteNoneQuery($query);
//                  $fieldvalue = '';
echo $query;
//			        //保存到微表
			        $tinyquery = "insert into  dede_arctiny (id,typeid,channel) values $data_values3";
//			        echo   $tinyquery;
			        
			        $dsql->ExecuteNoneQuery($tinyquery);
	    if($query){
		    echo '导入成功！';
	    }else{
		    echo '导入失败！';
	    }
	}
} elseif ($action=='export') { //导出XLS
    $result = mysql_query("select * from student");
    $str = "姓名\t性别\t年龄\t\n";
    $str = iconv('utf-8','gb2312',$str);
    while($row=mysql_fetch_array($result)){
        $name = iconv('utf-8','gb2312',$row['name']);
        $sex = iconv('utf-8','gb2312',$row['sex']);
    	$str .= $name."\t".$sex."\t".$row['age']."\t\n";
    }
    $filename = date('Ymd').'.xls';
    exportExcel($filename,$str);
}


function exportExcel($filename,$content){
 	header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
	header("Content-Type: application/vnd.ms-execl");
	header("Content-Type: application/force-download");
	header("Content-Type: application/download");
    header("Content-Disposition: attachment; filename=".$filename);
    header("Content-Transfer-Encoding: binary");
    header("Pragma: no-cache");
    header("Expires: 0");

    echo $content;
}
?>
