'use strict';

angular.module('irisChatApp')
  .filter('senderFilter', function () {
    return function (input, userId) {
    	if (input === userId)
    		return "You";
    	else
    		return "Stranger";
    };
  });