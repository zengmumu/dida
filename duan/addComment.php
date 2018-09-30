<?php
header("Access-Control-Allow-Origin: *");
header('content-type:application/json;charset=utf8');//输出为 json格式
if(!isset($_GET["id"])){
	$id="0I98NCkx";
}else{
	$id=$_GET["id"];
}
$data = array(

    'docid'=>$id,
	'comment'=>$msg,
	'reply'=>'',
	's'=>''
    ); 

$query = http_build_query($data); 

$options['http'] = array(
     'timeout'=>60,
     'method' => 'POST',
     'header' => 
   "Accept: application/json\r\n" .
   "Accept-Encoding: zip, deflate\r\n" .
   "Accept-Language: zh-CN,zh;q=0.9\r\n" .
   "Accept-Encoding: gzip, deflate\r\n" .
   "Connection: keep-alive\r\n" .
   "Cookie: wuid=18345122537644; wuid=374132671035866; wuid_createAt=2018-01-11 16:14:48; Hm_lvt_15fafbae2b9b11d280c79eff3b840e45=1515658558,1515995840,1516013145,1516080421; ios_ds_date_click=1516080493146; ios_ds_params=%7B%22wuid%22%3A%2218345122537644%22%2C%22deep_message%22%3A%7B%22action_method%22%3A%22CLICK_DOC%22%2C%22docid%22%3A%220I98NCkx%22%2C%22distribution_channel%22%3A%22webpages4%22%7D%2C%22distribution_channel%22%3A%22webpages4%22%7D; JSESSIONID=f3706658bc817724ad7df7233713058ce73a8ffea67e0b32ee2ac800da3c8a3d; captcha=s%3Ab099a654c39fce5a96b6afcae633d237.BlvdhSnbXxK%2FoFEfaodnsxlWt5N5aYpK2Fai6w3rw2s; Hm_lpvt_15fafbae2b9b11d280c79eff3b840e45=1516081547\r\n" .
   "Host: www.yidianzixun.com\r\n" .
   "Referer: http://www.yidianzixun.com/article/$id\r\n" .
   "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36\r\n" .
   "X-Requested-With: XMLHttpRequest",
     'content' => $query,
    
    );

$url = "http://www.yidianzixun.com/home/q/addcomment";
$context = stream_context_create($options);
$result = file_get_contents($url, true, $context);

echo $result;
?>