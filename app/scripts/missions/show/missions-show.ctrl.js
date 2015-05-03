'use strict';

angular
  .module('SpotterApp.missions.show', [])

  .controller('MissionShowCtrl', function ($scope, mission, $ionicModal, missionsService, $state, geolocationService, CONFIG) {
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
      }else{
        $scope.hide_buttons = true;
      }
      //return;
    }
    $scope.accept = function () {
      mission.book().then(function(mission){
        missionsService.updateCurrentMission('booked');
        setMission(mission);
      }).then($scope.closeModal)
        .catch($scope.closeModal);
    };
    $scope.cancelMission = function () {
      mission.cancel()
        .then($scope.closeModal)
        .catch($scope.closeModal)
        .then(function(){
          missionsService.updateCurrentMission('active');
          $state.go('app.missions');
      })
    };

    function openModal(activate) {
      if(activate) {
        $scope.modal_text = {
          title: "Missions.Activate.Title",
          label: "Missions.Activate.Label",
          time: "Missions.Activate.TimeToExecute",
          accept: "Missions.Activate.AcceptButton",
          cancel: "Missions.Activate.CancelButton",
          action: 0
        }
      }
      else{
        $scope.modal_text = {
          title: "Missions.Cancel.Title",
          label: "Missions.Cancel.Label",
          accept: "Missions.Cancel.AcceptButton",
          cancel: "Missions.Cancel.CancelButton",
          action: 1
        }
      }
      $scope.modal.show();
    }

    $scope.openModal = openModal;

    function startMission() {
        //geolocationService.checkDistance(mission.address.coordinates[0], mission.address.coordinates[1]).then(function(res){
      if(CONFIG.check_geolocation)
        geolocationService.checkDistance(mission.address.gps.coordinates[0], mission.address.gps.coordinates[1]).then(function(res){
          if(Math.ceil(res) <= CONFIG.radius)
            $state.go('app.tasks_list', {mission_id : mission._id});
          else{
            $scope.err_modal = $ionicModal.fromTemplate('<ion-modal-view><ion-header-bar><h1 class="title">Error</h1></ion-header-bar><ion-content>You are not at the location! You cannot start the mission until you get there.<button class="button button-block button-stable" ng-click="err_modal.hide()">ok</button></ion-content></ion-modal-view>', {scope: $scope})
            $scope.err_modal.show();
          }
        }, function(err){
          alert("Check app permissions for location");
        });
      else
        $state.go('app.tasks_list', {mission_id : mission._id});
    }

    setMission(mission);

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
