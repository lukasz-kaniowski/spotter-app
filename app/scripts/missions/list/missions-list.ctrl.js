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
    
 	$scope.refreshMap = function() {
        setTimeout(function () {
            $scope.refreshMap_();
        }, 1); //Need to execute it this way because the DOM may not be ready yet
    };

    $scope.refreshMap_ = function() {
      var div = document.getElementById("map_canvas");
        if ($scope.map) reattachMap($scope.map,div);
    };
    
    function Run() {
	    // get location
	    deviceServices.detectCurrentPosition(true)
	    // List Missions
	    .then(getMissions)
	    .then(showMissions);
	}		
	
	appGlobal.ready.then(function() {
		Run();			
	});


    function getMissions() {
    	var geoLocation = appGlobal.geoPosition.coords.latitude+','+ appGlobal.geoPosition.coords.longitude;
	    return missionsService.listMissions({location:geoLocation});    	
    }
    
    function showMissions(missions) {
		function onMapInit(map) {
		  // alert("The google map is available on this device.");
		   // map.showDialog();
		};		        	      				
    	$scope.missions = missions;
    	// var button = document.getElementById("button");
      	// button.addEventListener("click", onBtnClicked, false);
		if (appGlobal.onDevice)  {
			plugin.google.maps.Map.isAvailable(function(isAvailable, message) {
			    if (isAvailable) {
			      	var div = document.getElementById("map_canvas");
			      	$scope.map = plugin.google.maps.Map.getMap(div);
				    $scope.map.addEventListener(plugin.google.maps.event.MAP_READY, onMapInit);
			    } else {
			      	alert(message);
			    }
			  });
		}
    }


	function reattachMap(map,div) {
	  if (!isDom(div)) {
	    console.log("div is not dom");
	    return map;
	  } else {
	    map.set("div", div);
	    map.refreshLayout();
	
	    while(div.parentNode) {
	      div.style.backgroundColor = 'rgba(0,0,0,0)';
	      div = div.parentNode;
	    }
	
	    return map;
	  }
	}
	
	function isDom(element) {
	  return !!element &&
	         typeof element === "object" &&
	         "getBoundingClientRect" in element;
	}
	
	/*
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
    */
  });
