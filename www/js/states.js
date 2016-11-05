
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
