'use strict';

angular.module('irisChatApp')
  .controller('HistoryCtrl', function($scope, $http, User) {
  	var user = User.get({}, function() {
  		$http.get('api/rooms/' + user._id + '/history')
  		  .then(function(res) {
  		  	$scope.rooms = res.data; // rooms is an array
  		  	console.log($scope.rooms);
  		  });
  	});
  });