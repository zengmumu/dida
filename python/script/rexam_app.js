var examApp=angular.module("examApp",["ionic"])
.controller("mainCtrl",["$scope","$state","$ionicHistory","$stateParams","$http",function($scope,$state,$ionicHistory,$stateParams,$http){
$scope.goBack=function(){
    $ionicHistory.goBack();
}
$scope.host="http://www.qikuedu.com:8000";
}])
.config(function($ionicConfigProvider,$urlRouterProvider,$stateProvider){
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('standard');
	//状态服务
	$stateProvider
	//配置一个状态
	.state("home",{
		url:"/home/:classes_id/:add_time/:classes_name/:len",
		templateUrl:"./templates/exam/rhome.html"
	})
    .state("resultList",{
		url:"/resultlist",
		templateUrl:"./templates/exam/resultlist.html"
	})

	//地址栏路由服务
	$urlRouterProvider
	//将地址栏重定向到/tab
	.otherwise('/resultlist')

})
	.controller("homeCtrl",["$scope","$http","$ionicSlideBoxDelegate","$stateParams",function($scope,$http, $ionicSlideBoxDelegate,$stateParams){
		$scope.current={}
		$scope.current.page=0;
		$scope.current.showAnswerSheet=false;
		$scope.current.classes_name=$stateParams.classes_name;
		$scope.current.add_time=$stateParams.add_time
        $scope.current.len=$stateParams.len

		$http.get($scope.host+"/questions/result/1/?classes_id="+$stateParams.classes_id+"&add_time="+$stateParams.add_time)
			.then(function(data) {
                for (var i = 0; i < data.data.length; i++) {
                    var optionData = [];
                    var temparr = []
                    if (data.data[i].optionA) {
                        temparr.push({op: data.data[i].optionA, answer: "A"})
                    }
                    if (data.data[i].optionB) {
                        temparr.push({op: data.data[i].optionB, answer: "B"})
                    }
                    if (data.data[i].optionC) {
                        temparr.push({op: data.data[i].optionC, answer: "C"})
                    }
                    if (data.data[i].optionD) {
                        temparr.push({op: data.data[i].optionD, answer: "D"})
                    }


                    if( data.data[i].type==1){
                         data.data[i].users.userA = JSON.parse(data.data[i].users.userA )
					    data.data[i].users.userB = JSON.parse(data.data[i].users.userB )
					    data.data[i].users.userC = JSON.parse(data.data[i].users.userC )
					    data.data[i].users.userD = JSON.parse(data.data[i].users.userD )

                    }


                    data.data[i].optionData = temparr;
                    data.data[i].currentSelect = "";
                }
                $scope.questions = data.data
				console.log( $scope.questions )
            })
	}])

    .controller("listCtrl",["$scope","$http",function($scope,$http){

        $http.get($scope.host+"/questions/relist/1/")
			.then(function(data) {
			    $scope.resultlist=data.data;
            })
    }])
	


