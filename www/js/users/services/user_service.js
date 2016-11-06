angular.module(app_name).service('user_service', ['$http', '$q', '$state', '$rootScope', '$ionicLoading', 
    function($http, $q, $state, $rootScope, $ionicLoading){
    var self = this;
    var base = 'https://luna-track.com/api/v1/auth';

    self.sign_in = function(user){
        console.log(user);
        $ionicLoading.show({templateUrl:'/templates/common/loader.html'});

        $http({
            method: 'POST',
            url: base + '/login/',
            data: user
        })
        .then(function(data){
            $rootScope.$broadcast("USER_LOGGED_IN");
            set_user(data.data.auth_token.auth_token, 
                data.data.firebase_token.firebasetoken);
            console.log(data.data);
            $state.go('main_onboard');
        });
    };    

    function set_user(token, ftoken) {
        localStorage.token = token;
        localStorage.ftoken = ftoken;
        get_current_user().then(function(data){
            $rootScope.$broadcast("USER_SET", data);
            $ionicLoading.hide();
        });
    }

    function get_current_user() {
        return $q(function(resolve, reject) {

        if (is_signed_in()) {
            $http({
                method: 'GET',
                url: base + '/me/',
            }).then(function(data){
                console.log(data.data);
                resolve(data.data);
            }, function(error){
                reject(error);
                console.log(error);
            });

        }
        else return;
        });
    }

    function is_signed_in() {
        return !!localStorage.token;
    }

    self.is_signed_in = is_signed_in;
    self.get_current_user = get_current_user;
}]);