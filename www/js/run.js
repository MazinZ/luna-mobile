angular.module(app_name)
    .run(['$http', '$window', '$rootScope', '$state', '$timeout', function($http, $window, $rootScope, $state, $timeout){
        /*$http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
        $http.defaults.headers["Content-Type"] = "application/json";*/
        $timeout(function() {
            $state.go('login');
        });

        $rootScope.$on('USER_LOGGED_IN', function(event, token) {
           /* if (localStorage.token) {
                console.log("TOKEN");
                $http.defaults.headers.common['Authorization'] = 'Token ' + token;
            }*/
        });
    }]);
    