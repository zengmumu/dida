app.factory("$userData",["$http",function($http){
	return {
		getUser:function(callback){
			var that = this;
			$http.get("http://127.0.0.1/member/ajax_login.php")
			.success(function(data){
				that.user = data;
				if(callback){callback()}//如果存在回掉函数就执行回掉函数
			})
		},
		user:{}
	}
}])
.factory("userFactory",function(){
							return{
								user:null,
								gerUser:function(){return this.user}
							}
						})
.factory("$localData",function(){
	return {
		fetchData:function(name){ return JSON.parse(window.localStorage.getItem(name)||"[]") },
		saveData:function(name,data){
			window.localStorage.setItem(name,JSON.stringify(data));
		}
	}
})
.config(['$httpProvider', function($httpProvider) {
					    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
					    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
					}])
.filter(
					    'to_trusted', ['$sce', function ($sce) {
					        return function (text) {
					            return $sce.trustAsHtml(text);
					        }
					    }]
					)
 .directive("dyCompile", ["$compile","$parse", function($compile,$parse) {

    return {
        replace: true,
        restrict: 'ECMA',
        scope:true,
        link: function(scope, element, attr) {
        	scope.$watch(attr.content, function() {

      element.html($parse(attr.content)(scope));
      $compile(element.contents())(scope);
    }, true);



        }
    };
}])
 .directive("shBlock",[function(){
 	return{
 		restrict:"ECMA",
 		link: function(scope, element, attr) {
 		
 			window.setTimeout(function(){
 			 SyntaxHighlighter.highlight();	
 			 },50)
 		

 			
 		}
 	}
 }])
 .factory("$getUser",function($http,$state,$localData){
 		return{
 			get:function(){
 				var that=this;
 				var host="http://127.0.0.1";
 				 $http.get(host+"/member/ajax_login.php")
					.success(function(data){							
						if(!data.M_ID){
							if($localData.fetchData("user").length<=0){								
								that.user.M_UserName="未登录用户";
								that.user.M_UserName+=new Date().getTime();	
								$localData.saveData("user",that.user.M_UserName);														
								that.user.M_ID=that.user.M_UserName.substring(5,18);					
															
							}else{
								that.user.M_UserName=$localData.fetchData("user");
								that.user.M_ID=that.user.M_UserName.substring(5,18);
								console.log(that.user.M_ID);
							}
														

						}else{
							that.user=data;
							var temp = $localData.fetchData("user");
							if(temp){that.user.oldid=temp}
//							localStorage.removeItem('user');
						}
						
					})
				},
			user:{},
			course:null,
			courseList:null,
			out:function(){
				var that=this;
				var host="http://127.0.0.1";
				$http.post(host+"/member/index_login.php",{					
				"dopost":"exit",					

		 		})
				.success(function(data){
					if(data.status){
						that.user={};							
						that.user.M_ID="";						
						that.get();
						$state.go("login");
					}
				})
			}
 		}
 })
 .config(function($httpProvider){
       $httpProvider.defaults.transformRequest=function(obj){
           var str=[];
          for(var p in obj){
               str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
           }
           return str.join("&");
       };
     $httpProvider.defaults.withCredentials=true;
// 服务端允许跨域  但是本地cookie不会被发送过去，这句话的意思是 发生数据并带cookie（跨域）
  
					  $httpProvider.defaults.headers.post={
					      'Content-Type':'application/x-www-form-urlencoded'
	  }

      $httpProvider.interceptors.push(function ($rootScope, $injector) {
  return {
    request: function (config) {
    	// console.log($rootScope);
//  	console.log(config,config.url);
      if (config.url.indexOf('get_units.php')!=-1||config.url.indexOf('getIT.php')!=-1||config.url.indexOf('get_course.php')!=-1||config.url.indexOf('get_chapters.php')!=-1) {
        $injector.get('$ionicLoading').show({
          template: '<div class="text-center"><ion-spinner class="spinner-positive" icon="spiral"></ion-spinner><br/>拼命加载中</div>'
        });
      }

      return config;
    },
    response: function (response) {
      if (true) {
        $injector.get('$ionicLoading').hide();
      }
      return response;
    }
  }
});
      
  })
 .directive("alert",[function(){
		return {
			restrict:"EA",
			template:
				'<div class="alert slide-in-up" ng-show="msg">{{msg}}</div>',
			link:function(scope,elem,attr){
				scope.hideAlert=function(){
					scope.msg=null;
					
				}
				
				
			},
			scope:{msg:"="}
		}
	}])
	.factory("alertServer",["$timeout",function($timeout){
		
	return {
		msg:"",
		type:"",
		setMsg:function(msg){
			this.msg=msg;
			// this.type=type;
			var _self=this;
			$timeout(function(){

				_self.msg=null;
				// alert(_self.msg);
				// _self.type=null;
			},600)
		}
	}
}])
	.config(function($ionicConfigProvider,$urlRouterProvider,$stateProvider){
						$ionicConfigProvider.platform.android.tabs.style('standard');
						$ionicConfigProvider.platform.android.tabs.position('standard');
						//状态服务
						$stateProvider
						//配置一个状态
						// .state("home",{
						// 	url:"/home/:test_id/:test_name",
						// 	templateUrl:"./templates/exam/home.html"
						// })
						.state("home",{
							url:"/home/:typeid/:id/:unitname/:typename",
							templateUrl:"./templates/exam/home.html",
							
						})
						.state("units",{
							url:"/units/:typeid/:typename",
							templateUrl:"./templates/exam/units.html"
						})						
						.state("login",{
							url:"/login",
							templateUrl:"./templates/exam/login.html"
						})
						.state("reg",{
							url:"/reg",
							templateUrl:"./templates/exam/register.html"
						})
						.state("main",{
							url:"/main/:course",
							templateUrl:"./templates/exam/main.html",
							
						})

						//地址栏路由服务
						$urlRouterProvider
						//将地址栏重定向到/tab
						.otherwise('/main/2')

					})
