angular
  .module('SpotterApp.my-missions')
  .directive('myMissionsList', function () {
    return {
      restrict: 'E',
      templateUrl: 'scripts/my-missions/my-missions-list.tpl.html'
      //controller: 'MyMissionCtrl'
    }
  }
);
