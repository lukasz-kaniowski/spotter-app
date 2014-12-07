'use strict';

angular
  .module('SpotterApp.missions.list', [])

  .config(function ($stateProvider) {

    $stateProvider
      .state('app.missions', {
        url: '/missions',
        views: {
          'menuContent': {
            templateUrl: 'scripts/missions/list/missions-list.html',
            controller: 'MissionListCtrl'
          }
        }
      });

  })

  .controller('MissionListCtrl', function ($log) {
    $log.debug('MissionListCtrl');
  });
