'use strict';

/*global plugin */

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
 
}).controller('MissionListCtrl', function($log, $scope, $q, missionsService, deviceServices, appGlobal, helperService, $rootScope) {
	$log.debug('MissionListCtrl');
	$scope.updated = false;
	
	var myInfo = null;
	var timer = null;
	
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
		// For the List
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
		  map = map;
		  $rootScope.$apply(function() {
		      console.log('Map Ready');
		      updateMap();
        });
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
						$scope.map.addEventListener(plugin.google.maps.event.MAP_READY, onMapInit);
					} else {
						console.log('google maps plugin - div is not available');
					}
				} else {
					console.log('google maps plugin is not available - '+ message);
				}
			});
		} else {
			console.log('google maps plugin is not available - not running on a device ');
		}
	}

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
		if ($scope.missions.length > 0) {
			latLng = new plugin.google.maps.LatLng($scope.missions[0].address.coordinates[0], $scope.missions[0].address.coordinates[1]);
		} else {
			latLng = new plugin.google.maps.LatLng(appGlobal.geoPosition.coords.latitude, appGlobal.geoPosition.coords.longitude);
		}
		latLng = new plugin.google.maps.LatLng(appGlobal.geoPosition.coords.latitude, appGlobal.geoPosition.coords.longitude);
		latLng = new plugin.google.maps.LatLng(52.230938, 21.009537);

		$scope.map.animateCamera({
			'target' : latLng,
			'zoom' : 12,
			'duration' : 2000
		});
		createMarkers();
		$scope.updated = true;
	}

	function createMarkers() {
		var latLng;
		
		// Icons can be added as base64 but wont work on Android 2.3
		 
		var icon = "data:image/png;base64,iVBORw0KGgo...CC";
		var canvas = document.createElement('canvas');
		canvas.width = 50;
		canvas.height = 55;
		var context = canvas.getContext('2d');

	  	// draw rectangle
	  	context.fillStyle = "rgba(72,195, 232, 0.8)";
		context.fillRect(0, 0, 50, 45);
		// draw triangle tip
		context.beginPath();
		context.moveTo(15, 45);
		context.lineTo(35, 45);
		context.lineTo(25, 55);
		context.lineTo(15, 45);
        context.strokeStyle = "rgba(0,0, 255, 0)";
		context.stroke();
		context.closePath();
	  	context.fillStyle = "rgba(72,195, 232, 0.8)";
		context.fill();

		context.font = '16pt Arial';
		context.fillStyle = 'white';
		var x = canvas.width / 2;
	  	var y = canvas.height / 2;
	  	context.textAlign = 'center';
	  	context.fillText('15', x, y-5);
		context.font = '12pt Arial';
	  	context.fillText('GBP', x, y+10);

	  	var canvasData = canvas.toDataURL('image/png'); 
		latLng = new plugin.google.maps.LatLng(52.230938, 21.009537);

		$scope.map.addMarker({
			'position' : latLng,
			// 'title': 'tamam',
			'icon': canvasData
		}, function(marker) {
				    marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function(marker) {
					  var map = marker.getMap();
					  console.log('marker click trigger');
					  if (!myInfo) {
					    	myInfo = createMyInfo(marker);
					  }	  	
				    });				    
			  });
			  /*
		for (var m = 5; m < $scope.missions.length; m++) {
			console.log('mission ' + m);
			// console.log($scope.missions[m]);
			latLng = new plugin.google.maps.LatLng($scope.missions[m].address.coordinates[0], $scope.missions[m].address.coordinates[1]);
			// var canvasData = canvas.toDataURL('image/png'); 
			// console.log(canvasData);
			$scope.map.addMarker({
				'position' : latLng,
				'title': ["15", "GBP"].join("\n"), // $scope.missions[m].price + ' GPB',
				'snippet': 'snippet text here',
				'icon': '../images/1x1.png',
				'styles' : {
				    'text-align': 'center',
				    'font-style': 'italic',
				    'font-weight': 'bold',
				    'color': 'blue',
				    'background-color': '#0000bb'
				  }
			}, function(marker) {
				    console.log('show the marker');
				    marker.showInfoWindow();
				    // marker.trigger(plugin.google.maps.event.MARKER_CLICK);
				    	
				    marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function(marker) {
					  console.log(marker);
					  var map = marker.getMap();
					  console.log('marker click trigger');
					  if (!myInfo) {
					    // myInfo = createMyInfo(marker);
					  }	  	
				    });				    
				    // 
				    
				  });
		}
		*/
		
	}

	function onMarkerClicked() {
	  var marker = this;
	  console.log(this);
	  var map = marker.getMap();
	  console.log('marker click trigger');
	  if (!myInfo) {
	    myInfo = createMyInfo(marker);
	  }	  
	}
	
	function createMyInfo(marker) {
	  $("#infoWnd_frame").trigger("remove");
	  
	  var frame = $("<div id='infoWnd_frame'>");
	  var map = marker.getMap();
	  var beforePoint = [];
	  var updatePosition = function() {
	    map.fromLatLngToPoint(marker.get("position"), function(point) {
	      if (beforePoint[0] != point[0] || beforePoint[1] != point[1]) {
	      	if (frame) {
		        frame.css({
		          "left": point[0] - 108,
		          "top": point[1] - 180
		        });	      		
	      	} else {
	    		console.log("updatePosition: cannot get frame "+marker.get("mytitle"));
	      	}
	        // Update the children position.
	        map.refreshLayout();
	      }
	      beforePoint = point;
	    });
	  };
	  timer = setInterval(updatePosition, 200);
	  
	  var removeInfoWnd = function() {
	    clearInterval(timer);
	    frame.remove();
	    frame = null;
	    timer = null;
	    map.off();
	  };
	  frame.on("click", removeInfoWnd);
	  map.on(plugin.google.maps.event.MAP_CLICK, removeInfoWnd);
	  frame.one("remove", removeInfoWnd);
	  
	  $("<div id='infoWnd_body'>").append("<div class='div1'>15<br>GBP<br>&nbsp;</div><div class='div2'>A GOOD Foundation<br>Debenhanms<br>5497.7 kms away</div>").appendTo(frame);
	  
	  map.fromLatLngToPoint(marker.get("position"), function(point) {
	    if (frame) {
		    frame.css({
		      "left": point[0] - 108,
		      "top": point[1] - 180
		    });	    	
	    } else {
	    		console.log("createMyInfo: cannot get frame "+marker.get("mytitle"));
	      	}
	    $("#myOverlay").append(frame);
	    
	    // Update the children position.
	    map.refreshLayout();
	    beforePoint = point;
	  });
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
