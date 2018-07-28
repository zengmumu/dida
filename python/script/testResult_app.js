var examApp=angular.module("examApp",["ionic"])
.controller("mainCtrl",["$scope","$state","$ionicHistory","$stateParams","$http",function($scope,$state,$ionicHistory,$stateParams,$http){
$scope.goBack=function(){
    $ionicHistory.goBack();
}
$scope.host="http://127.0.0.1:8000"
// $scope.host="http://www.qikuedu.com:8000"

}])
.config(function($ionicConfigProvider,$urlRouterProvider,$stateProvider){
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('standard');
	//状态服务
	$stateProvider
	//配置一个状态
	.state("home",{
		url:"/home/:classes_id/:add_time/:classes_name/:len/:id/:user_id/:user_name",
		templateUrl:"./templates/exam/studentResult.html"
	})
    .state("resultClassList",{
		url:"/resultClassList/:id",
		templateUrl:"./templates/exam/resultClasslist.html"
	})
	 .state("resultUser",{
		url:"/resultUser/:classes_id/:add_time/:classes_name/:len/:id",
		templateUrl:"./templates/exam/resultUserlist.html"
	})
     .state("resultTest",{
		url:"/resultTest",
		templateUrl:"./templates/exam/resulttest.html"
	})

	//地址栏路由服务
	$urlRouterProvider
	//将地址栏重定向到/tab
	.otherwise('/resultTest')

})
	.controller("homeCtrl",["$scope","$http","$ionicSlideBoxDelegate","$stateParams",function($scope,$http, $ionicSlideBoxDelegate,$stateParams){
		$scope.current={}
		$scope.current.page=0;
		$scope.current.showAnswerSheet=false;
		$scope.current.classes_name=$stateParams.classes_name;
		$scope.current.add_time=$stateParams.add_time
        $scope.current.len=$stateParams.len
		$scope.current.id=$stateParams.id;
		$scope.current.user_name=$stateParams.user_name;
		$scope.current.score=0;

		$http.get($scope.host+"/questions/TestStudenResult/"+$stateParams.id+"/?user_id="+$stateParams.user_id+"&add_time="+$stateParams.add_time)
			.then(function(data2) {
				var data={};

				// data.data=null;
				data.data=data2.data.datas;
				$scope.current.score=data2.data.score;
				console.log(data2.data.datas);
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


                    // if( data.data[i].type==1){
                    //      data.data[i].users.userA = JSON.parse(data.data[i].users.userA )
					 //    data.data[i].users.userB = JSON.parse(data.data[i].users.userB )
					 //    data.data[i].users.userC = JSON.parse(data.data[i].users.userC )
					 //    data.data[i].users.userD = JSON.parse(data.data[i].users.userD )
                    //
                    // }


                    data.data[i].optionData = temparr;
                    data.data[i].currentSelect = "";
                }
                $scope.questions = data.data
				console.log( $scope.questions )
            })
		$scope.checkRight=function(index,str){
			var arr=str.split("");

			var s="";
			if(index==0){
				s="A"
			}
			if(index==1){
				s="B"
			}
			if(index==2){
				s="C"
			}
			if(index==3){
				s="D"
			}
			for(var k=0;k<arr.length;k++){
				if(s==str[k]){
					return true;
				}
			}
		}
		$scope.checkuRight=function(index,str,an){
			var arr=str.split("");
			var anArr=an.split("");

			var s="";
			if(index==0){
				s="A"
			}
			if(index==1){
				s="B"
			}
			if(index==2){
				s="C"
			}
			if(index==3){
				s="D"
			}
			for(var k=0;k<arr.length;k++){
				if(s==str[k]){
					for(var z=0;z<anArr.length;z++){
						if(str[k]==anArr[z]){
							return true;
						}
					}


				}
			}
		}

		$scope.checkuErr=function(index,str,an,t){
			var arr=str.split("");
			var anArr=an.split("");

			var s="";
			if(index==0){
				s="A"
			}
			if(index==1){
				s="B"
			}
			if(index==2){
				s="C"
			}
			if(index==3){
				s="D"
			}

			for(var k=0;k<anArr.length;k++){
				if(s==anArr[k]&&t==2){

                       for(var z=0;z<arr.length;z++){
                       	console.log(s,arr[z]);
						if(s==arr[z]){
							return false;
						}else{
							return true;
						}
					}

				}
				if(s==anArr[k]&&t==1){
					  for(var z=0;z<arr.length;z++){
						if(anArr[k]!=arr[z]){
							return true;
						}
					  }

				}
			}
		}
	}])

    .controller("resultClassListCtrl",["$scope","$http","$stateParams",function($scope,$http,$stateParams){

        $http.get($scope.host+"/questions/relist/"+$stateParams.id+"/")
			.then(function(data) {
			    $scope.resultlist=data.data;
			    $scope.resultlist.id=$stateParams.id;
			    console.log($scope.resultlist)
            })
    }])


 .controller("listTestCtrl",["$scope","$http",function($scope,$http){
        $http.get($scope.host+"/questions/testlist/")
			.then(function(data) {
			    $scope.testlist=data.data;
			    // console.log(  $scope.testlist);
            })
    }])
  .controller("listUserCtrl",["$scope","$http","$stateParams",function($scope,$http,$stateParams){
        $http.get($scope.host+"/questions/testClassStudentList/"+$stateParams.id+"/?classes_id="+$stateParams.classes_id+"&add_time="+$stateParams.add_time)
			.then(function(data) {
			    $scope.resultlist=data.data;
			    $scope.resultlist.id=$stateParams.id;
			     $scope.resultlist.classes_id=$stateParams.classes_id;
			     $scope.resultlist.add_time=$stateParams.add_time;
			      $scope.resultlist.classes_name=$stateParams.classes_name;
			       $scope.resultlist.len=$stateParams.len;

			    console.log(  $scope.resultlist)
            })
    }])
	


