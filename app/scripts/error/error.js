'use strict';

angular.module('SpotterApp')
  .directive('error', function ($log) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: "scripts/error/error.tpl.html",
      link: function (scope, element, attrs) {
        scope.back = function(){
          window.history.back();
        }
      }
    }
  }
);

