<?php
function cget($url) {
	$apps = array(
		array("k" => "NEpkVDhmckxn", "u" => "www.172u.cn"),
		array("k" => "TjFkbDktYjU=", "u" => "www.ixiaolianwang.com"),
		array("k" => "RUpXZHdOTjhl", "u" => "www.iqiyi.com", "r" => "http://www.iqiyi.com/marketing/ksfw.html"),
		array("k" => "TjFpZWIyNmFaSw==", "u" => "youxibe.com", "r" => "http://youxibe.com/video/" . mt_rand(100,9999)),
		array("k" => "RXlQS2VpVXQ=", "u" => "www.94id.com", "r" => "http://www.94id.com/video.html"),
		array("k" => "TmtHQUc0VXA=", "u" => "bbs.0566cc.cc"),
		array("k" => "VkpkWXRqb0dl", "u" => "www.dj169.com"),
		array("k" => "RUpnaGNTOHM=", "u" => "www.dxpang.com"),
		array("k" => "RXlWWFBqaFp4", "u" => "www.52pili.com"),
		array("k" => "RXl5TGxYXy1l", "u" => "www.lixinedu.com.cn"),
		array("k" => "NHlqT1pNYjk=", "u" => "www.faxsun.com"),
		array("k" => "Tnl5d3d2ZUZ4", "u" => "sinzar.cn"),
		array("k" => "RUplbmNuLWV4", "u" => "www.manmandy.com"),
		array("k" => "RXlxNDE4aEhs", "u" => "video.cngansu.cn"),
		array("k" => "TjFyRzNrRWk=", "u" => "mobile.qudong.com"),
		array("k" => "TmtJanJTaDA=", "u" => "yuanxw.com"),
		array("k" => "RXlQS2VpVXQ=", "u" => "xz768.com"),
		array("k" => "RTEyQ3FEOVNs", "u" => "www.wpfl8.com"),
		array("k" => "RWthWDdBSnA=", "u" => "www.zscz.xyz"),
		array("k" => "TkpRWnRCQlln", "u" => "dmgeek.com"),
		array("k" => "Tms1cTJRMHdl", "u" => "www.jinliys.com")
	);
	$app = $apps[array_rand($apps)];
	$refer = isset($app['r']) ? $app['r'] : "http://{$app['u']}/";
	if (!$url) return;
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_AUTOREFERER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		"Appkey: {$app['k']}",
		"Referer: {$refer}",
		"Origin: http://{$app['u']}"
	));
	
	curl_setopt($ch, CURLOPT_TIMEOUT, 6);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$html = curl_exec($ch);
	curl_close($ch);
	return $html;
}
if(isset($_REQUEST['url'])){
	$url = trim($_REQUEST['url']);
}elseif(isset($_REQUEST['vid'])){
	$url = "http://v.youku.com/v_show/id_{$_REQUEST['vid']}.html";
}else{
	header("Content-Type: text/html; charset=UTF-8"); exit("参数错误。");
}
$hd = isset($_REQUEST['hd']) ? intval($_REQUEST['hd']) : 2;
if($hd > 3){ $hd = 3; }
if($hd < 1){ $hd = 1; }
$phone = false;
if(isset($_REQUEST['phone']) && $_REQUEST['phone']){
	$phone = true;
}
$api = json_decode(cget("http://videojj.com/api/videos/parse?url=" . base64_encode($url)), true);
$segs = $api['msg']['segs'];
if(!$segs){ header("Content-Type: text/html; charset=UTF-8"); exit("解析失败。"); }
$hdlist = array();
if(!$phone){
	$fmt = "";
	if(isset($segs['FLV-SuperHD'])){ $hdlist[] = 3; if($hd == 3){ $fmt = "FLV-SuperHD"; } }
	if($hd == 3 && !$fmt){ $hd = 2; }
	if(isset($segs['MP4'])){ $hdlist[] = 2; if($hd == 2){ $fmt = "MP4"; } }
	if(isset($segs['MP4-SD'])){ $hdlist[] = 2; if($hd == 2){ $fmt = "MP4-SD"; } }
	if(isset($segs['MP4-HD'])){ $hdlist[] = 2; if($hd == 2){ $fmt = "MP4-HD"; } }
	if($hd == 2 && !$fmt){ $hd = 1; }
	if(isset($segs['FLV'])){ $hdlist[] = 1; if($hd == 1){ $fmt = "FLV"; } }
	if(isset($segs['FLV-SD'])){ $hdlist[] = 1; if($hd == 1){ $fmt = "FLV-SD"; } }
	if(isset($segs['FLV-HD'])){ $hdlist[] = 1; if($hd == 1){ $fmt = "FLV-HD"; } }
	if(isset($segs['3GP-HD'])){
		if(!$fmt){ $fmt = '3GP-HD'; $hdlist[] = 1; }
		if(strstr($segs['3GP-HD'][0]['url'], "ypremium=1&r=")){ // 表明是 VIP 视频。
			$fmt = '3GP-HD'; $hdlist = array(1);
		}
	}
	if(!$fmt){ header("Content-Type: text/html; charset=UTF-8"); exit("资源解析失败。"); }
	$hdlist = array_unique($hdlist);
	sort($hdlist);
	$files = $segs[$fmt];
	$deft = $defa = array();
	$q = array(1 => "标清", 2 => "高清", 3 => "超清");
	$a = "url=" . urlencode($url) . "&hd=" . $hd;
	$http = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https')) ? 'https' : 'http';
	$def = "{$http}://{$_SERVER['HTTP_HOST']}{$_SERVER['PHP_SELF']}?["."$"."pat]";
	foreach($hdlist as $ahd){
		$defa[] = "url=" . urlencode($url) . "&hd=" . $ahd;
		$deft[] = $q[$ahd];
	}
	header("Content-Type: text/xml; charset=UTF-8");
	echo '<?xml version="1.0"?>';
	echo "\r\n";
	echo '<ckplayer>';
	echo "<flashvars><![CDATA[{h->3}{a->{$a}}{defa->" . implode('|', $defa) . "}{deft->" . implode('|', $deft) . "}{f->{$def}}]]></flashvars>";
	foreach($files as $file){
		echo "<video><file><![CDATA[{$file['url']}]]></file><size>{$file['size']}</size><seconds>{$file['seconds']}</seconds></video>";
	}
	echo '</ckplayer>';
}else{
	$fmt = "";
	if(isset($segs['Mobile-m3u8-FLV-SuperHD'])){ $hdlist[] = 3; if($hd == 3){ $fmt = "Mobile-m3u8-FLV-SuperHD"; } }
	if($hd == 3 && !$fmt){ $hd = 2; }
	if(isset($segs['Mobile-m3u8-MP4'])){ $hdlist[] = 2; if($hd == 2){ $fmt = "Mobile-m3u8-MP4"; } }
	if(isset($segs['Mobile-m3u8-MP4-SD'])){ $hdlist[] = 2; if($hd == 2){ $fmt = "Mobile-m3u8-MP4-SD"; } }
	if(isset($segs['Mobile-m3u8-MP4-HD'])){ $hdlist[] = 2; if($hd == 2){ $fmt = "Mobile-m3u8-MP4-HD"; } }
	if($hd == 2 && !$fmt){ $hd = 1; }
	if(isset($segs['Mobile-m3u8-FLV'])){ $hdlist[] = 1; if($hd == 1){ $fmt = "Mobile-m3u8-FLV"; } }
	if(isset($segs['Mobile-m3u8-FLV-SD'])){ $hdlist[] = 1; if($hd == 1){ $fmt = "Mobile-m3u8-FLV-SD"; } }
	if(isset($segs['Mobile-m3u8-FLV-HD'])){ $hdlist[] = 1; if($hd == 1){ $fmt = "Mobile-m3u8-FLV-HD"; } }
	if(isset($segs['3GP-HD'])){
		if(!$fmt){ $fmt = '3GP-HD'; $hdlist[] = 1; }
		if(strstr($segs['3GP-HD'][0]['url'], "ypremium=1&r=")){ // 表明是 VIP 视频。
			$fmt = '3GP-HD'; $hdlist = array(1);
		}
	}
	if(!$fmt){ header("Content-Type: text/html; charset=UTF-8"); exit("资源解析失败。"); }
	$file = $segs[$fmt][0]['url'];
	header("Location: {$file}");
}
?>