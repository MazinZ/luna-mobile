angular.module(app_name).controller('LoginController', ['user_service', '$scope', '$state', '$ionicLoading' ,
    function(user_service, $scope, $state, $ionicLoading){
    
     // TODO: Check if user is
     // 1. Signed in and completed onboarding.
     // 2. Signed in but has not completed onboarding.
    $scope.user = {"username": '', "password": '' }

    if (user_service.is_signed_in()) {
        $state.go('main_onboard');
      }
    $scope.sign_in = function() {
      user_service.sign_in({
          "username" : $scope.user.username, 
          "password" : $scope.user.password
        })
    }

}]);