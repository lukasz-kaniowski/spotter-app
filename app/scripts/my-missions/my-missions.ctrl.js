'use strict';

/*export $ionicScrollDelegate */

angular.module('SpotterApp.my-missions')
  .controller('MyMissionCtrl', function($scope, appGlobal, $ionicTabsDelegate, missionsDecorator, $state, $ionicScrollDelegate, missionsService) {
    appGlobal.ready.then(function() {
      run();
    });

    var _tabName;
    $scope.missionsArr = [];

    function run() {
      missionsService.getUserMissions().then(function (missions) {
        if(missions.length > 0)
          showMissions(missions);
        else
          $scope.missions = [];
      });
    }

    function showMissions(missions) {
      missions = missionsDecorator.decorate('myMissionsList', missions);
      $scope.missionsArr = missions;
      $scope.missions = $scope.missionsArr[_tabName];
    }


    $scope.selectTab = function(tabName) {
      _tabName = tabName
      if($scope.missions)
        $scope.missions = $scope.missionsArr[_tabName];
    };

    $scope.gotoMission = function(mission) {
      appGlobal.missionsTab = 1;
      console.log(mission);
      $state.go('app.mission', {'missionId': mission._id});
    };

  });
