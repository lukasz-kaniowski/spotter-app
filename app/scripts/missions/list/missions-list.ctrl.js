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

}).run(function($q, appGlobal, deviceServices, missionsService) {
	var q = $q.defer();
	appGlobal.pMissions = q.promise;
	function getMissions() {
		var geoLocation = appGlobal.geoPosition.coords.latitude + ',' + appGlobal.geoPosition.coords.longitude;
		return missionsService.getMissions({
			location : geoLocation
		});
	}


	deviceServices.detectCurrentPosition(false).then(getMissions).then(function(missions) {
		q.resolve(missions);
	});
}).controller('MissionListCtrl', function($scope, appGlobal, $ionicTabsDelegate) {
	console.debug('MissionListCtrl');

	appGlobal.ready.then(function() {
		run();
	});

	function run() {
		console.log('checking missions tab ' + appGlobal.missionsTab);
		if (appGlobal.missionsTab === 2) {
			$ionicTabsDelegate.select(1);
		}
		appGlobal.pMissions.then(showMissions);
	}

	function showMissions(missions) {
		$scope.missions = missions;
	}

	$scope.selectTab = function(index) {
		index = index;
		// appGlobal.missionsTab = index;
		// console.log('changing missinos tab to '+appGlobal.missionsTab);
	};

});