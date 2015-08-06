'use strict';

angular.module('irisChatApp')
  .filter('senderFilter', function () {
    return function (input, userId) {
    	if (input === "System")
    		return "System";
    	else {
	    	if (input === userId)
	    		return "You";
	    	else
	    		return "Stranger";
	    }
    };
  });