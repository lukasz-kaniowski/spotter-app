'use strict';

/*exported oldValue */

angular.module('SpotterApp')
  .controller('IntroCtrl', function ($scope, $state, $localStorage, $ionicSlideBoxDelegate) {

    $scope.login = function () {
      $localStorage.intro = true;
      $state.go('login');
    };

    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    }
  });
