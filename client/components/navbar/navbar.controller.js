'use strict';

angular.module('irisChatApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Chat',
      'link': '/'
    }, {
      'title': 'About',
      'link': '/about'
    }, {
      'title': 'History',
      'link': '/history'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
      $scope.$emit('logout'); // emit to parents, and then main.controller can catch
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });