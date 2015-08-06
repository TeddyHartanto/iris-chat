'use strict';

angular.module('irisChatApp')
  .controller('SessionCtrl', function($scope, session, User) {
  	var user = User.get({}, function() {
  		$scope.userId = user._id;
  	})
  	$scope.session = session;
  });