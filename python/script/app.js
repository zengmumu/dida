var examApp=angular.module("exam",["ionic"], function ($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|data):/);

})
			.controller("mainCtrl",["$scope","$state","$ionicHistory","$stateParams","$http",function($scope,$state,$ionicHistory,$stateParams,$http){

			}])
			.config(function($ionicConfigProvider,$urlRouterProvider,$stateProvider){
				$ionicConfigProvider.platform.android.tabs.style('standard');  
				$ionicConfigProvider.platform.android.tabs.position('standard');  
				//状态服务
				$stateProvider
				//配置一个状态				
				.state("home",{
					url:"/home",
					templateUrl:"templates/login.html"
				})

				//地址栏路由服务
				$urlRouterProvider
				//将地址栏重定向到/tab
				.otherwise('/home')
				
			})
	


