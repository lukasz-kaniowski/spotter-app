'use strict';

/*export $ionicScrollDelegate */

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
}).controller('MissionListCtrl', function($scope, appGlobal, $ionicTabsDelegate, helperService, missionsDecorator, $state, $ionicScrollDelegate) {
	console.debug('MissionListCtrl');
	//var delegate = $ionicScrollDelegate($scope);
	//delegate.scrollToRememberedPosition('my-scroll-id');

	//saves scroll based on id on $destroy
	//delegate.rememberScrollPosition('my-scroll-id');
	appGlobal.ready.then(function() {
		run();
	});

	function run() {
		console.log('checking missions tab ' + appGlobal.missionsTab);
		if (appGlobal.missionsTab === 2) {
			$ionicTabsDelegate.select(1);
		}
		// appGlobal.pMissions.then(showMissions);
		var missions = helperService.missions;
		showMissions(missions);
	}

	function showMissions(missions) {
		missions = missionsDecorator.decorate('listMissions', missions);
		$scope.missions = missions;
	}


	$scope.selectTab = function(index) {
		index = index;
		// appGlobal.missionsTab = index;
		// console.log('changing missinos tab to '+appGlobal.missionsTab);
	};

	$scope.gotoMission = function(id) {
		appGlobal.missionsTab = 1;
		$state.transitionTo('app.mission', {
			'missionId' : id
		});
	};

});