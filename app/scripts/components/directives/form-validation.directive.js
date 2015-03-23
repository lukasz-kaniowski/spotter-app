angular
  .module('SpotterApp.directives')
  .directive('validate', function ($log) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element[0].onfocus = function(){
          if(element.hasClass("invalid-input"))
            element.removeClass("invalid-input")
        }
        element[0].onblur = function(){
          if(element.hasClass("ng-invalid"))
            element.addClass("invalid-input")
        }
      }
    }
  }
);
