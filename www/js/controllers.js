angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, StudentLogin, $state, $localstorage) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/modals/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };


  var reg_id="";
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
	  
	StudentLogin.loginUser($scope.loginData.username,$scope.loginData.password,reg_id,$scope.loginData.course)
	.success(function(response){
    $localstorage.set('isLoggedIn', 'true')
    $localstorage.setObject('user', response.student);
	})
	.error(function(err){
    $localstorage.set('isLoggedIn', 'false')
		var alertPopup = $ionicPopup.alert({
			title:'Login Failed',
			template: 'Please check your credentials'
		});
	});
	
  };
})

.controller('UpdatesCtrl', function($scope, NciUpdates) {	
  var list = NciUpdates.all();

    $scope.nlist = list;
    $scope.doNewsRefresh = function(){
      $scope.nlist = NciUpdates.all();
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$apply()
    }
})

.controller('HeadlineCtrl', function($scope, $stateParams, NciUpdates) {
  $scope.update = NciUpdates.get($stateParams.updatesId);
})

.controller('ServiceCtrl', function($scope, $cordovaSQLite, $ionicModal) {
  $scope.serviceData = {};
  var serList = [
  {
    id:1, student_id:'x08424179',
    title:'Help with login', body:'i cannot log in to the college machine, can i get some assistance?.',
    date: 'November, 20', status:'pending'
  },
  {
    id:2, student_id:'x08424179',
    title:'Account Blocked', body:'I have recieved a message saying that my account is blocked. Can you reactivate my account?.',
    date: 'November, 10', status:'pending'
  }];

  $scope.serviceList = serList;

  $ionicModal.fromTemplateUrl('templates/modals/service_modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.newTicket = function(student_id, title, body){
    var query = "INSERT INTO ticket(student_id, title, body, status, date) VALUES(?,?,?,?,?)";
    $cordovaSQLite.execute(db, query, [$scope.serviceData.student_id, 
                                       $scope.serviceData.title, 
                                       $scope.serviceData.body, 
                                       "pending", 
                                       new date()])
    .then(function(res) {
        console.log("INSERT ID -> " + res.insertId);
      }, function (err) {
        console.error(err);
    });
  }

  $scope.doRefresh = function(){
    $scope.serviceList = serList;
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
  }

});
