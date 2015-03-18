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
      .state('app.missions', {
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
        url: '/missions/:missionId',
        views: {
          'menuContent': {
            templateUrl: 'scripts/missions/show/missions-show.html',
            controller: 'MissionShowCtrl',
            resolve: {
              mission: function ($log, $stateParams, missionsService) {
                return missionsService.getMission($stateParams.missionId);
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
            controller: 'MissionTaskCtrl'
          }
        }
      })
      .state('app.my-missions', {
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
