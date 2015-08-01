'use strict';

angular.module('irisChatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        authenticate: true,
        resolve: {
        	user: function(Auth) {
        		return Auth.getCurrentUser();
        	}
        }
      });
  });