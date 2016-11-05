// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app_name = "luna-ionic";
angular.module(app_name, ['ionic','angular-loading-bar', 'ui.router','ngAnimate'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

angular.module(app_name)
  .service('firebase_service', ['$http', function($http){
    var self = this;

    self.register = function(user){
      $http({
         method: 'POST',
         url: 'https://luna-c2c2f.firebaseio.com/Users.json'
        })
        .then(function(data){
            console.log("worked")
        }, function(data){
            console.log(data);
        });
    }

}]);

angular.module(app_name)
.factory("authInterceptor", ['$q', '$window', function ($q, $window) {
  return {
   'request': function(config) {
        if ($window.localStorage.token) config.headers['Authorization'] = 'Token ' + $window.localStorage.token;
        return config;
    },


    'response': function(response) {
        return response;
    }
  };
}]);

angular.module(app_name)
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});


angular.module(app_name)
  .config(['$stateProvider', '$urlRouterProvider', 
        function($stateProvider, $urlRouterProvider) {
        
  
  var content = 'ion-content@';
 
  $urlRouterProvider.otherwise('/');
  $stateProvider

   /* .state('form', {
        template: 'form.html',
    })*/
    .state('login', {
      url: '/',
      views: {
        'content@': {
          templateUrl: '/templates/users/login.html',
          controller: 'LoginController'
        }
      }
    })
    .state('main', {
      url: '/main_onboard',
      views: {
        'content@': {
          templateUrl: '/templates/onboard/main.html',
          controller: 'OnboardController'
        }
      }
    })
    .state('onboard', {
        url: '/onboard',
        views: {
          'content@': {
          template: '/templates/onboard/onboard.html',
        }
      }
    })
    .state('onboard.register', {
        url: '/asdf',
        templateUrl: '/templates/onboard/register.html',
    })
    .state('onboard.confirm', {
        url: '/asdf',
        templateUrl: '/templates/onboard/confirm.html'
    })
    ;

}]);

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

angular.module(app_name).service('user_service', ['$http', '$q', '$state', function($http, $q, $state){
    var self = this;
    var base = 'https://luna-track.com/api/v1/auth';

    self.sign_in = function(user){
        console.log(user);
        $http({
            method: 'POST',
            url: base + '/login/',
            data: user
        })
        .then(function(data){
            $rootScope.$broadcast("USER_LOGGED_IN");
            set_user(data.data.auth_token);
            $state.go('/main_onboard');
        });
    };    

    function set_user(token) {
        localStorage.token = token;
        // This is to retrieve user data by token upon login
        /*get_current_user().then(function(data){
            console.log(data);
            $rootScope.$broadcast("USER_SET", data);
        });*/ 
    }

    function get_current_user() {
        return $q(function(resolve, reject) {

        if (is_signed_in()) {

            $http({
                method: 'GET',
                url: '/api/v1/auth/me/',
            }).then(function(data){
                resolve(data.data);
            }, function(error){
                console.log(error);
                console.log("CURR_ERROR");
                reject(error);
            });

        }
        else return;
        });
    }

    function is_signed_in() {
        return !!localStorage.token;
    }

    self.is_signed_in = is_signed_in;

}]);