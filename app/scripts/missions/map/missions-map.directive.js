'use strict';

// TODO test on android and ios
// TODO use restangular instead if native $resource
// TODO reuse missions results and location results in both list and map
// TODO create sass formatting of html marker
// TODO use decorator for formatting missions data
// TODO map should work on different device sizes
// TODO fix any jshint issues
// TODO add button to move to the closest mission on the map
// TODO add fallback for js maps
// Move Map Controller to a Maps Directive [DONE]
// adjust layer location of the popover when it is off the frame? [DONE]
// use angular instead of jquery to create html div [DONE]
//  test with many markers [DONE]

/*global plugin */

angular.module('SpotterApp.missions.list', []).config(function() {
	// TODO any configuration needed for the map?
	// TODO configuration for fallback js map?
}).directive('missionsMap', function() {
	return {
		restrict : 'A',
		replace : true,
		controller : 'MissionsMapCtrl',
		templateUrl : 'scripts/missions/map/missions-map.html',
		scope : {
			missions : '=',
		}
	};
}).controller('MissionsMapCtrl', function($log, $scope, $q, missionsService, deviceServices, appGlobal, helperService, $rootScope, $interval) {
	$log.debug('MissionsMapCtrl');
	$scope.updated = false;
	$scope.show = false;
	$scope.currentMarker = -1;
	$scope.frameCss = {
		left : 0,
		top : 0
	};
	$scope.frameLocation = [0, 0];
	var myInfo = null;
	var timer = null;

	appGlobal.ready.then(function() {
		run();
	});

	function run() {
		// TODO Temp
		// deviceServices.detectCurrentPosition(true).then(getMissions).then(showMissions);
		appGlobal.geoPosition.coords.latitude = 52.230938;
		appGlobal.geoPosition.coords.longitude = 21.009537;
		var missions = helperService.missions; 
		showMissions(missions);
	}

	function getMissions() {
		var geoLocation = appGlobal.geoPosition.coords.latitude + ',' + appGlobal.geoPosition.coords.longitude;
		return missionsService.getMissions({
			location : geoLocation
		});
	}

	function showMissions(missions) {
		$scope.missions = missions;
		// Show map
		if ($scope.map) {
			updateMap();
		} else {
			createMap();
		}
	}

	function createMap() {

		function onMapInit(map) {
			console.log('Map Ready');
			map.on(plugin.google.maps.event.MAP_CLICK, onMapClick);
			// map.on(plugin.google.maps.event.CAMERA_CHANGE, onMapCameraChange);
			updateMap();
		}

		if (appGlobal.onDevice) {
			plugin.google.maps.Map.isAvailable(function(isAvailable, message) {
				message = message;
				if (isAvailable) {
					var div = document.getElementById('map_canvas');
					if (div) {
						console.log('creating map');
						$scope.map = plugin.google.maps.Map.getMap(div);
						$scope.map.clear();
						$scope.map.off();
						// $scope.map.setDebuggable(true);
						// $scope.map.setClickable( true );
						$scope.map.addEventListener(plugin.google.maps.event.MAP_READY, onMapInit);
					} else {
						console.log('google maps plugin - div is not available');
					}
				} else {
					console.log('google maps plugin is not available - ' + message);
				}
			});
		} else {
			console.log('google maps plugin is not available - not running on a device ');
		}
	}

	function onMapClick() {
		console.log('map click trigger');
		$scope.hidePopover();
	}

	function refreshFramePosition() {
		if ($scope.show) {
			$scope.map.fromLatLngToPoint($scope.markerPosition, function(point) {
				if ($scope.frameLocation[0] != point[0] || $scope.frameLocation[1] != point[1]) {
					// console.log("point is "+point[0]+","+point[1]);
					$scope.frameLocation[0] = point[0];
					$scope.frameLocation[1] = point[1];
					var left, top;
					left = point[0] - 108;
					top = point[1] - 180;
					$scope.frameCss = {
						"left" : left + "px",
						'top' : top + "px"
					};
					// Update the children position.
					$scope.map.refreshLayout();
				}
			});
		}
	}

	// TODO remove, not used anymore
	function onMapCameraChange(position) {
		console.log('map Camera is moving');
		$scope.$apply(function() {
			// update css only if popover is active
			refreshFramePosition();
		});
	}


	$scope.hidePopover = function() {
		console.log('hide popover');
		$scope.currentMarker = -1;
		$scope.show = false;
		$interval.cancel($scope.timer);
		$scope.timer = undefined;
		// TODO should we clear any map events?
		// map.off();
	};

	$scope.showPopover = function(id) {
		if ($scope.timer) {
			$interval.cancel($scope.timer);
		}
		//		$scope.show = false;
		console.log('show popover');
		$scope.currentMarker = id;
		$scope.mission = $scope.missions[$scope.currentMarker];
		/*
		 $scope.map.getCameraPosition(function(camera) {
		 $scope.map.animateCamera({
		 'target' : $scope.markerPosition,
		 'zoom' : camera.zoom,
		 'duration': 0
		 }, function() {
		 });
		 })
		 */;
		$scope.show = true;
		$scope.timer = $interval(function() {
			refreshFramePosition();
		}, 200);
	};

	function updateMap(map) {
		map = map;
		//  Set initial Map Settings, latLng must run after getting position and getting missions
		var latLng;
		// if no data returned, no need to update the map
		if (!$scope.missions) {
			return;
		}
		if ($scope.missions.length === 0) {
			return;
		}
		if ($scope.updated) {
			return;
		}

		console.log('updating map');
		// centering map on closest mission, or on current gps location if no missions nearby.
		if ($scope.missions.length > 0) {
			latLng = new plugin.google.maps.LatLng($scope.missions[0].address.coordinates[0], $scope.missions[0].address.coordinates[1]);
		} else {
			latLng = new plugin.google.maps.LatLng(appGlobal.geoPosition.coords.latitude, appGlobal.geoPosition.coords.longitude);
		}
		// latLng = new plugin.google.maps.LatLng(appGlobal.geoPosition.coords.latitude, appGlobal.geoPosition.coords.longitude);
		// latLng = new plugin.google.maps.LatLng(52.230938, 21.009537);

		$scope.map.animateCamera({
			'target' : latLng,
			'zoom' : 12,
			'duration' : 500
		});
		createMarkers();
		$scope.updated = true;
	}

	function createMarkers() {
		var latLng;
		// latLng = new plugin.google.maps.LatLng(52.230938, 21.009537);

		for (var m = 0; m < $scope.missions.length; m++) {
			latLng = new plugin.google.maps.LatLng($scope.missions[m].address.coordinates[0], $scope.missions[m].address.coordinates[1]);
			console.log($scope.missions[m]);
			var iconMarker = helperService.createMarkerIcon($scope.missions[m].price, 'GBP');
			$scope.map.addMarker({
				'position' : latLng,
				'missionId' : m,
				'icon' : iconMarker
			}, function(marker) {
				marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, onMarkerClick);
			});
		}
	}

	function onMarkerClick(marker) {
		console.log('marker click trigger');
		// $scope.$apply(function() {
		var id = marker.get('missionId');
		$scope.markerPosition = marker.get("position");
		if ($scope.currentMarker >= 0) {
			if ($scope.currentMarker == id) {
				console.log('hitting same marker ' + id);
				$scope.hidePopover();
			} else {
				console.log('hitting another marker ' + id);
				$scope.showPopover(id);
			}
		} else {
			console.log('hitting new marker ' + id);
			$scope.showPopover(id);
		}
		// });
	}

	// Do this to reload map when switching tabs - fixes an issue between ionic and google-maps
	$scope.refreshMap = function() {
		setTimeout(function() {
			$scope.refreshMap_();
		}, 1);
		//Need to execute it this way because the DOM may not be ready yet
	};

	$scope.refreshMap_ = function() {
		var div = document.getElementById('map_canvas');
		if ($scope.map) {
			helperService.reattachMap($scope.map, div);
		} else {
			createMap();
		}
	};

});
