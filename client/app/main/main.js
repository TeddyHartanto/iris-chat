'use strict';

angular.module('irisChatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        authenticate: true
        /*
        resolve: {
        	user: function(Auth) {
        		return Auth.getCurrentUser();
        	}
        }
        */ // [Fix:] resolves the user in the controller instead of ui-router config
           // because there was an unexpected behavior
      });
  });