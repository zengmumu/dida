function Test(data){
//////////////////////////////////////////创建HTML	
this.favorite={};	
this.data=data;
this.jsCha=jsCha;
// alert(jsCha+"you");
this.winName=api.winName;
// this.winName="jstest";
var parent=this;

function creatHTML(){
	// 内容
	var str="";
    var str2="";
	$.each(parent.data, function(index, item){
if(item.optiontype==3){
str+='<div class="swiper-slide" data-answer="'+item.answer+'">';	
}else{
str+='<div class="swiper-slide">';
}
str+='<div class="block-shiti">';
str+='<p class="timu-content">';
if(item.optiontype==2){
str+='<span class="que-type">多选题</span>';
}
if(item.optiontype==3){
str+='<span class="que-type">填空题</span>';
}
if(item.optiontype==1){
str+='<span class="que-type">单选题</span>';
}
if(item.optiontype==4){
str+='<span class="que-type">问答题</span>';
}
str+='<span class="que-c">'+item.question+'</span>';
str+='</p>';
str+='<div class="media-container"></div>';
str+='<div class="answer-container " data-item="answer-container">';
str+='<ul>';
if(item.optiontype==2||item.optiontype==1){

str+='<li class="ans-option " data-answer="16"><i class="xu">A</i><i class="ti">'+item.optiona+'</i></li>';
str+='<li class="ans-option" data-answer="32"><i class="xu">B</i><i class="ti">'+item.optionb+'</i></li>';
str+='<li class="ans-option" data-answer="64"><i class="xu">C</i><i class="ti">'+item.optionc+'</i></li>';
str+='<li class="ans-option" data-answer="128"><i class="xu">D</i><i class="ti">'+item.optiond+'</i></li>';

}
if(item.optiontype==3){
str+='<li class="ans-option2" ><i class="xu">答</i><input type="text" class="tiankong" size="'+item.answer.length+'"  maxlength="'+item.answer.length+'" /><li/>';
}
if(item.optiontype==4){
str+='<li class="ans-option4" > <div>'+item.explans+' </div> 	<li/>';
}
str+='</ul>';

if(item.optiontype==4){
str+='<button type="button" class="btn-show-answer">显示答案</button>';	
}else{
str+='<button type="button" class="btn-st-sub">确认答案</button>';
}
str+='</div>';
str+='<div class="answer-content">';
str+='<div class="line-fege"><span>试题详解</span></div>';
str+='<h3 class="a-title">考点</h3>';
str+='<div class="explain-p">';
str+=item.explans;
str+='</div>';
str+='<h3 class="a-title">统计</h3>';
str+='<div class="tongji-content">';
str+='<h4>我的错误率</h4>';
str+='<p>共做过<span class="t-all"></span>次,做错<span class="t-wrong"></span>次,做对<span class="t-right"></span>次</p>';
str+='</div>';
str+='</div>';
str+='</div>';
str+='</div>';

// for(k=0;k<jsCha.length;){
// 		if(parent.first){
// 		str+="<h4>"+jsCha[k]+"</h4>";
// 		parent.first=false;
// 	}
// 	if(item.typeid!=jscha[k]){
// 		k++;
// 		str+="<h4>"+jsCha[k]+"</h4>";
// 	}
// }
for(var k in jsCha){

	if(item.typeid==parseInt(k)){
		str2+='<h4>'+jsCha[k]+'</h4>';
		 delete jsCha[k];
		 break;
	}else{
		 
	}
}


    str2+='<li>'+(index+1)+'</li>';

})

	//算出章节有多长
	//再在后面添加z章节名
$(".swiper-container .swiper-wrapper").html(str);
$(".q_li_btn ul").html(str2);
var swiper1 = new Swiper('.swiper-container1', {
		        scrollbar: '.swiper-scrollbar',
		        direction: 'vertical',
		        slidesPerView: 'auto',
		        mousewheelControl: true,
		        freeMode: true,
		       
		         
      
		    });//swiper ed
}//creatHTML ed		
//////////////////////////////////////////检测答案
function checkAnswer(){
$.each(parent.data, function(index, item){
	var ans=$(".swiper-container .swiper-wrapper .swiper-slide").get(index);

var ans_option=$(ans).find(".ans-option");
ans_option=$(ans_option);


	if(item.answer==48){
        $(ans_option[0]).addClass("dui");
		$(ans_option[1]).addClass("dui");
	}
	if(item.answer==80){
		$(ans_option[0]).addClass("dui");
		$(ans_option[2]).addClass("dui");
	}
	if(item.answer==144){
		$(ans_option[0]).addClass("dui");
		$(ans_option[3]).addClass("dui");
	}
	if(item.answer==96){
		$(ans_option[1]).addClass("dui");
		$(ans_option[2]).addClass("dui");
	}
	if(item.answer==160){
		$(ans_option[1]).addClass("dui");
		$(ans_option[3]).addClass("dui");
	}
	if(item.answer==192){
		$(ans_option[2]).addClass("dui");
		$(ans_option[3]).addClass("dui");
	}
	if(item.answer==240){
		$(ans_option[0]).addClass("dui");
		$(ans_option[1]).addClass("dui");
		$(ans_option[2]).addClass("dui");
		$(ans_option[3]).addClass("dui");
	}
	if(item.answer==112){
		$(ans_option[0]).addClass("dui");
		$(ans_option[1]).addClass("dui");
		$(ans_option[2]).addClass("dui");
		
	}
	if(item.answer==176){
		$(ans_option[0]).addClass("dui");
		$(ans_option[1]).addClass("dui");
	
		$(ans_option[3]).addClass("dui");
	}
	if(item.answer==224){
		
		$(ans_option[1]).addClass("dui");
		$(ans_option[2]).addClass("dui");
		$(ans_option[3]).addClass("dui");
	}
	if(item.answer==208){
		$(ans_option[0]).addClass("dui");
	
		$(ans_option[2]).addClass("dui");
		$(ans_option[3]).addClass("dui");
	}

      if(item.answer==16){          
        $(ans_option[0]).addClass("dui");
       
    }
     if(item.answer==32){          
        $(ans_option[1]).addClass("dui");
       
    }
    if(item.answer==64){          
        $(ans_option[2]).addClass("dui");
       
    }
    if(item.answer==128){          
        $(ans_option[3]).addClass("dui");
       
    }
})
}
creatHTML()
checkAnswer()
//////////////////////////////////////////创建滑块
var swiper = new Swiper('.swiper-container', {
		       
		        pagination: '.swiper-pagination',
		        paginationType: 'fraction',
		        onInit: function(swiper){
		         	if(localStorage.getItem("lastslide")){
     				 swiper.slideTo(localStorage.getItem("lastslide"));  
					}else{ swiper.slideTo(0,1,true);}

				 if(parent.winName=="jstest"){
                    if(localStorage.getItem("f_wrong")){
                       
                        $(".f_wrong").html(localStorage.getItem("f_wrong"));
                    }else{
                         $(".f_wrong").html("0");
                    }
                     if(localStorage.getItem("f_right")){
                        $(".f_right").html(localStorage.getItem("f_right"));
                    }else{
                       $(".f_right").html("0"); 
                    }
                   }//jstest;
                   if(parent.winName=="myerr"){
                   		 if(localStorage.getItem("err_f_wrong")){
                   		  $(".f_wrong").html(localStorage.getItem("err_f_wrong"));
                   		 }else{$(".f_wrong").html("0"); }
                   		  if(localStorage.getItem("err_f_right")){
                   		  $(".f_wrong").html(localStorage.getItem("err_f_right"));
                   		 }else{$(".f_wrong").html("0"); }
                   }//err
                     if(parent.winName=="myerr"){
                   		 if(localStorage.getItem("fav_f_wrong")){
                   		  $(".f_wrong").html(localStorage.getItem("fav_f_wrong"));
                   		 }else{$(".f_wrong").html("0"); }
                   		  if(localStorage.getItem("fav_f_right")){
                   		  $(".f_wrong").html(localStorage.getItem("fav_f_right"));
                   		 }else{$(".f_wrong").html("0"); }
                   }//favorite
		         }
		    });		
//////////////////////////////////////////获取当前 slider
this.swiper=swiper;
this.slider=swiper.slides[swiper.activeIndex];
//////////////////////////////////////////按钮列表单击
$(".q_list_btn").click(function(){
		
		    var t=$("#footer").css("bottom");
		   
		    if(t=="0px"){
		     $("#footer").css("bottom","-460px");   
		    }else{
		      $("#footer").css("bottom","0px");      
		    }
		});
//////////////////////////////////////////背题单击
$(".btn_bei").click(function(){
		    $(this).addClass("select");
		     $(".btn_dati").removeClass("select");
		     $(".swiper-container").addClass("seeAnswer");
		     $(".answer-content").show();
		   
		     // $(".ans-option2,.ans-option").hide();
		        // alert("bei ti");
	});
//////////////////////////////////////////答题单击
$(".btn_dati").click(function(){
		    $(this).addClass("select");
		     $(".btn_bei").removeClass("select");
		     $(".swiper-container").removeClass("seeAnswer");
		     $(".answer-content").hide();
		     $(".ans-option").removeClass("select");
		     $(".btn-st-sub").show();
		     $(".seeAnswer").removeClass("seeAnswer");
		     swiper.slides[swiper.activeIndex].check=undefined;
		}).trigger("click");
//////////////////////////////////////////答题项目单击
$(".ans-option").click(function(){
			  
		    $(this).toggleClass("select");
            var ans=$(".swiper-container .swiper-wrapper .swiper-slide").get(swiper.activeIndex);

             var ans_option=$(ans).find(".dui");
             var btn_st_sub=$(ans).find(".btn-st-sub");
             if(ans_option.length==1){
             $(btn_st_sub).trigger("click");   

             }

		})
//////////////////////////////////////////下面按钮列表单击
$(".f_body li").click(function(){
$(".q_list_btn").trigger("click");
$(".btn_dati").trigger("click");
swiper.slideTo($(this).index());
})//li click 
//////////////////////////////////////////保存最后滑动这一张
swiper.on('SlideChangeEnd', function(swiper){
        var index=swiper.activeIndex;
        window.localStorage.setItem("lastslide",index);
        })
//////////////////////////////////////////返回上一页
$(".back").click(function(){

    api.closeWin({
	    name: api.winName
	});
})
$(".btn-show-answer").click(function(){
	var pa=$(this).parents(".swiper-slide");//获取当前这一页；
	if($(this).text()=="显示答案"){
	
	pa.find(".ans-option4").show();
	$(this).text("隐藏答案");
	}else{
		pa.find(".ans-option4").hide();
		$(this).text("显示答案");
	}
})
//////////////////////////////////////////确定按钮单击项目单击	
///
$(".btn-st-sub").click(function(){
/*-----------------------------------------父亲添加seeAnswer隐藏自己*/
var pa=$(this).parents(".swiper-slide");//获取当前这一页；
var slider=swiper.slides[swiper.activeIndex];


pa.addClass("seeAnswer");
$(this).hide();

/*---------------------------------设置当前的oldCheck*/
if(swiper.slides[swiper.activeIndex].oldCheck==undefined){
	if(localStorage.getItem("activeWR")){
	
		var obj=JSON.parse(localStorage.getItem("activeWR"));

						if(obj[swiper.activeIndex]){
						
						  if(obj[swiper.activeIndex].oldCheck!=undefined){
						
						  	swiper.slides[swiper.activeIndex].oldCheck=obj[swiper.activeIndex].oldCheck;
                       					  						  
						  }else{}		  
						}else{ }
					}else{ }//wrongT
}else{


}
/*---------------------------------设置当前的oldCheck ed*/
/*-----------------------------------------填空题目控制*/
if($(slider).find(".tiankong").val()==$(slider).attr("data-answer")&&$(slider).find(".tiankong").val()!=undefined){

swiper.slides[swiper.activeIndex].check=true;
$(".ans-option2").addClass("dui");	
//swiper.slides[swiper.activeIndex].oldCheck=true;

setTimeout(function(){swiper.slideNext();},500);
}else if($(slider).find(".tiankong").val()!=undefined&&$(slider).find(".tiankong").val()!=$(slider).attr("data-answer")){
// alert("jin cuo le");
swiper.slides[swiper.activeIndex].check=false;	
//swiper.slides[swiper.activeIndex].oldCheck=false;
$(".ans-option2").addClass("select");		
}
/*-----------------------------------------填空题目控制ed*/

/*-----------------------------------------判断对有没有被选完*/
pa.find(".dui").each(function(){
	if(swiper.slides[swiper.activeIndex].check){return};
	if(!$(this).hasClass("select")){
		    	
		var oldCheck=swiper.slides[swiper.activeIndex].oldCheck;

		 //原来错了 错就不加了    
		if(oldCheck==false){ }
		//原来对了 错+1 对减-1    
		if(oldCheck==true){
		            var old=parseInt($(".f_wrong").html());
		             $(".f_wrong").html(old+1);
		             var old2=parseInt($(".f_right").html());
		             if(old2>0){
		             $(".f_right").html(old2-1);
		             }
		            }
        //原来没有定义错+1
		if(oldCheck==undefined){
		        
		            var old=parseInt($(".f_wrong").html());
		            $(".f_wrong").html(old+1);
		}
//		当前页面错误
		swiper.slides[swiper.activeIndex].check=false;
		 return false;
	}//if 结束
})//dui循环结束

if(swiper.slides[swiper.activeIndex].check!=false){
		pa.find(".select").each(function(){
		
		    if(!$(this).hasClass("dui")){

		        var oldCheck=swiper.slides[swiper.activeIndex].oldCheck

		        if(oldCheck==false){
		
		            }
		        if(oldCheck==true){
		            var old=parseInt($(".f_wrong").html());
		             $(".f_wrong").html(old+1);
		             var old2=parseInt($(".f_right").html());
		              if(old2>0){
		             $(".f_right").html(old2-1);
		             }
		                }
		        if(oldCheck==undefined){
		        
		            var old=parseInt($(".f_wrong").html());
		            $(".f_wrong").html(old+1);}
		        	
		             swiper.slides[swiper.activeIndex].check=false;
		            return false;
		            }
		   
		})// each ed
}//if ed;
var oldCheck=swiper.slides[swiper.activeIndex].oldCheck;//当前页以前选择

var check=swiper.slides[swiper.activeIndex].check;//当前页面现在的选择

if( check!=false){//如果现在选择是对的
	
/*-----------------------------------------判断以前的选择是不是没有定义的*/
if(check==undefined){check=true}

	if(oldCheck==undefined){ 
		    var old2=parseInt($(".f_right").html());    
		     $(".f_right").html(old2+1);
		    
		 	} 
	if(oldCheck==false){ //错了；
		    var old=parseInt($(".f_wrong").html());
		   
		    $(".f_wrong").html(old-1);
		    var old2=parseInt($(".f_right").html());
		    
		    $(".f_right").html(old2+1); 
	        }
		
	$(".f_body li").eq(swiper.activeIndex).removeClass().addClass("right");
	/*---------------------------------设置当前的rightT*/
function setRightT(){
	if (slider.rightT == undefined) {
					if(localStorage.getItem("activeWR")){
							var obj=JSON.parse(localStorage.getItem("activeWR"));
								console.log(obj);
								console.log("--right0000--");
						if( obj[swiper.activeIndex]){
							
						  if( obj[swiper.activeIndex].right!=undefined){
						 
						  	slider.rightT=obj[swiper.activeIndex].right+1;
						  	
						 
						  }else{slider.rightT = 1; }
						  
						  if( obj[swiper.activeIndex].wrong!=undefined){
						 
						  	slider.wrongT=obj[swiper.activeIndex].wrong;
						  	
						 
						  }else{ }
						}else{slider.rightT = 1; }
					}else{slider.rightT = 1; }
				
		} else {
	
	slider.rightT++;
}
}
setRightT();
swiper.slides[swiper.activeIndex].oldCheck=true;	
setTimeout(function(){swiper.slideNext();},500);
//存这页是错的id
  setStorage("rightCollection","id");

 
//存这页是错的id ed
	}else{
setStorage("wrongCollection","id");
swiper.slides[swiper.activeIndex].oldCheck=false;
$(".f_body li").eq(swiper.activeIndex).removeClass().addClass("wrong");

/*---------------------------------设置当前的wrongT*/
function setWrongT(){
if(slider.wrongT==undefined){
	if(localStorage.getItem("activeWR")){
		
		var obj=JSON.parse(localStorage.getItem("activeWR"));
		
						if(obj[swiper.activeIndex]){
							console.log(obj[swiper.activeIndex]);
							
						  if(obj[swiper.activeIndex].wrong){
						  	slider.wrongT=obj[swiper.activeIndex].wrong+1;
						  	
						  }else{slider.wrongT= 1; }
						  if( obj[swiper.activeIndex].right!=undefined){
						 
						  	slider.rightT=obj[swiper.activeIndex].right;
						  	
						 
						  }else{}
						  
						}else{slider.wrongT = 1; }
					}else{slider.wrongT = 1; }//wrongT
}else{
	
	slider.wrongT++;

}
}
setWrongT();
$(slider).find(".answer-content").show();


		}


/*---------------------------------设置当前的allT*/
if(slider.allT==undefined){
	if(localStorage.getItem("activeWR")){
		var obj=JSON.parse(localStorage.getItem("activeWR"));
						if(obj[swiper.activeIndex]){
						  if(obj[swiper.activeIndex].all){
						  	slider.allT=obj[swiper.activeIndex].all+1;
						  }else{slider.allT = 1; }		  
						}else{slider.allT  = 1; }
					}else{slider.allT  = 1; }//wrongT
}else{
	slider.allT++;
}
/*---------------------------------设置当前的allTed*/

/*---------------------------------存取当前页面对错次数*/	
if(localStorage.getItem("activeWR")){
var activeWR=JSON.parse(localStorage.getItem("activeWR"));
}else{var activeWR={};}
//if(slider.allT==undefined){slider.allT=0}
//if(slider.rightT==undefined){slider.rightT=0}
//if(slider.wrongT==undefined){slider.wrongT=0}
/*---------------------------------设置allT文本*/
$(".t-all").eq(swiper.activeIndex).html(slider.allT);
$(".t-right").eq(swiper.activeIndex).html(slider.rightT);
$(".t-wrong").eq(swiper.activeIndex).html(slider.wrongT);
//alert(activeWR[0].all+","+","+activeWR[0].wrong);

//alert(slider.allT+"--r-"+slider.rightT+"---w-"+slider.wrongT);
/*---------------------------------设置allT文本*/
			if(activeWR[swiper.activeIndex]!=undefined){
//				if(slider.rightT==undefined){slider.rightT=0}
//				if(slider.wrongT==undefined){slider.wrongT=0}
				activeWR[swiper.activeIndex].right=slider.rightT;
//				
				
				activeWR[swiper.activeIndex].all=slider.allT;
				
			    activeWR[swiper.activeIndex].wrong=slider.wrongT;
			 
			   
			     activeWR[swiper.activeIndex].oldCheck=	swiper.slides[swiper.activeIndex].oldCheck;
			}else{
//				if(slider.rightT==undefined){slider.rightT=0}
//				if(slider.wrongT==undefined){slider.wrongT=0}
				activeWR[swiper.activeIndex]={};
				activeWR[swiper.activeIndex].right=slider.rightT;
				activeWR[swiper.activeIndex].all=slider.allT;
			    activeWR[swiper.activeIndex].wrong=slider.wrongT;
			     activeWR[swiper.activeIndex].oldCheck=	swiper.slides[swiper.activeIndex].oldCheck;
			}

localStorage.setItem("activeWR",JSON.stringify(activeWR));

//存对错
window.localStorage.setItem("f_right",parseInt($(".f_right").html()));
window.localStorage.setItem("f_wrong",parseInt($(".f_wrong").html()));
if(parent.winName=="myerr"){
window.localStorage.setItem("err_f_right",parseInt($(".f_right").html()));
window.localStorage.setItem("err_f_wrong",parseInt($(".f_wrong").html()));	
}
if(parent.winName=="favorite"){
window.localStorage.setItem("fav_f_right",parseInt($(".f_right").html()));
window.localStorage.setItem("fav_f_wrong",parseInt($(".f_wrong").html()));	
}
		})//click;

$(".collection").click(function(){
	var qId=parent.data[swiper.activeIndex].id;	
	if(localStorage.getItem("favorite")){
	var favorite=JSON.parse(localStorage.getItem("favorite"));
	}else{var favorite={};}
	if(favorite[swiper.activeIndex]!=undefined){
	favorite[swiper.activeIndex]=qId;
	}else{
	 favorite[swiper.activeIndex]={};
	 favorite[swiper.activeIndex]=qId;
	}
	$(".collection").addClass("active")  
	localStorage.setItem("favorite",JSON.stringify(favorite));


})//cllection ed
	
swiper.on('SlideChangeStart', function(swiper){
  var index=swiper.activeIndex;
  var favorite=JSON.parse(localStorage.getItem("favorite"))||{};
  // alert(favorite);
  this.slider=swiper.slides[swiper.activeIndex];
      if(favorite[index]){      	$(".collection").addClass("active")      }else{
      	$(".collection").removeClass("active")
      }
        })

function setStorage(name,param){

 	 if(localStorage.getItem(name)){
 	var obj=JSON.parse(localStorage.getItem(name));
 	 }else{
 	 var obj={};
 	 }
 	 if(obj[swiper.activeIndex]!=undefined){
	obj[swiper.activeIndex]=parent.data[swiper.activeIndex][param];
	}else{
	 obj[swiper.activeIndex]={};
	 obj[swiper.activeIndex]=parent.data[swiper.activeIndex][param];
	}
	localStorage.setItem(name,JSON.stringify(obj));
 }// setStorage ed
 function getStorage(name){
 	
 	return JSON.parse(localStorage.getItem(name));
 }
 
 function addWRclass(){
var wrongCollection=JSON.parse(localStorage.getItem("wrongCollection"))||[];
var wrongItem=[];
var rightCollection=JSON.parse(localStorage.getItem("rightCollection"))||[];
var rightItem=[];
for(var k in wrongCollection){

	wrongItem.push(parseInt(k));
}
for(var i=0;i<wrongItem.length;i++){
	var index=wrongItem[i];
	$(".q_li_btn li").eq(index).addClass("wrong")
}
for(var z in rightCollection){

	rightItem.push(parseInt(z));
}
for(var i=0;i<rightItem.length;i++){
	var index=rightItem[i];
	$(".q_li_btn li").eq(index).addClass("right")
}
}//addWRclass() ed
addWRclass();

if(api.winName!="jstest"){
	$(".f_wrong,.f_right").hide();
}



}	//类ed