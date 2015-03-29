'use strict';

angular.module('SpotterApp').factory('spinner', function ($ionicLoading) {
  return {
    show: function () {
      $ionicLoading.show();
    },
    hide: function () {
      $ionicLoading.hide();
    }
  }
});
