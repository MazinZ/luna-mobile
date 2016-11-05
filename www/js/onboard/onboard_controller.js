angular.module(app_name)
  .controller('OnboardController', ['$scope', '$ionicSlideBoxDelegate', '$timeout', 'firebase_service', 
    function($scope, $ionicSlideBoxDelegate, $timeout, firebase_serivce){
    
    var user = {
        "test" : 1
    }

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
            $scope.inprogress = false;
            $scope.finished = true;
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
        firebase_serivce.register(user);
       }

    }
    $scope.previousSlide = function(){
      $scope.slider.slidePrevious();
    }
}]);