"use strict";

angular.module("config")

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'scripts/menu.html',
        controller: 'MainCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'scripts/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('error', {
        url: '/error',
        template: '<error></error>'
      })
      .state('app.missions', {
        cache: false,
        url : '/missions',
        views : {
          'menuContent' : {
            templateUrl : 'scripts/missions/list/missions-list.html',
            controller : 'MissionListCtrl'
            //resolve: {
            //  missions: function(missionsService){
            //    console.log(1111)
            //    console.log(missionsService.getMissions({state: 'active'}))
            //  }
            //}
          }
        }
      })
      .state('app.mission', {
        cache: false,
        url: '/missions/:missionId',
        views: {
          'menuContent': {
            templateUrl: 'scripts/missions/show/missions-show.html',
            controller: 'MissionShowCtrl',
            resolve: {
              mission: function ($log, $stateParams, missionsService) {
                return missionsService.getCurrentMission($stateParams.missionId);
              }
            }
          }
        }
      })
      .state('app.missionsTasks', {
        url: '/missionsTasks/:mission_id',
        views: {
          'menuContent': {
            templateUrl: 'scripts/missions/tasks/missions-tasks.html',
            controller: 'MissionTaskCtrl',
            resolve: {
              mission: function (missionsService, $stateParams) {
                return missionsService.getCurrentMission($stateParams.mission_id);
              }
            }
          }
        }
      })
      .state('app.my-missions', {
        cache: false,
        url : '/my-missions',
        views : {
          'menuContent' : {
            templateUrl : 'scripts/my-missions/my-missions.html',
            controller: 'MyMissionCtrl',
            resolve: {
              missions: function (missionsService){
                return missionsService.getUserMissions();
              }
            }
          }
        }
      })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/missions');
  })

;
