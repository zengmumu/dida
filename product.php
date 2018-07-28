<?php

if(!isset($_GET["id"])){
	$id = '10000070';
}else{
	$id=$_GET["id"];
}
if(!isset($_GET["cid"])){
	$cid = '10000070';
}else{
	$id=$_GET["cid"];
}
$data = array ('foo' => 'bar','client_id'=>180100031051,'channel_id'=>'0','webp'=>1,'commodity_id'=>$id,'width'=>'720');
$data = http_build_query($data);
$opts = array (
'http' => array (
'method' => 'POST',
// 'header'=> "Content-type: application/x-www-form-urlencodedrn" .
// "Content-Length: " . strlen($data) . "rn",

'header'=>"Content-type: application/x-www-form-urlencoded\r\nReferer: https://m.mi.com/\r\n",

'content' => $data
)
);
$context = stream_context_create($opts);
$html = file_get_contents('https://m.mi.com/v1/product/productView2',false, $context);
// echo json_encode($html);
echo $html;


?>





