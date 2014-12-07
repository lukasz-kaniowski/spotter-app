'use strict';

angular
  .module('SpotterApp.missions.show', [])

  .config(function ($stateProvider) {

    $stateProvider
      .state('app.mission', {
        url: '/mission',
        views: {
          'menuContent': {
            templateUrl: 'scripts/missions/show/missions-show.html',
            controller: 'MissionShowCtrl'
          }
        }
      });

  })

  .controller('MissionShowCtrl', function ($log) {
    $log.debug('MissionShowCtrl');
  });
