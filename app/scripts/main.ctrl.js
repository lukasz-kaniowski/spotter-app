'use strict';

/*exported oldValue */

angular.module('SpotterApp.main', [])
  .controller('MainCtrl', function ($ionicHistory, $scope) {
    $scope.myGoBack = function () {
      $ionicHistory.goBack();
    };
  })
// TODO temp, move out of here
  .controller('MenuCtrl', function ($scope, $ionicSideMenuDelegate, $localStorage, $state) {
    $scope.logout = function () {
      delete $localStorage.token;
      $state.go('login');
    };

    // hack for menu to be hidden when map is on the page https://github.com/driftyco/ionic/issues/2682
    $scope.$watch(function () {
      return $ionicSideMenuDelegate.getOpenRatio();
    }, function (newValue) {
      $scope.hideLeft = newValue === 0;
    });
  });
