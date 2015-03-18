'use strict';

/*exported oldValue */

angular.module('SpotterApp.main', [])
  .controller('MainCtrl', function($log, $scope, $ionicHistory) {
    $log.debug('MainCtrl');
    $scope.myGoBack = function() {
      console.log(111)
      $ionicHistory.goBack();
    };
  })
// TODO temp, move out of here
  .controller('MenuCtrl', function($scope) {

  });
