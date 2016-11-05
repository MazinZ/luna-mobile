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