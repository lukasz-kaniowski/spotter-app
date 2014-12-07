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

  .controller('MissionListCtrl', function ($log, $scope) {
    $log.debug('MissionListCtrl');

    $scope.map = {center: {latitude: 52.2333, longitude: 21.016}, zoom: 12};
    $scope.marker = {
      id: 0,
      coords: {
        latitude: 52.2333,
        longitude: 21.0160
      },
      options: {
        labelContent: 'Ogorki w Tesco',
        labelClass: 'marker-labels'
      }
    };
  });
