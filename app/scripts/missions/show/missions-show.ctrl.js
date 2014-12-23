'use strict';

angular
  .module('SpotterApp.missions.show', [])

  .config(function ($stateProvider) {

    $stateProvider
      .state('app.mission', {
        url: '/mission/:missionId',
        views: {
          'menuContent': {
            templateUrl: 'scripts/missions/show/missions-show.html',
            controller: 'MissionShowCtrl',
            resolve: {
              mission: function ($log, $stateParams) {

                $log.debug('/mission/:missionId', $stateParams);

                return {
                  "id": 1,
                  "title": "Nice and easy",
                  "company": "Tesco",
                  "address": {
                    "coordinates": [40.714728, -73.998672],
                    "distance": "0.2km"
                  },
                  "dueDate": "2015-01-22T15:20:38",
                  "price": 5,
                  "tasks": [
                    {"type": "question", count: "5", "icon": "ion-alert"},
                    {"type": "question", count: "5", "icon": "ion-alert"},
                    {"type": "question", count: "5", "icon": "ion-alert"},
                    {"type": "question", count: "5", "icon": "ion-alert"},
                    {"type": "photo", count: "1", "icon": "ion-help-circled"}
                  ],
                  "instructions": "<p>Some <b>html</b> descipiton</p>"
                }

              }
            }
          }
        }
      });

  })

  .controller('MissionShowCtrl', function ($log, $scope, mission) {
    $log.debug('MissionShowCtrl');
    $scope.mission = mission;

  });
