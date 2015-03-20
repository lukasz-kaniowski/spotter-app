'use strict';

/*exported oldValue */

angular.module('SpotterApp.main', [])
  .controller('MainCtrl', function($log, $scope) {
    $log.debug('MainCtrl');
    $scope.myGoBack = function() {
      window.history.back();
    };
  })
// TODO temp, move out of here
  .controller('MenuCtrl', ['$scope', '$ionicSideMenuDelegate',
    function($scope, $ionicSideMenuDelegate) {
      $scope.$watch(function() {
        return $ionicSideMenuDelegate.getOpenRatio();
      }, function(newValue) {
        if (newValue === 0) {
          $scope.hideLeft = true;
        } else {
          $scope.hideLeft = false;
        }
      });
    }]);
