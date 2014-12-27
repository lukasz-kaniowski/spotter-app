'use strict';

/*global plugin */

angular.module('SpotterApp.missions.list').config(function($stateProvider) {

	$stateProvider.state('app.missions', {
		url : '/missions',
		views : {
			'menuContent' : {
				templateUrl : 'scripts/missions/list/missions-list.html',
				controller : 'MissionListCtrl'
			}
		}
	});
 
})

.controller('MissionListCtrl', function($log, $scope, $q, missionsService, deviceServices, appGlobal) {
	$log.debug('MissionListCtrl');
	
	appGlobal.ready.then(function() {
		run();
	});

	function run() {
		deviceServices.detectCurrentPosition(true).then(getMissions).then(showMissions);
	}

	function getMissions() {
		var geoLocation = appGlobal.geoPosition.coords.latitude + ',' + appGlobal.geoPosition.coords.longitude;
		return missionsService.getMissions({
			location : geoLocation
		});
	}

	function showMissions(missions) {
		$scope.missions = missions;
	}	

});
