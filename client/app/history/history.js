'use strict';

angular.module('irisChatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('history', {
        url: '/history',
        templateUrl: 'app/history/history.html',
        controller: 'HistoryCtrl',
        authenticate: true
      })
      .state('session', {
      	url: '/history/{roomId}',
      	templateUrl: 'app/history/session.html',
      	controller: 'SessionCtrl',
      	authenticate: true,
      	resolve: {
      		session: function($stateParams, $http) {
      			return $http.get('api/rooms/' + $stateParams.roomId)
      						.then(function(res) {
      							return res.data;
      						});
      		}
      	}
      });
});