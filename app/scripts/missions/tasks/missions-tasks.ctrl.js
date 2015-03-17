'use strict';

angular.module('SpotterApp.missions')
  .controller('MissionTaskCtrl', function($scope, $ionicActionSheet, imageService, $stateParams, $localStorage){

    $scope.params = {};
    var a = $localStorage[$stateParams.mission_id];
    console.log("a")
    console.log(a)
    var addImage = function(local_path) {
      if (!local_path)
        return false;
      $scope.params.image = local_path;
    };
    $scope.saveParams = function(){
      console.log("$scope.params")
      console.log($scope.params)
      $localStorage[$stateParams.mission_id] = $scope.params;
    }
    $scope.showActionsheet = function() {
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


  });

