"use strict";

angular.module("config")

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('start_app', {
        url: '/',
        resolve: {
          start: function($localStorage, $location){
            if($localStorage.intro && $localStorage.token){
              $location.path('app/missions');
            }
            else if($localStorage.intro)
              $location.path('/login');
            else
              $location.path('/intro');
          }
        }
      })
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'scripts/menu.html',
        controller: 'MainCtrl'
      })
      .state('intro', {
        url: '/intro',
        templateUrl: 'scripts/intro/intro.html',
        controller: 'IntroCtrl'
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
            controller : 'MissionListCtrl',
            resolve: {
              missions: function(missionsService){
                return missionsService.getMissions({state: 'active'});
              }
            }
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
      .state('app.tasks_list', {
        cache: false,
        url: '/tasks-list/:mission_id',
        views: {
          'menuContent': {
            templateUrl: 'scripts/missions/tasks/list/tasks-list.html',
            controller: 'TasksListCtrl',
            resolve: {
              mission: function (missionsService, $stateParams) {
                return missionsService.getCurrentMission($stateParams.mission_id);
              }
            }
          }
        }
      })
      .state('app.tasks_answer', {
        url: '/tasks-answer/:mission_id/:slide_num',
        views: {
          'menuContent': {
            templateUrl: 'scripts/missions/tasks/answer/tasks-answer.html',
            controller: 'TasksAnswerCtrl',
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
      .state('test-error', {
        url : '/test/error/:error',
        resolve: {
          mission: function ($log, $stateParams, $http, CONFIG) {
            return $http.get(CONFIG.apiEndpoint + '/api/test/error/' + $stateParams.error);
          }
        }
      })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
  })

;
