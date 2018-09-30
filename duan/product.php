<?php
header("Access-Control-Allow-Origin: *");
header('content-type:application/json;charset=utf8');//输出为 json格式
if(isset($_GET["page"])){//看get方法传过来的参数有没有page
$page=$_GET["page"];	
}else{
$page=0;//page 默认
}
$data = array(
   'client_id'=>'180100031051',
   'channel_id'=>'17409.0266',
   'webp'=>'1',
   'commodity_id'=>'10000064',
   'width'=>'720'
    ); 

$query = http_build_query($data); 

$options['http'] = array(
     'timeout'=>60,
     'method' => 'POST',
     'header' => 'Content-type:application/x-www-form-urlencoded',
     'content' => $query
    );

$url = "https://m.mi.com/v1/product/productView2_new";
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo $result;
?>