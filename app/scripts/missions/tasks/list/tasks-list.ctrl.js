'use strict';

angular.module('SpotterApp.missions')
  .controller('TasksListCtrl', function($scope, $ionicPlatform, $ionicActionSheet, imageService, $state, $ionicLoading, $ionicModal, missionsService, mission, $stateParams, $localStorage){
    $scope.mission = angular.copy(mission);
    var answersObj = $localStorage[mission._id];
    if(answersObj){
      for(var i=0;i<$scope.mission.tasks.length;i++){
        var found = false;
        angular.forEach(answersObj, function(v,k){
          if(!found && $scope.mission.tasks[i]._id == k){
            $scope.mission.tasks[i].answered = true;
            found = true;
          }
        })
      }
    if($scope.mission.tasks.length === Object.keys(answersObj).length)
      $scope.can_submit = true;
    }

    $scope.submitData = function(){
      $ionicLoading.show();
      missionsService.sendAnswer(answersObj, $stateParams.mission_id).then(function(res){
        $ionicLoading.hide();
        $scope.modal.show();
      }, function(err){
        $scope.err_modal = $ionicModal.fromTemplate('<ion-modal-view><ion-header-bar><h1 class="title">Error</h1></ion-header-bar><ion-content>'+err.data.error+'<button class="button button-block button-stable" ng-click="err_modal.hide()">ok</button></ion-content></ion-modal-view>', {scope: $scope})
        $scope.err_modal.show();
        $ionicLoading.hide();
      })
    }
    $ionicModal.fromTemplateUrl('scripts/missions/tasks/list/submit-missions.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.closeModal = function() {
      $scope.modal.hide();
      $state.go('app.missions');
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
  });

