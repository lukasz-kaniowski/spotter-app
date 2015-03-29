'use strict';

/*exported oldValue */

angular.module('SpotterApp.main', [])
  .controller('MainCtrl', function($ionicHistory, $scope) {
    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };
  })
// TODO temp, move out of here
  .controller('MenuCtrl', function($scope, $ionicSideMenuDelegate, $localStorage, $state) {
      $scope.logout = function(){
        delete $localStorage.token;
        $state.go('login');
      };
      //$scope.$watch(function() {
      //  return $ionicSideMenuDelegate.getOpenRatio();
      //}, function(newValue) {
      //  if (newValue === 0) {
      //    $scope.hideLeft = true;
      //  } else {
      //    $scope.hideLeft = false;
      //  }
      //});
    });
