angular
  .module('SpotterApp.directives', [])
  .directive('due', function ($log) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        time: '='
      },
      templateUrl: 'scripts/components/directives/dueTime/due-time.html',
      link: function (scope, element, attrs) {
        var dueDate = new Date(scope.time);

        var milis = Math.abs(dueDate - new Date());
        $log.debug('time', scope.time, milis, dueDate);
        scope.countdawn = milis/1000;


      }
    }
  }
);
