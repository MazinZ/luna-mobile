angular.module(app_name)
  .service('firebase_service', ['$http', '$state', function($http, $state){
    var self = this;

    self.login_firebase = function(token){
        firebase.auth().signInWithCustomToken(token).catch(function(error) {
            console.log(error)
        });
    }

    self.onboard = function(userinfo){
        var user = firebase.auth().currentUser;
        // If user is currently signed into firebase
        if (user){
            user.updateProfile(userinfo)
              .then(function(){
                 $state.go('landing');
            });
        }
        else return;
    }

}]);
