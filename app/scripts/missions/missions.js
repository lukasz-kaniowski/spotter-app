'use strict';

angular
  .module('SpotterApp.missions', ['SpotterApp.missions.list', 'SpotterApp.missions.show'])

  .config(function ($stateProvider) {

    $stateProvider

      .state('missionActivate', {
        url: '/activate',
        templateUrl: 'scripts/missions/activate/activate.modal.html'
      });
  });
