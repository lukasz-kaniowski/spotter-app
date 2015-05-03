'use strict';

angular.module('SpotterApp.missions')
  .controller('TasksAnswerCtrl', function ($scope, $ionicPlatform, $ionicActionSheet, imageService, $state, $ionicLoading, $ionicSlideBoxDelegate, $ionicModal, missionsService, mission, $stateParams, $localStorage) {

    $scope.answers = {};
    $scope.mission = mission;
    $scope.startSlide = $stateParams.slide_num;
    var current_task_id, saved_answers = $localStorage[$stateParams.mission_id];
    if (saved_answers) {
      angular.copy(saved_answers, $scope.answers);
    }
    var addImage = function (local_path) {
      if (!local_path)
        return false;
      $scope.answers[current_task_id] = {url: local_path};
      $scope.$apply();
    };
    $scope.saveData = function () {
      if (!angular.equals($scope.answers, saved_answers)) {
        $localStorage[$stateParams.mission_id] = $scope.answers;
        angular.copy($scope.answers, saved_answers);
      }
      if ($ionicSlideBoxDelegate.currentIndex() == ($ionicSlideBoxDelegate.slidesCount() - 1))
        $state.go('app.tasks_list', {mission_id: $scope.mission._id});
      else
        $ionicSlideBoxDelegate.next();
    };
    $scope.showActionsheet = function (task_id) {
      current_task_id = task_id;
      $ionicActionSheet.show({
        titleText: 'Select from',
        buttons: [
          {text: 'Camera'},
          {text: 'Gallery'}
        ],
        cancelText: 'Cancel',
        cancel: function () {
          return false;
        },
        buttonClicked: function (index) {
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

    angular.element(document).ready(function () {
      $ionicSlideBoxDelegate.$getByHandle('tasks').enableSlide(false);
    });


  });

