<?php
//2015年12月4日
//调用优酷PC端接口，无需算法
error_reporting(0);
header("Content-Type:text/xml;charset=utf-8");
$api = "https://openapi.youku.com/v2/videos/files.json";
$app = "client_id=e57bc82b1a9dcd2f&client_secret=a361608273b857415ee91a8285a16b4a&type=play&video_id=";
$sign = "_";//用下划线来分割  非空!(建议用默认的就好)
$hz = $sign."youku";
//定义全局变量
define("API", "$api");
define("APP", "$app");
define("HZ", "$hz");
define("SG", "$sign");
//取网址url后面的值
$url = $_GET['url'];
// $url = "http://v.youku.com/v_show/id_XNzE4NTQ5OTEy.html";
if ($url && $url != '') {
    $ykid=stripos($url, 'v.youku.com');
    if ($ykid>"0") {
        //将取到的网址传入指定的方法中
        $xml .= yk_list_url($url);
        echo $xml;
        exit;
    }
}
//取id后面的值
$id = $_GET['id'];
// $url = "http://v.youku.com/v_show/id_XNzE1NDU1MDY4.html";
if ($id && $id != '') {
    $ykid=stripos($id, "youku");
    if ($ykid>"0") {
        $ykidlists = explode(SG, $id);//cq_XOTE4NjE2MzQ4_youku
        $arrlen = count($ykidlists);//3
        // 判断分割后数组的长度，原本(cq_XOTE4NjE2MzQ4_youku)的长度为3
        if ($arrlen != 3) {//如果不等于3，就直接获取id的值，也就是下标为0的值
            $ykid = $ykidlists[0];
            yk_begin($ykid);
            exit;
        }
        $qxd = $ykidlists[0];
        $ykid = $ykidlists[1];
        yk_begin($ykid,$qxd);
        exit;
    }
}
//调用出错
Get_CW();

function yk_list_url($url){
        //根据优酷网址的特征，利用下划线来分割,并且取到下标为2的值
    $vid = explode('_', $url);
    if ($vid[2])        
            //接着用点来分割，取出下标为0的值。也就是VID了
        $id = explode('.', $vid[2]);
    if ($id[0])
            //将VID传入取优酷视频信息的方法进行下一步操作
        $xml = yk_begin($id[0]);
    return $xml;
}
function yk_begin($vid,$qxd){
    $data = APP .$vid;
        $html = curl_https(API, $data);
        //用PHP自带JSON来解码
    $jdata = json_decode($html);
    $sid = $jdata->sid;
    $files = $jdata->files;
    if ($sid=="") {
        header("Content-Type:text/html;charset=utf-8");
        echo "sidnull";
        return;
    }
    $definition = $files;
    // 当没有传指定清晰度的值的时候，默认输出最高清晰度，所以需要循环视频所有清晰度，然后再取最后一个清晰度。
    // 定义一个数组用来存放清晰度数据
    $types = array();
    // 用foreach循环来把获得的清晰度数据加入到指定数组中  可以用来智能识别清晰度的值
    foreach ($definition as $key => $v) {
        array_push($types, $key);
    }
    $xhcs = count($types);

    $hden2 = array("3gp","bq","gq","cq","hd2");

    //如果去掉，可以通过$types来获取清晰度的值
    if ($qxd=="") {
        // 为空则输出最高清晰度
        $vtype = $hden2[count($types)-1];//这里取到的值是视频信息页的清晰度数据 flvhd,mp4hd
        $qxurl = $vtype.SG.$vid.HZ;
        // echo $vtype;
        // 重置清晰度的值
        $vtype = $types[count($types)-1];
    }else{
        $vtype2 = $qxd;//cq
        $qxurl = $vtype2.SG.$vid.HZ;
    }
    echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
    echo "<ckplayer>\n";
    echo "  <flashvars>\n";
    echo "{h->3}{a->$qxurl}{defa->".getdefa($xhcs,$vid)."}{deft->".getdeft($xhcs)."}{f->".$_SERVER['PHP_SELF']."?id=[\$pat]}\n";
    echo "  </flashvars>\n";
    
    // 重置清晰度的值 将传过来的参数cq/gq/bq/转化成原始清晰度数据

    for ($i=0; $i < $xhcs; $i++) {
        if ($hden2[$i]==$vtype2) {//cq==3
            $num = $i;
            $vtype = $types[$num];
            break;
        }
    }
    // 判断是否存在该清晰度
    if ($vtype == "") {
        $vtype = $types[count($types)-1];//如果不存在指定的清晰度，则默认输出该视频存在的最高清晰度
    }

    $yktypes = array("3gphd","flv","mp4","hd2","hd3");
    $ykhd = array("1","0","1","2","3");
    $ykformatname = array("mp4","flv","mp4","flv","flv");
    $ykclear = array("3gp","标清","高清","超清","1080");
    $ykarr = array("type"=>$yktypes,"hd"=>$ykhd,"fn"=>$ykformatname,"cl"=>$ykclear);
    foreach ($files as $key =>$v) {
        $segs = $v->segs;
        $yktype = $key;
        if ($yktype==$vtype) {//hd2
            $segs = $v->segs;
            for ($i=0; $i < count($types); $i++) {
                if ($yktype == $ykarr["type"][$i]) {
                    $hd = $ykarr["hd"][$i];
                    $formatname = $ykarr["fn"][$i];
                    $clear = $ykarr["cl"][$i];
                    break;
                }
            }
            echo "      <type>\n";
            echo "          <![CDATA[".$clear."]]>\n";
            echo "      </type>\n";
            foreach ($segs as $k => $value) {
                $ts = $value->duration;
                $downlink = $value->url;
                echo "  <video>\n"; 
                echo "      <file>\n";
                echo "          <![CDATA[".$downlink."]]>\n";
                echo "      </file>\n";
                echo "      <size>".$value->size."</size>\n";
                echo "      <seconds>".$ts."</seconds>\n";
                echo "  </video>\n";
            }
            echo "</ckplayer>\n";
            return;
        }
    }
    return;
}
function getdefa($xhcs,$vid){
    $hden2 = array("3gp","bq","gq","cq","hd2");
    for ($i=0; $i < $xhcs; $i++) { 
        if ($i>0) {
            $defa .= "|".$hden2[$i].SG.$vid.HZ;
        }else{
            $defa .= $hden2[$i].SG.$vid.HZ;
        }
    }
    return $defa;
}

function getdeft($xhcs){
    $hdcn = array("标清(3GP)","标清","高清","超清","1080");
    for ($i=0; $i < $xhcs; $i++) { 
        if ($i>0) {
            $qxd .= "|".$hdcn[$i];
        }else{
            $qxd .= $hdcn[$i];
        }
    }
    return $qxd;
}
/** curl 获取 https 请求 
* @param String $url 请求的url 
* @param Array $data 要發送的數據 
* @param Array $header 请求时发送的header 
* @param int $timeout 超时时间，默认30s 
*/ 
function curl_https($url, $data,$timeout=30){ 
    $ch = curl_init(); 
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 跳过证书检查 
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // 从证书中检查SSL加密算法是否存在 
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true); 
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
    curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
    $response = curl_exec($ch); 
    curl_close($ch);
    return $response;
} 

function Get_CW(){
    header("Content-Type:text/html;charset=utf-8");
        echo "illegal parameters!";
        exit;
}
?> 