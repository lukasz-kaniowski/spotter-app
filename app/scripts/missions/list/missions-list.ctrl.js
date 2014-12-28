'use strict';

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
.run(function($q, appGlobal, deviceServices, missionsService) {
	var q = $q.defer();
	appGlobal.pMissions = q.promise;
	function getMissions() {
		var geoLocation = appGlobal.geoPosition.coords.latitude + ',' + appGlobal.geoPosition.coords.longitude;
		return missionsService.getMissions({
			location : geoLocation
		});
	}
	deviceServices.detectCurrentPosition(false)
	.then(getMissions)
	.then(function(missions) {
		q.resolve(missions);
	});
})
.controller('MissionListCtrl', function( $scope, appGlobal) {
	console.debug('MissionListCtrl');
	
	appGlobal.ready.then(function() {
		run();
	});

	function run() {
		appGlobal.pMissions.then(showMissions);
	}


	function showMissions(missions) {
		$scope.missions = missions;
	}
});