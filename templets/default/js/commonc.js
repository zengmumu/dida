
define(function(require, exports, module) {
	
	setTimeout(function(){require('/templets/default/js/bootstrap.min.js');},2000);	
	
		
 	
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



//vc
$("#tab_switch>li").each(function(index, element) {
            var i=index;
			$(this).click(function(){
				$("#tab_switch .active").removeClass("active");
				$(this).addClass("active");
				$(".course-content>div:visible").hide();
				$(".course-content>div:eq("+i+")").show();
				})
        });
	$(".learnchapter>h3").click(function(){
		$(this).next(".video").slideToggle();
		if($(this).find("span").html()=="+"){
		$(this).find("span").html("-");
		}else{
			$(this).find("span").html("+");
			}
		});

var tflag=true;
$(".btn_left_slide").click(function(){
	$(this).css("z-index",10000);
	if(tflag){
		$(".left_side").animate({"left":"-=300"},200);
		$(".video-wrap").animate({"padding-left":"20"},200);
		tflag=false;
	}else{

	 $(".left_side").animate({"left":"+=300"},200); 
	 $(".video-wrap").animate({"padding-left":"320"},200);

tflag=true;  }
});
 		

 	})//jquery

	

});

 