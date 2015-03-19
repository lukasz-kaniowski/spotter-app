'use strict';

angular.module('SpotterApp.missions')
  .controller('MissionTaskCtrl', function($scope, $ionicActionSheet, imageService, $state, $ionicModal, missionsService, mission, $stateParams, $localStorage){

    $scope.answers = {};
    $scope.mission = mission;
    var current_task_id, saved_answers = $localStorage[$stateParams.mission_id];
    if(saved_answers){
      angular.copy(saved_answers, $scope.answers);
    }
    var addImage = function(local_path) {
      if (!local_path)
        return false;
      $scope.answers[current_task_id] = {url: local_path};
      $scope.$apply();
      $scope.saveData();
    };

    $ionicModal.fromTemplateUrl('scripts/missions/tasks/submit-missions.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.closeModal = function() {
      $scope.modal.hide();
      $state.go('app.missions');
    };

    $scope.submitData = function(){
      missionsService.sendAnswer($scope.answers, $stateParams.mission_id).then(function(res){
        $scope.modal.show();
      })
    }

    $scope.saveData = function(){
      if(!angular.equals($scope.answers, saved_answers)){
        $localStorage[$stateParams.mission_id] = $scope.answers;
        angular.copy($scope.answers, saved_answers);
      }
    }
    $scope.showActionsheet = function(task_id) {
      current_task_id = task_id;
      $ionicActionSheet.show({
        titleText: 'Select from',
        buttons: [
          {text: 'Camera'},
          {text: 'Gallery'},
        ],
        cancelText: 'Cancel',
        cancel: function() {
          return false;
        },
        buttonClicked: function(index) {
          if (index === 0) {
            imageService.camera(addImage);
            return true;
          }
          else {
            imageService.album(addImage);
            return true;
          }
        }
      });
    };
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });


  });

