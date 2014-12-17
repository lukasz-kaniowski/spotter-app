'use strict';

angular
  .module('SpotterApp.missions.list', [])
  .config(function ($stateProvider) {

    $stateProvider
      .state('app.missions', {
        url: '/missions',
        views: {
          'menuContent': {
            templateUrl: 'scripts/missions/list/missions-list.html',
            controller: 'MissionListCtrl'
          }
        }
      });

  })
  	
  .controller('MissionListCtrl', function ($log, $scope, missionsService, deviceServices, appGlobal) {
    $log.debug('MissionListCtrl');
    // TODO start when app is ready
    
    // get location
    deviceServices.detectCurrentPosition(true)
    // List Missions
    .then(getMissions)
    .then(showMissions);


    function getMissions() {    	    	
    	var geoLocation = appGlobal.geoPosition.coords.latitude+','+ appGlobal.geoPosition.coords.longitude;
	    return missionsService.listMissions({location:geoLocation});    	
    }
    function showMissions(missions) {
    	$scope.missions = missions;
    }

    $scope.map = {center: {latitude: 52.2333, longitude: 21.016}, zoom: 12};
    $scope.marker = {
      id: 0,
      coords: {
        latitude: 52.2333,
        longitude: 21.0160
      },
      options: {
        labelContent: 'Ogorki w Tesco',
        labelClass: 'marker-labels'
      }
    };
  });
