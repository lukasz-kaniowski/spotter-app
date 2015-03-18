'use strict';

angular
  .module('SpotterApp.missions.show', [])

  .controller('MissionShowCtrl', function ($log, $scope, mission, $ionicModal, $state) {
    $log.debug('MissionShowCtrl', mission);

    function setMission(mission) {
      $scope.mission = mission;
      if (mission.state === 'active') {
        $scope.dueTime = mission.dueDate;
        $scope.triggerAction = openModal;
        $scope.buttonLabelKey = 'Missions.Show.AcceptButton';
      } else if (mission.state === 'booked') {
        $scope.dueTime = (mission.bookingDueTime ? mission.bookingDueTime : mission.dueDate);
        $scope.triggerAction = startMission;
        $scope.buttonLabelKey = 'Missions.Show.StartButton';
      }
      //return;
    }

    function openModal() {
      $scope.modal.show();
    }

    function startMission() {
      $state.go('app.missionsTasks', {mission_id : mission._id});
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
