'use strict';
angular
  .module('SpotterApp.my-missions', [])
  .config(function($stateProvider) {

    $stateProvider.state('app.my-missions', {
      url : '/my-missions',
      views : {
        'menuContent' : {
          templateUrl : 'scripts/my-missions/my-missions.html'
        }
      },
      controller: 'MyMissionCtrl'
    });

  });
