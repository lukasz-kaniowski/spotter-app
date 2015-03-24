'use strict';

/*exported oldValue */

angular.module('SpotterApp')
  .controller('IntroCtrl', function($scope, $state, $localStorage) {

    $scope.login = function(){
      $localStorage.intro = true;
      $state.go('login');
    }
  })
