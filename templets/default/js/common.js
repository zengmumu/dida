
define(function(require, exports, module) {
	
	setTimeout(function(){require('/templets/default/js/bootstrap.min.js');},2000);	
	setTimeout(function(){require.async('/templets/default/js/jquery.lazyload.min.js',function(){$("img.lazy").lazyload()});},1000);	
		
 	
 	$(function(){
 		
 		


 	
	  $(".signin h4 span").each(function(index,value){
		var i=index;
		$(this).click(function(){
			$(".active-title").removeClass("active-title");
			$(this).addClass("active-title");
			$(".signin .modal-body>div").hide();
			$(".signin .modal-body>div:eq("+i+")").show();
			})  
		  
	  })
	  $(".link-register").click(function(){
		
		$(".active-title").removeClass("active-title");
			$(".signin h4 span:eq(1)").addClass("active-title");
			$(".signin .modal-body>div").hide();
			$(".signin .modal-body>div:eq("+1+")").show(); 
		  })



setTimeout(function(){
require.async('/include/dedeajax2.js',function(){CheckLogin()});
},1500);
function CheckLogin(){
	  var taget_obj = document.getElementById('_userlogin');
	  myajax = new DedeAjax(taget_obj,false,false,'','','');
	  myajax.SendGet2("/member/ajax_loginsta.php");
	  DedeXHTTP = null;
	 
	}	 

;

$("#_userlogin li").click(function(){

 		require.async('/member/templets/js/reg_new.js', function() {  });	
 		require.async('/member/templets/js/CheckPassStrength.js', function() {  });		
 		$("#vdimgck2,#vdimgck").attr("src","http://www.qingkt.com/include/vdimgck.php");
 		$("#js-refresh1,#vdimgck").click(function(){changeAuthCode('#vdimgck')});
 		$("#js-refresh2,#vdimgck2").click(function(){changeAuthCode('#vdimgck2')});
 			//onclick="changeAuthCode(\'#vdimgck\');"
 			
//.$cfg_cmspath.'/include/vdimgck.php
 		})//click
	
reMethod ='GET';
pwdmin ="3";


function changeAuthCode(str) {
//	alert(str)
	var num = 	new Date().getTime();
	var rand = Math.round(Math.random() * 10000);
	num = num + rand;
	$('#ver_code').css('visibility','visible');
	if ($(str)[0]) {
		$(str)[0].src = "/include/vdimgck.php?tag=" + num;
	}
	return false;	
}

function hideVc()
{
	$('#ver_code').css('visibility','hidden');
}



$("#passwordLevel").removeClass().addClass("rank r0");
	$("#vdcode").focus(function(){
	  var leftpos = $("#vdcode").position().left;
	  var toppos = $("#vdcode").position().top - 42;
	  $('#ver_code').css('left', leftpos+'px');
	  $('#ver_code').css('top', toppos+'px');
	  $('#ver_code').css('visibility','visible');
	});
	$("input[type='password']").click(function(){
	  hideVc()
	});
	$("#txtUsername").click(function(){
	  hideVc()
	});
	$("input[type='radio']").focus(function(){
	  hideVc()
	});


	$("#email").focus(function(){		

		$("#_email").css("visibility","visible");
		});
	$("#txtPassword").focus(function(){
		$("#passwordLevel").css("visibility","visible");
		});
	$("#userpwdok").focus(function(){
		$("#_userpwdok").css("visibility","visible");
		});
	$("#txtUsername").focus(function(){
		$("#_userid").css("visibility","visible");
		});	
		
$(".course-one").each(function(index, element) {
    var picname=$(this).find("img").attr("src");
	if(picname=="/images/defaultpic.gif"){
		var title=$(this).find(".s_header").text();
		var len=title.length;
		var des=$(this).find(".text-ellipsis");
		var imgwrap=$(this).find(".course-list-img");
		imgwrap.empty();
		imgwrap.html('<span class="bigtitle"><em class="g_one_header">'+title+'</em> <span class="des"> '+des.html()+'</span></span>');
		
			var num_color=16746496+len*400<< len/2;
		var color16=num_color.toString(16);
		color16=color16.substring(0,6);
		if(color16[0]=="-"){
		color16="A"+color16.substring(1,6);
	
			}
	
		if(color16.length<6){
			color16="AA"+color16.substring(1,5);
			}
		
		if(color16.length<5){
			color16="ff8800";
			}			
		if(color16=="1ff326"||color16=="3fe714"){
			color16="86d90a";
			}
		switch(len){case 8 :color16="37A5B3";break;case 9: color16="716F84";break;case 10 :color16="706D3C";break;case 11:color16="E65527";break;case 12:color16="37A5B3";break;case 13:color16="363948";break;case 14:color16="716F84";break;case 15:color16="5EA07F";break;case 16:color16="86B3BB";break;case 17:color16="37A5B3";break;}

		
		$(this).find(".bigtitle").css("background-color","#"+color16);
		}
		});
setTimeout(function(){
	var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?4f0b15b8cc3b883e21cb0e10303d167c";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
},2500)
//list
$.getUrlParam = function(name){
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
var r = window.location.search.substr(1).match(reg);
if (r!=null) return unescape(r[2]); return null;
}


var easy=$.getUrlParam('iseasy');
$(".level .course-nav-item").removeClass("on");

if(easy===null){
	$(".level .levelall").addClass("on");
	}else if(easy=="0"){
			$(".level .level0").addClass("on");
		}
	else if(easy=="1"){
			$(".level .level1").addClass("on");
		}
	else if(easy=="2"){
			$(".level .level2").addClass("on");
		}
	else if(easy=="3"){
			$(".level .level3").addClass("on");
		}	


 		

 	})//jquery

	

});

 