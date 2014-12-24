'use strict';

angular
  .module('SpotterApp.missions.show', [])

  .config(function ($stateProvider) {

    $stateProvider
      .state('app.mission', {
        url: '/missions/:missionId',
        views: {
          'menuContent': {
            templateUrl: 'scripts/missions/show/missions-show.html',
            controller: 'MissionShowCtrl',
            resolve: {
              mission: function ($log, $stateParams, missionsService) {
                $log.debug('/mission/:missionId', $stateParams);
                return missionsService.getMission($stateParams.missionId);
              }
            }
          }
        }
      });

  })

  .controller('MissionShowCtrl', function ($log, $scope, mission) {
    $log.debug('MissionShowCtrl', mission);
    $scope.mission = mission;

  });
