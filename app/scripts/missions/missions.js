'use strict';

angular
  .module('SpotterApp.missions', [])

  .config(function ($stateProvider) {

    $stateProvider
      .state('app.missions', {
        url: '/missions',
        views: {
          'menuContent': {
            templateUrl: 'scripts/missions/missions.html'
          }
        }
      })
      .state('app.mission', {
        url: '/mission',
        views: {
          'menuContent': {
            templateUrl: 'scripts/missions/mission.html'
          }
        }

      });
  });
