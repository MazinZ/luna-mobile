angular.module(app_name)
  .controller('OnboardController', ['$scope', '$ionicSlideBoxDelegate', '$timeout', 'user_service', 'firebase_service',
    function($scope, $ionicSlideBoxDelegate, $timeout, user_service, firebase_service){
    
    function init(user){
      $timeout(function() {
        $scope.uid = user.username;
      }); 
    }

    $scope.$on('USER_SET', function(event, user){
      console.log(user);
      init(user);
    });

    /*                Slider stuff                    */
    $scope.options = {
        onlyExternal: true // Disable user swiping
    }

    $scope.inprogress = true;

    $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
      $scope.slider = data.slider;
    });

    $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
        // Slide change is starting
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
      $scope.activeIndex = data.slider.activeIndex;
      $scope.previousIndex = data.slider.previousIndex;
        if ($scope.activeIndex >= 2) {
            $timeout(function(){
              $scope.inprogress = false;
              $scope.finished = true;
            });
        }
        else {
            $scope.inprogress = true;
            $scope.finished = false;  
        }
    });

    $scope.nextSlide = function(){
      if (!$scope.finished){
        $scope.slider.slideNext();
        }
      else{
        console.log($scope.userinfo);
        firebase_service.onboard($scope.userinfo);
       }

    }
    $scope.previousSlide = function(){
      $scope.slider.slidePrevious();
    }

    /*             End slider stuff                 */

    $scope.userinfo = {};

    // Relationship status.
    $scope.userinfo.relationship = -1;

}]);