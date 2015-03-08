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
                return missionsService.getMission($stateParams.missionId);
              }
            }
          }
        }
      });

  })

  .controller('MissionShowCtrl', function ($log, $scope, mission, $ionicModal, $state) {
    $log.debug('MissionShowCtrl', mission);

    function setMission(mission) {
      $scope.mission = mission;
      if (mission.state === 'active') {
        $scope.dueTime = mission.dueDate;
        $scope.triggerAction = openModal;
        $scope.buttonLabelKey = 'Missions.Show.AcceptButton';
      } else if (mission.state === 'booked') {
        $scope.dueTime = mission.bookingDueTime;
        $scope.triggerAction = startMission;
        $scope.buttonLabelKey = 'Missions.Show.StartButton';
      }
      //return;
    }

    function openModal() {
      $scope.modal.show();
    }

    function startMission() {
      $state.go('app.missionsTasks');
    }

    setMission(mission);

    $scope.accept = function () {
      $log.debug('Accepting');
      mission.book().then(setMission).then($scope.closeModal)
        .catch($scope.closeModal);
    };

    $ionicModal.fromTemplateUrl('scripts/missions/show/activate.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });


    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });


  });
