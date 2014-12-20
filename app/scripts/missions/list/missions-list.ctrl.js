'use strict';

angular.module('SpotterApp.missions.list', []).config(function($stateProvider) {

	$stateProvider.state('app.missions', {
		url : '/missions',
		views : {
			'menuContent' : {
				templateUrl : 'scripts/missions/list/missions-list.html',
				controller : 'MissionListCtrl'
			}
		}
	});

}).controller('MissionListCtrl', function($log, $scope, missionsService, deviceServices, appGlobal, helperService) {
	$log.debug('MissionListCtrl');

	appGlobal.ready.then(function() {
		Run();
	});

	function Run() {
		deviceServices.detectCurrentPosition(true)
		.then(getMissions)
		.then(showMissions);
	}

	function getMissions() {
		var geoLocation = appGlobal.geoPosition.coords.latitude + ',' + appGlobal.geoPosition.coords.longitude;
		return missionsService.getMissions({
			location : geoLocation
		});
	}
	
	function showMissions(missions) {
		// For the List
		$scope.missions = missions;
		// Show map
		if ($scope.map) {
			updateMap();
		}
		else createMap();
	}

	function createMap() {
		function onMapInit(map) {
		}
		
		if (appGlobal.onDevice) {
			plugin.google.maps.Map.isAvailable(function(isAvailable, message) {
				if (isAvailable) {
					var div = document.getElementById("map_canvas");
					if (div) {
						console.log("loading map");
						$scope.map = plugin.google.maps.Map.getMap(div);
						$scope.map.addEventListener(plugin.google.maps.event.MAP_READY, onMapInit);
					} else {
						// no map created
					}
				} else {
					// TODO
					alert(message);
				}
			});
		}
	}

	function updateMap() {
			//  Set initial Map Settings, latLng must run after getting position and getting missions
			var latLng;
			// if no data returned, no need to update the map
			if (!$scope.missions) return;
			if ($scope.missions.length===0) return;
			if ($scope.missions.length > 0) {
				latLng = new plugin.google.maps.LatLng($scope.missions[0].address.coordinates[0], $scope.missions[0].address.coordinates[1]);
			} else {
				latLng = new plugin.google.maps.LatLng(appGlobal.geoPosition.coords.latitude, appGlobal.geoPosition.coords.longitude);
			}
			$scope.map.animateCamera({
				'target': latLng,
				'zoom' : 12,
				'duration': 2000				
			});
			createMarkers();		
	}
	
	function createMarkers() {
		var latLng;
		for (var m = 0; m < $scope.missions.length; m++) {
			console.log("mission " + m);
			console.log($scope.missions[m]);
			latLng = new plugin.google.maps.LatLng($scope.missions[m].address.coordinates[0], $scope.missions[m].address.coordinates[1]);
			$scope.map.addMarker({
				'position' : latLng,
				'title' : $scope.missions[m].price + " GPB"
			});
		}
	}
	
	// Do this to reload map when switching tabs - fixes an issue between ionic and google-maps
	$scope.refreshMap = function() {
		setTimeout(function() {
			$scope.refreshMap_();
		}, 1);
		//Need to execute it this way because the DOM may not be ready yet
	};

	$scope.refreshMap_ = function() {
		var div = document.getElementById("map_canvas");
		if ($scope.map)
			helperService.reattachMap($scope.map, div);
		else			
			createMap();
	};

});
