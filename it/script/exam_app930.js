					//245 解锁课程
					//211 解锁章节
					var app=angular.module("examApp",["ionic",'ngAnimate'])
					.controller("mainCtrl",["$scope","$state","$ionicHistory","$stateParams","$http","$getUser","$ionicSideMenuDelegate","$rootScope","$userData",function($scope,$state,$ionicHistory,$stateParams,$http,$getUser, $ionicSideMenuDelegate,$rootScope,$userData){
					  $scope.host="";					
						 
						 $scope.goback=function(){
						 	var abc = $ionicHistory.goBack();	
						 	console.log($ionicHistory,$ionicHistory.backView(),"backview");
						 	if($ionicHistory.backView()==null){
						 		window.history.back();
						 	}
						 	
						 }
						 $scope.checkUser = function(){
							if(!$scope.userData.user.M_LoginID){		
							$scope.goState("login",null);
							}
						}
						$scope.userData = $userData;
						
							// 当页面发生改变时会触发这个事件
						$scope.$on("$stateChangeSuccess",function(event,toState,params){
							if(toState.name=="home"&&!$scope.userData.user.M_LoginID){
					//			$scope.userData.getUser($scope.checkUser);//获取用户信息
							}
						})
						$scope.data=$getUser;
						$scope.data.get();
						$rootScope.data=$getUser;

						$scope.toggleLeft = function(e) {
							// console.log($ionicSideMenuDelegate._instances[0]);
							// console.log(e);
							$ionicSideMenuDelegate._instances[0]._handleDrag(e);
					    // $ionicSideMenuDelegate.toggleLeft();0
					    // $ionicSideMenuDelegate._handleDrag(e)
					  };
					  $scope.switchName=function(str){
						if(str){
							if(str.substring(0,3)=="未登录"){
							return "登录";
							}else{
								return "退出";
							}
						}else{
							return "登录";
						}
						
					}
					  $scope.loginOut=function(){
					  	// alert("out");
					  	$ionicSideMenuDelegate.toggleLeft();
						$getUser.out();
							
						}
						$http.get($scope.host+"/start/get_course.php").success(function(data){
							$scope.data.courseList=data;							
						})
						$scope.share=function(){
							if(api){
								
							
							var sharedModule = api.require('shareAction');
							var abc=sharedModule.share({
							    text: '一个学习python好地方',
							    type: 'url',
							    path:'http://www.qinkt.com/it/'
							});						
							}else{
								alert("没有api")
							}
						}

					}])
					.controller("indexCtrl",["$scope","$state","$ionicHistory","$stateParams","$http","$getUser","$rootScope","$ionicScrollDelegate",function($scope,$state,$ionicHistory,$stateParams,$http,$getUser,$rootScope,$ionicScrollDelegate){
					 
						$scope.data=$getUser;
						$scope.data.get();
						
						function getCourse(){
							if($scope.data.courseList){
								for(var k in $scope.data.courseList){
									if( $scope.data.courseList[k].id==$stateParams.course){
										$scope.data.course=$scope.data.courseList[k];
										
											$scope.data.course=$scope.data.courseList[k];
										    $rootScope.data.course=$scope.data.courseList[k];
										break;
									}
								}
							}else{
								setTimeout(function(){
									getCourse()
								},20)
							}
						}
						getCourse()
							// 	for(var k in $scope.data.courseList ){
									
							// 	if($scope.data.courseList[k].id==$stateParams.course){
							// 		$scope.data.course=k;
							// 		break;
							// 	}
							// }

						$scope.loginOut=function(){
							$getUser.out();
							
						}
						function getPrecent(){
						if($scope.data.user.M_ID!=undefined){
							$http.get($scope.host+"/start/get_precent.php?tid="+$stateParams.course+"&user="+$scope.data.user.M_ID).success(function(data){
								$scope.preData=data;
				
								})
						}else{
									setTimeout(function(){  getPrecent()},50)
								}
							
						}
						 getPrecent();
						$http.get($scope.host+"/start/get_chapters.php?reid="+$stateParams.course).success(function(data){
							// var chapter=data.sort(function(a,b){if(a.id*1>b.id*1){return 1}else{return -1}});
							$scope.chapters=data.sort(function(a,b){if(a.id*1>b.id*1){return 1}else{return -1}});


							if($scope.chapters[0]){

							$scope.chapters[0].delock=true;
							}
						function getunlock(){

								if($scope.data.user.M_ID!=undefined){
									
									$http.get($scope.host+"/start/get_unlock.php?user="+$scope.data.user.M_ID+"&type=3")
									
									.success(function(data){
										console.log(data,"unlockindexctrl")
										if(data.length){
											for(var i=0;i<$scope.chapters.length;i++){
												for(var k=0;k<data.length;k++){
													if($scope.chapters[i].id==data[k].unlock){
														
														$scope.chapters[i].unlock=true;									
														if($scope.chapters[i+1]){


															$scope.chapters[i+1].delock=true;	
														}
													}
												}
											}

										}

									})//get ed;
								}else{
									setTimeout(function(){ getunlock()},50)
								}
						    }//fun ed;
						    getunlock()
						     $rootScope.$on('$stateChangeSuccess', 
							function(event, toState, toParams, fromState, fromParams){ 
								

									getunlock();
									 getPrecent();
							 })
						     $scope.sc={};
						     $scope.sc.t=0;
							 // 滚动动画
							 $scope.handelScroll=function(){
							 	var t=$ionicScrollDelegate.getScrollPosition().top;
							 	
							 	if(t<180&&t>0){
							 		  t=Math.abs(t);
							 		  $scope.$apply(function(){
							 		  	if(t>133){
							 		  	t=133;	
							 		  	}
							 		  	$scope.sc.t=t;
							 		  })
							 		  // console.log($scope.sc);
							 	}
							 }
						})

						$scope.changeState=function(item,index){
						
							$http.get($scope.host+"/start/permission.php?ptype=3&id="+item.id+"&typeid="+$scope.data.course.id+"&user="+$scope.data.user.M_ID)
							.success(function(data){
								if(data.status){
									// if(index==1){
									// 	if(!$scope.data.user.M_LoginTime){
									// 			alert("请先登陆");
									// 			$state.go("login",{});
									// 			return;
									// 	}
									// }
									$state.go("units",{"typeid":item.id,typename:item.typename});
								}else{
									$state.go("units",{"typeid":item.id,typename:item.typename});
									//alert(data.msg);
								}

							})
						}


					     
						

					}])
					.controller("unitsCtrl",["$scope","$state","$ionicHistory","$stateParams","$http","$getUser","$rootScope",function($scope,$state,$ionicHistory,$stateParams,$http,$getUser,$rootScope){
						$rootScope.$on('$stateChangeSuccess', 
							function(event, toState, toParams, fromState, fromParams){ 
									getunlock();
							 })
						// $scope.goback=function(){	
						// 	$state.go("main");
						//  }
						$scope.data=$getUser;
						$scope.typename=$stateParams.typename;
						$http.get($scope.host+"/start/get_units.php?tid="+$stateParams.typeid).success(function(data){
							$scope.units=data;
							if($scope.units[0]){
								$scope.units[0].delock=true;
							}
							
						})
						$scope.changeState=function(item){
						
							$http.get($scope.host+"/start/permission.php?ptype=2&id="+item.id+"&typeid="+$stateParams.typeid+"&user="+$scope.data.user.M_ID)
							.success(function(data){
								if(data.status){
									$state.go("home",{"typeid":item.typeid,"id":item.id,"unitname":item.title,"typename":$scope.typename});
								}else{
									$state.go("home",{"typeid":item.typeid,"id":item.id,"unitname":item.title,"typename":$scope.typename});
//									alert(data.msg);
								}

							})
							

						}

						//unlock
						function getunlock(){
					   
								if($scope.data.user.M_ID!=undefined){
									
									$http.get($scope.host+"/start/get_unlock.php?user="+$scope.data.user.M_ID+"&type=2")
									.success(function(data){
										console.log(data,"unitunlock");
										console.log($scope.units,"units");
										setTimeout(function(){
										if(data.length&&$scope.units&&$scope.units.length){
											for(var i=0;i<$scope.units.length;i++){
												for(var k=0;k<data.length;k++){
													if($scope.units[i].id==data[k].unlock){									
														$scope.units[i].unlock=true;									
														if($scope.units[i+1]){
															
															$scope.units[i+1].delock=true;	
														}
														console.log("hit");
														$scope.$apply();
													}
												}
											}

										}
									},10)//timeout;

									})//get ed;
								}else{
									setTimeout(function(){ getunlock()},50)
								}
						    }//fun ed;
						    getunlock()
						//unlock
						

					}])
					 // $scope.host="http://www.qikuedu.com:8000"
					
						.controller("homeCtrl",["$scope","$http","$ionicSlideBoxDelegate","$getUser","$state","$ionicPopover","$stateParams","$localData","$ionicHistory","$rootScope","$ionicScrollDelegate","$timeout","$rootScope","$ionicLoading","alertServer",function($scope,$http, $ionicSlideBoxDelegate,$getUser,$state,$ionicPopover,$stateParams,$localData,$ionicHistory,$rootScope,$ionicScrollDelegate,$timeout,$rootScope,$ionicLoading,alertServer){
							$scope.data=$getUser;
							$scope.data.get();
							$scope.unitname=$stateParams.unitname;
							$scope.current={}
							$scope.current.page=0;
							$scope.current.showAnswerSheet=false;
							$scope.current.testName=$stateParams.test_name;
							$scope.current.result=false;
							$scope.alertServer=alertServer;

						
							
							$scope.popover = $ionicPopover.fromTemplate('<ion-popover-view></ion-content><div class="list"><div class="item" ng-click="logout()">退出</div></div></ion-content></ion-popover-view>', {
					        scope: $scope
					         });


							$scope.logout=function(){
								window.localStorage.removeItem("uid")
								window.localStorage.removeItem("username")
								$scope.popover.hide()
								$state.go("login");
							}

							$scope.slideHasChanged=function(){
								$scope.current.showbar=false;
								$scope.current.page= $ionicSlideBoxDelegate.currentIndex()
								$http.get($scope.host+"/start/get_coments_count.php?aid="+$scope.questions[$scope.current.page].id)
								.success(function(data){
									$scope.questions[$scope.current.page].comentCount=data;
								})

							}

							$http.get($scope.host+"/start/getIT.php?id="+$stateParams.id)
								.then(function(data) {

					                //optionA  optionB optionC optionD 交换顺序

									 for(var i=0;i<data.data.length;i++) {
					                     var optionData = [];
					                     var temparr = []
					                     if (data.data[i].optiona) {
					                         temparr.push({op: data.data[i].optiona, answer: "A"})
					                     }
					                     if (data.data[i].optionb) {
					                         temparr.push({op: data.data[i].optionb, answer: "B"})
					                     }
					                     if (data.data[i].optionc) {
					                         temparr.push({op: data.data[i].optionc, answer: "C"})
					                     }
					                     if (data.data[i].optiond) {
					                         temparr.push({op: data.data[i].optiond, answer: "D"})
					                     }

					                     var len = temparr.length;
					                     for (var k = 0; k < len; k++) {
					                         if (temparr.length <= 1) {
					                             optionData.push(temparr[0]);
					                             break;
					                         } else {
					                             var num = Math.floor(Math.random() * temparr.length);

					                             optionData.push(temparr[num]);
					                             temparr.splice(num, 1)

					                         }
					                     }
					                     data.data[i].optionData = optionData;
					                     data.data[i].currentSelect = "";
					                     data.data[i].userAnswer=[];
					                     data.data[i].page=1;

					                     if (data.data[i].subtitle&&data.data[i].channel==30) {
					                     	if(data.data[i].subtitle.indexOf("pre")==-1&&data.data[i].subtitle.indexOf("brush")==-1){
		                     	 				data.data[i].subtitle = data.data[i].subtitle.replace(/[\r]/g, "<br/>");
		                     				}
					                     	var n =  data.data[i].subtitle.match(/\[space\]/g)||[];
//					                     	console.log(n);
					                     		var temp=data.data[i].answer.split(",");
					                     		data.data[i].blank_len=[];
					                     		console.log(data.data[i].blank_len);
					                     		for(var z=0;z<temp.length;z++){
					                     				data.data[i].blank_len.push(temp[z].length);
					                     		}


											for(var j=0; j<n.length;j++){
//												console.log( data.data[i]);
												 data.data[i].userAnswer[j]="";
//												 console.log( data.data[i]);
												 data.data[i].subtitle = data.data[i].subtitle.replace(/\[space\]/, "<input type='text' id='q_"+i+"_"+j+"' myinput style=\"width:"+data.data[i].blank_len[j]*14+"px\" ng-keyup=\"keyup(question,"+i+","+j+")\"  ng-model=\"question.userAnswer["+j+"]\" maxlength='"+data.data[i].blank_len[j]+"' size='"+data.data[i].blank_len[j]+"' />");
												
											}

					                     }
					                     if (data.data[i].subtitle&&data.data[i].channel==30&&data.data[i].type==5) {
					                     	
//					                     	if(data.data[i].subtitle.indexOf("<br /><br/>")){
//					                     		var temp=data.data[i].subtitle.split("<br /><br/>");
//					                     	}else if(data.data[i].subtitle.indexOf("<br />")){
//					                     		var temp=data.data[i].subtitle.split("<br />");
//					                     	}
//					                     	else if(data.data[i].subtitle.indexOf("/\r/g")){
//					                     		var temp=data.data[i].subtitle.split("/\r/g");
//					                     	}
//					                     	else{
//					                     		var temp=data.data[i].subtitle.split("<br/>");
//					                     	}
											if(data.data[i].subtitle.lastIndexOf(/\r\n/)){
												data.data[i].subtitle=data.data[i].subtitle.substr(0,data.data[i].subtitle.length-1);
											}
											if(data.data[i].subtitle.indexOf("brush")!=-1){
//												console.log(data.data[i].subtitle.substr(data.data[i].subtitle.length));
												console.log("hit pre")
												data.data[i].subtitle=data.data[i].subtitle.replace(/\r\n/g,"<br/>");
        										data.data[i].subtitle=data.data[i].subtitle.replace(/\n/g,"<br/>");  
        										console.log("org",data.data[i].subtitle);
					                     		var temp=data.data[i].subtitle.split("<br/>");
											}else if(data.data[i].subtitle.indexOf("<br")){
												console.log("hit <br");
												var temp=data.data[i].subtitle.split("<br/>");
											}
											else{
												data.data[i].subtitle=data.data[i].subtitle.replace(/\r\n/g,"<br/>");
        										data.data[i].subtitle=data.data[i].subtitle.replace(/\n/g,"<br/>");  
        										console.log("org",data.data[i].subtitle);
					                     		var temp=data.data[i].subtitle.split("<br/>");
											}
											
					                     
//					                     	console.log("org",data.data[i].subtitle);
//					                     	console.log("tem",temp);
					                     	data.data[i].lists=[];
					                     	for(var z=0;z<temp.length;z++){
//					                     				data.data[i].lists.push({text:"<pre class='brush:xml'>"+temp[z]+"</pre>",order:[z]});
					                     				data.data[i].lists.push({text:temp[z],order:[z]});
					                     				
					                     		}
//					                     	console.log("list",data.data[i].lists);
					                     }
					                     
					                 }
									 $scope.questions=data.data
									 $scope.questions[0].unlock=true;
									 $ionicSlideBoxDelegate.update()
									 $http.get($scope.host+"/start/get_coments_count.php?aid="+$scope.questions[0].id)
								.success(function(data){
									$scope.questions[0].comentCount=data;
					})

									 })
								//排序
				$scope.moveItem=function(item,from,to,question,$event){
//					console.log("event",$event.target);
					question.lists.splice(from,1);
					question.lists.splice(to,0,item);
					var userAnswer=[];
					 for(var i=0;i<question.lists.length;i++){
					 	 userAnswer.push(question.lists[i].order);
					 }
					
					 question.currentAnswer=userAnswer.toString();
//					 var sy=new SyntaxHighlighter();
//					 sy.config.tagName="span";
//					 sy.highlight();
//					 console.log("abc",abc);
					
//var brush = new SyntaxHighlighter.brushes.JScript(),
//	code = document.getElementById('input').innerHTML	
//	brush.init({ toolbar: false });
//	html = brush.getHtml(code);
//	document.write(html);
				}
							$scope.selectHd=function(question,op,answer,index){
								question.currentSelect=op;
								question.currentAnswer=answer

								

								return;

								/*$scope.current.showAnswerSheet=false;
								 $http.post($scope.host+"/start/questions/detail/"+$stateParams.test_id+"/",{
										"answer": answer,
									    "qe_id":question.qe_id,
									     "id":question.id
								 }).success(function(data){

								 })*/
								// if(question.type==1){
								// 	 $ionicSlideBoxDelegate.next()

								// }
							}
							$scope.selectMulHd=function(question,op,answer,index){

									if(question.currentSelect instanceof Array){
										if(question.currentSelect.indexOf(op)!=-1){
											var id=question.currentSelect.indexOf(op);
											question.currentSelect.splice(id,1);
											var  aid=question.currentAnswer.indexOf(answer);
											question.currentAnswer.splice(aid,1);

										}else{
											question.currentSelect.push(op)
											question.currentAnswer.push(answer)
										}
									}else{
										question.currentSelect=[];
										question.currentAnswer=[];
										question.currentSelect.push(op)
										question.currentAnswer.push(answer)
									}
							}

							$scope.mulHdNext=function(question){
								$scope.current.showAnswerSheet=false;

								$http.post($scope.host+"/questions/detail/"+$stateParams.test_id+"/",{
										"answer": question.currentAnswer.sort().toString().replace(/,/g,""),
									    "qe_id":question.qe_id,
									     "id":question.id
								 }).success(function(data){

								 })
								$ionicSlideBoxDelegate.next()
							}
							$scope.QaHdNext=function(question){
								$scope.current.showAnswerSheet=false;

								$http.post($scope.host+"/questions/detail/1/",{
										"answer": question.currentAnswer,
									    "qe_id":question.qe_id,
									     "id":question.id
								 }).success(function(data){

								 })
								$ionicSlideBoxDelegate.next()
							}

							$scope.QaHdNext=function(question){
								$scope.current.showAnswerSheet=false;


								$http.post($scope.host+"/questions/detail/1/",{
										"answer": question.currentAnswer,
									    "qe_id":question.qe_id,
									     "id":question.id
								 }).success(function(data){

								 })
								$ionicSlideBoxDelegate.next()
							}
							$scope.BlHdNext=function(question){
								
								 $http.post($scope.host+"/questions/detail/1/",{
								 		"answer": question.userAnswer.toString().replace(/（/g,"(").replace(/）/g,")").replace(/；/g,";").replace(/。/g,".").replace(/”/g,"\"").replace(/”/g,"\"").replace(/？/g,"?").replace(/：/g,":"),
								    	"qe_id":question.qe_id,
									     "id":question.id
								  }).success(function(data){

							 	 })
								 $ionicSlideBoxDelegate.next()
							}

							$scope.checkMulSelect=function(question,op){
								if(question.currentSelect.indexOf(op)!=-1){
									return true
								}else{
									return false
								}
							}
							$scope.slideTo=function(index,question){
								 //先检查 该篇文章里面的文章，如果该文章的前一篇没有在一用户解锁范围那么就需要解锁
								
								 // $ionicSlideBoxDelegate.slide(index)
								 // $scope.current.showAnswerSheet=false;
								 
								 if(index==0){
								 	$ionicSlideBoxDelegate.slide(0);
								 	return;
								 }
								
								 $http.get($scope.host+"/start/permission.php?ptype=1&id="+ $scope.questions[index-1].id+"&typeid=3&uid="+$stateParams.id+"&user="+$scope.data.user.M_ID)
							.success(function(data){
								if(data.status){
									$scope.mixQuestion($scope.questions[index]);
									// console.log($scope.questions[index]);
									$ionicScrollDelegate.scrollTo(0,0);
									$ionicSlideBoxDelegate.slide(index)
									$scope.current.showAnswerSheet=false;
									
								}else{
									// alert(data.msg);
								}

							})
							}
							$scope.mixQuestion=function(question){
								 // 混淆
								
								var temparr=question.optionData;
						 		var len =temparr.length;
						 		question.optionData=[];
							    for (var k = 0; k < len; k++) {
							         if (temparr.length <= 1) {
							             question.optionData.push(temparr[0]);
							             break;
							         } else {
							             var num = Math.floor(Math.random() * temparr.length);

							              question.optionData.push(temparr[num]);
							              temparr.splice(num, 1)

							         }
				     			}
					          // console.log(question);
								 // 混淆
							}
							$scope.submitTest=function(){
								$scope.current.result=true;
								for(var i=0;i<$scope.questions.length;i++){
									if(!$scope.questions[i].currentAnswer){
									window.alert("您的题目还没有答完毕");
									$scope.slideTo(i+1);
									break;
									}
								}

							}
							

							$scope.keyup=function(question,i,j){
								
								if(question.userAnswer[j].length>=question.blank_len[j]){
									var elem=document.getElementById("q_"+i+"_"+(j+1));
									if(elem){
										elem.focus();
									}
									
								}
							}
							$scope.preSlide=function(question){
								question.showErr=false;
								$scope.mixQuestion(question);
								$ionicSlideBoxDelegate.previous()
							}

					$scope.nextSlide=function(question){
								 
								 $http.post($scope.host+"/start/set_unlock.php",{
										"unlock":question.id,
										"user":$scope.data.user.M_ID,
										"type":1,			  

								 	}).success(function(data){


								 	})
								$ionicSlideBoxDelegate.next()
							}
					$scope.setCommetPage=function(num){

						$scope.questions[$scope.current.page].page=num;
						// console.log($scope.current.page,$scope.questions[$scope.current.page])
						$scope.getComents($scope.questions[$scope.current.page],1);
					}
					$scope.getComents=function(question,flag){
							   // console.log(question,"guaiguai ")
								$http.get($scope.host+"/plus/get_comments.php?dopost=getlist&page="+question.page+"&aid="+question.id)
								.success(function(da){
									// alert(da);
										
										// $scope.$apply(function(){
											question.coments=da;
											if(flag){
												$ionicScrollDelegate.$getByHandle("ques").scrollTo(0,0);
											}
										// })
								})
								$scope.current.showbar=true;
					}
					$scope.checkAnswer=function(question){
						//"answer": question.userAnswer.toString().replace(/（/g,"(").replace(/）/g,")").replace(/；/g,";").replace(/。/g,".").replace(/”/g,"\"").replace(/”/g,"\"").replace(/？/g,"?").replace(/：/g,":"),
//						 console.log("an",question.answer,question.currentAnswer);
						if (question.answer==question.currentAnswer||question.answer==question.userAnswer.toString().replace(/（/g,"(").replace(/）/g,")").replace(/；/g,";").replace(/。/g,".").replace(/”/g,"\"").replace(/”/g,"\"").replace(/？/g,"?").replace(/：/g,":")) {
							
							$http.post($scope.host+"/start/set_unlock.php",{
										"unlock":question.id,
										"user":$scope.data.user.M_ID,
										"type":1,
										"add":2,			  

								 	}).success(function(data){

								 		question.showErr=false;
								 		question.unlock=true;			 		
					                    $scope.alertServer.setMsg("+2");

								 	})
							var index=$scope.questions.indexOf(question);
							if($scope.questions[index+1]){
								$scope.questions[index+1].unlock=true;

							}


							if(index==$scope.questions.length-1){
								// alert("最后一个");
								$http.post($scope.host+"/start/set_unlock.php",{
										"unlock":$stateParams.id,
										"user":$scope.data.user.M_ID,
										"type":2,
										"typeid":$stateParams.typeid,			  

								 	}).success(function(data){
								 			if(data.chapter){
								 					$state.go("main",{"course":$rootScope.data.course.id})
								 					
								 					
								 			}else{
								 				
								 				$state.go("units",{"typeid":$stateParams.typeid,typename:$stateParams.typename});
					                           
								 			}
								 			$scope.data.get();

								 	})
								 	
								 	

							}else{

							
							
							$http.post($scope.host+"/start/set_unlock.php",{
										"unlock":$scope.questions[index+1].id,
										"user":$scope.data.user.M_ID,
										"type":1,			  

								 	}).success(function(data){


								 	})
						    }
						   

							$timeout(function(){
								$ionicScrollDelegate.scrollTo(0,0);
								$ionicSlideBoxDelegate.next()	
							},1000)
							

							}else{
									question.showErr=true;
						}
					}
					$scope.testAgain=function(question){
						question.showErr=false;
						question.currentAnswer="";
						question.currentSelect=null;
					     var temparr=question.optionData;
						 var len =temparr.length;
						 question.optionData=[];
					     for (var k = 0; k < len; k++) {
					         if (temparr.length <= 1) {
					             question.optionData.push(temparr[0]);
					             break;
					         } else {
					             var num = Math.floor(Math.random() * temparr.length);

					              question.optionData.push(temparr[num]);
					             temparr.splice(num, 1)

					         }
					     }
					                     

					}

					$scope.zan=function($event,good,id,fid){
					console.log((new Date().getTime()-$localData.fetchData("good"+fid+id)),1000*60)
						if((new Date().getTime()-$localData.fetchData("good"+fid+id))>1000*60||$localData.fetchData("good"+fid+id).length==0){
							$http.get($scope.host+"/plus/zan.php?action=goodfb&aid="+id+"&fid="+fid).success(function(data){
							
							$($event.target).parent().html(data+' <img src="./images/zan.png" width="20" vertical-align="middle" alt="">');
							$localData.saveData("good"+fid+id,new Date().getTime());
							})
					 	}else{
					 			alert("您刚刚赞过");
					 		}
					 				 	

					}
					$scope.comment=function(){
						// $scope.data.get();
						var str=$scope.data.user.M_UserName;
						if(str){
							if(str.substring(0,3)=="未登录"){
							alert("请先登陆");
							$state.go("login");
							return;
							}else{
								
							}
						}else{
							alert("请先登陆");
							$state.go("login");
							return;
						}
						
						if($scope.current.msg.length<2){ alert("评论不得少于两个字")}
							$http.post($scope.host+"/plus/feedback_ajax2.php",{
										"dopost":'send',
										"aid":$scope.questions[$scope.current.page].id,
										"user":$scope.data.user.M_ID,
										"fid":0,
										"face":6,
										"feedbacktype":"feedback",
										"msg":$scope.current.msg			  

								 	}).success(function(data){

								 		if(data.status==0){
								 			alert(data.msg);
								 		}else{
								 			$scope.current.msg="";
								 			$scope.questions[$scope.current.page].comentCount++;
								 			$http.get($scope.host+"/plus/get_comments.php?dopost=getlist&page=1&aid="+$scope.questions[$scope.current.page].id)
											.success(function(data){
													$scope.questions[$scope.current.page].coments=data;
													
													// $scope.questions[$scope.current.page].coments=data;
													
											})
								 		}
								 			

								 	})
					}

					//unlock
						
						function getunlock(){

								if($scope.data.user.M_ID!=undefined){
									
									$http.get($scope.host+"/get_unlock.php?user="+$scope.data.user.M_ID+"&type=1")
									.success(function(data){
										console.log(data,"getunlock,homectrl")
										if(data.length&&$scope.questions&&$scope.questions.length){
											for(var i=0;i<$scope.questions.length;i++){
												for(var k=0;k<data.length;k++){
													if($scope.questions[i].id==data[k].unlock){									
														$scope.questions[i].unlock=true;									
														if($scope.questions[i+1]){
															$scope.questions[i+1].unlock=true;	
														}
													}
												}
											}

										}

									})//get ed;
								}else{
									setTimeout(function(){ getunlock()},50)
								}
						    }//fun ed;
						    getunlock()

						    $scope.$on("update",function($event,data){

						    	getunlock();
						    })
						//unlock
						
						$scope.unlockQuestion=function(question){
							var str=$scope.data.user.M_UserName;
							if(str){
								if(str.substring(0,3)=="未登录"){
									var comfirm=window.confirm("登陆用户才能解锁\n现在去登陆");
									if(comfirm){$state.go("login");	}				
									return;
								}
							}else{
								var comfirm=window.confirm("登陆用户才能解锁\n现在去登陆");
								if(comfirm){$state.go("login");}			
								return;
							}

							var confirm = window.confirm("解锁需要消耗10个积分\n您当前有"+$scope.data.user.M_Scores+"积分")
					        
					        if(confirm&&$scope.data.user.M_Scores>=10){
					        	

								$http.post($scope.host+"/set_unlock.php",{
										"unlock":question.id,
										"user":$scope.data.user.M_ID,
										"type":1,
										"reduce":10,			  

								 	}).success(function(data){
								 		question.showAnswer=true;
								 		question.showErr=false;
								 		question.unlock=true;
								 		var arr=question.answer.split(",");
								    	for(var i=0;i<arr.length;i++){
									    		question.userAnswer[i]=arr[i];
									    }
									    $scope.data.user.M_Scores-=10;
									    // otherCheck
									    var index=$scope.questions.indexOf(question);
										if($scope.questions[index+1]){
											$scope.questions[index+1].unlock=true;
											var time=1500;
											if(question.type!=1){
												time=2100;
											}
											$timeout(function(){
									 			for(var i=0;i<arr.length;i++){
										    		question.userAnswer[i]="";
										    	}				 	
									 			question.showAnswer=false;			 	
									 			$ionicSlideBoxDelegate.next();
											},time)
										}



								if(index==$scope.questions.length-1){						
									$http.post($scope.host+"/set_unlock.php",{
										"unlock":$stateParams.id,
										"user":$scope.data.user.M_ID,
										"type":2,
										"typeid":$stateParams.typeid,			  

									})
									.success(function(data){
							 			if(data.chapter){
							 					$state.go("main",{"course":$rootScope.data.course.id})
							 			}else{
							 				$state.go("units",{"typeid":$stateParams.typeid,typename:$stateParams.typename});  
							 			}
							 			$scope.data.get();
									})
									 	
								}//如果是最后一个
								// otherCheck		 		
							})//success结束	
								
					        }else{
					        	alert("积分不够");
					        }
					      // confirm ed

								

							

						}
					    // 解锁
					    $scope.getAnswer=function(q,item){
					    	

					    	var arr=q.answer.split(",");
					    	for(var i=0;i<arr.length;i++){
					    		if(arr[i]==item.answer){
					    			// alert("show");
					    			return "answer";
					    		}
					    	}
					    }
					    
						}])

						.controller("loginCtrl",["$scope","$http","$state","$ionicHistory","$getUser","$localData","$rootScope",function($scope,$http,$state,$ionicHistory,$getUser,$localData,$rootScope){
							 $scope.goState=function(name,params){
							
									$state.go(name,params);
							}
							    $scope.islogin=true
								$scope.login={username:"",password:"",help:""};
								$scope.loginHd=function(){
									$scope.islogin=false
									$scope.login.help="";
									if($scope.login.username==""||$scope.login.password==""){
										$scope.login.help="用户名和密码不能为空!"
										return
									}
									$http.post($scope.host+"/member/index_login.php",{
										"fmdo":"login",
										"dopost":"login",
										"userid":$scope.login.username,
									    "pwd":$scope.login.password,
									    "oldid":$localData.fetchData("user").substring(12,18)

								 	}).success(function(data){
								 		
					                    // localstorage.removeItem("user");
										if(data.status){
											$scope.islogin=true;						
											$getUser.get();
											console.log($getUser);
												// alert("成功，即将跳转")
											// userFactory.user=data.user;
											// window.localStorage.setItem("uid",data.user.id);
											// window.localStorage.setItem("username",data.user.username);
										$scope.login.help=data.msg;
											
										$scope.userData.getUser();//获取登陆信息

										$scope.goback();
										}else{
											$scope.islogin=true;
											$scope.login.help=data.msg;
										}
									 })
										.error(function(err){
											$scope.islogin=true;
											$scope.login.help=err;
										})

								}

						}])
					.controller("regCtrl",["$scope","$http","$state","$ionicHistory","$getUser","$localData","$rootScope",function($scope,$http,$state,$ionicHistory,$getUser,$localData,$rootScope){
							 $scope.data=$getUser;
							 $scope.data.get();
							 $scope.goState=function(name,params){				 
								$state.go(name,params);
							 }
							 $scope.reg={};
								$scope.isreg=true;
								$scope.regHd=function(){
								
									$scope.reg.help="";
									if($scope.reg.username==""||$scope.reg.password==""||$scope.reg.email==""){
										$scope.login.help="邮箱或用户名和密码不能为空!"
										return
									}
									var oldid=$localData.fetchData("user");
									console.log(oldid);
									if(oldid[0]){
										oldid=oldid[0].substring(12,18)
									}else{
										oldid="";
									}
									$http.post($scope.host+"/member/reg_new2.php",{
										"userid":$scope.reg.username,
										"userpwd":$scope.reg.password,
										"email":$scope.reg.email,
										"oldid":oldid
									   

								 	}).success(function(data){
								 		

										if(data.status){
																	
											$getUser.get();
											
												// alert("成功，即将跳转")
											// userFactory.user=data.user;
											// window.localStorage.setItem("uid",data.user.id);
											// window.localStorage.setItem("username",data.user.username);
											$scope.reg.help=data.msg;
											// $scope.goback();
											// if($ionicHistory.backView()){
											// 	$ionicHistory.goBack()
												
											// }else{
											// 	$state.go("main")
											// }
											// window.history.back();
											if($rootScope.data.course){
													// console.log($rootScope.data.course);
													$state.go("main",{course:$rootScope.data.course.id})
												}else{
													$state.go("main",{course:2})
												}
											}else{
												$scope.isreg=true;
												$scope.reg.help=data.msg;
											}
									 })
										.error(function(err){
											$scope.isreg=true;
											$scope.reg.help=err;
										})

								}
						}])
					
					
					   .controller("listCtrl",["$scope","$http",function($scope,$http){
					        $http.get($scope.host+"/questions/testlist/")
								.then(function(data) {
								    $scope.testlist=data.data;
								    
					            })
					    }])
					   .controller("bookCtrl",["$scope","$http",function($scope,$http){
stop_browser_behavior: false
  
self.touchStart = function(e) {
  self.startCoordinates = getPointerCoordinates(e);

  if ( ionic.tap.ignoreScrollStart(e) ) {
    return;
  }

  if( ionic.tap.containsOrIsTextInput(e.target) ) {
    // do not start if the target is a text input
    // if there is a touchmove on this input, then we can start the scroll
    self.__hasStarted = false;
    return;
  }

  self.__isSelectable = true;
  self.__enableScrollY = true;
  self.__hasStarted = true;
  self.doTouchStart(e.touches, e.timeStamp);
  // e.preventDefault();
};
					    }])

  .controller("tutorialCtrl",["$scope","$http","$stateParams",function($scope,$http,$stateParams){
  	$scope.typeid=$stateParams.typeid;
   $scope.name="mumu";
$http.get("/start/get_tutorial_list.php?typeid="+$scope.typeid)
.success(function(data){
	
	$scope.tutorList=data;
	console.log($scope.tutorList);
	
})
	
//stop_browser_behavior: false
//
//self.touchStart = function(e) {
//self.startCoordinates = getPointerCoordinates(e);
//
//if ( ionic.tap.ignoreScrollStart(e) ) {
//  return;
//}
//
//if( ionic.tap.containsOrIsTextInput(e.target) ) {
//  // do not start if the target is a text input
//  // if there is a touchmove on this input, then we can start the scroll
//  self.__hasStarted = false;
//  return;
//}
//
//self.__isSelectable = true;
//self.__enableScrollY = true;
//self.__hasStarted = true;
//self.doTouchStart(e.touches, e.timeStamp);
//// e.preventDefault();
//};
				    }])
					
									

					


