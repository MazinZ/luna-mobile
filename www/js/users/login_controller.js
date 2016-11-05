angular.module(app_name).controller('LoginController', ['user_service', '$scope', function(user_service, $scope){
    
     // TODO: Check if user is
     // 1. Signed in and completed onboarding.
     // 2. Signed in but has not completed onboarding.
    if (user_service.is_signed_in()) {
        $location.url('/');
      }

    $scope.sign_in = function() {
      user_service.sign_in({
          "uid" : $scope.uid, 
          "password" : $scope.password
        });
    }

}]);