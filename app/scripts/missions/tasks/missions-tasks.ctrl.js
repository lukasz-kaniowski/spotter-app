'use strict';

angular.module('SpotterApp.missions').config(function ($stateProvider) {

  $stateProvider.state('app.missionsTasks', {
    url: '/missionsTasks',
    views: {
      'menuContent': {
        templateUrl: 'scripts/missions/tasks/missions-tasks.html'
      }
    }
  });

});
