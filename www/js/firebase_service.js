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
