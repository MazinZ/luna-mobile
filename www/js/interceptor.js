angular.module(app_name)
.factory("authInterceptor", ['$q', '$window', function ($q, $window) {
  return {
   'request': function(config) {
        if (localStorage.token) config.headers['Authorization'] = 'Token ' + localStorage.token;
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
