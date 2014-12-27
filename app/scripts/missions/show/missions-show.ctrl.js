'use strict';

angular
  .module('SpotterApp.missions.show', [])

  .config(function ($stateProvider) {

    $stateProvider
      .state('app.mission', {
        url: '/missions/:missionId',
        views: {
          'menuContent': {
            templateUrl: 'scripts/missions/show/missions-show.html',
            controller: 'MissionShowCtrl',
            resolve: {
              mission: function ($log, $stateParams, missionsService) {
                $log.debug('/mission/:missionId', $stateParams);
                return missionsService.getMission($stateParams.missionId);
              }
            }
          }
        }
      });

  })

  .controller('MissionShowCtrl', function ($log, $scope, mission, $ionicModal) {
    $log.debug('MissionShowCtrl', mission);
    $scope.mission = mission;


    var goToAcceptedMission = function () {
      $state.go('acceptedMission', {missionId: mission.id})
    };

    $scope.accept = function () {
      mission.accept().then(goToAcceptedMission);
    };

    $ionicModal.fromTemplateUrl('scripts/missions/show/activate.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

  });
