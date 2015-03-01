'use strict';

angular
  .module('SpotterApp.missions.show', [])

  .config(function ($stateProvider) {

    $stateProvider
      .state('app.mission', {
        url: '/missions/:missionId/locations/:locationId',
        views: {
          'menuContent': {
            templateUrl: 'scripts/missions/show/missions-show.html',
            controller: 'MissionShowCtrl',
            resolve: {
              mission: function ($log, $stateParams, missionsService) {
                return missionsService.getMission($stateParams.missionId, $stateParams.locationId);
              }
            }
          }
        }
      });

  })

  .controller('MissionShowCtrl', function ($log, $scope, mission, $ionicModal, $state, appGlobal) {
    $log.debug('MissionShowCtrl', mission);
    createMap();

    function setMission(mission) {
      $scope.mission = mission;
      if (mission.state === 'active') {
        $scope.dueTime = mission.dueDate;
        $scope.triggerAction = openModal;
        $scope.buttonLabelKey = 'Missions.Show.AcceptButton';
      } else if (mission.state === 'booked') {
        $scope.dueTime = mission.bookingDueTime;
        $scope.triggerAction = startMission;
        $scope.buttonLabelKey = 'Missions.Show.StartButton';
      }
      //return;
    }

    function openModal() {
      $scope.modal.show();
    }

    function startMission() {
      $state.go('startMission');
    }

    setMission(mission);

    $scope.accept = function () {
      mission.accept().then(setMission).then($scope.closeModal);
    };

    $ionicModal.fromTemplateUrl('scripts/missions/show/activate.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });


    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

	// Map Related Functions
	function createMap() {

		function onMapInit(map) {
			console.log('Mission Map Initialized');
			// map.on(plugin.google.maps.event.MAP_CLICK, onMapClick);
		}

		if (appGlobal.onDevice) {
			plugin.google.maps.Map.isAvailable(function(isAvailable, message) {
				message = message;
				if (isAvailable) {
					var div = document.getElementById('mission_map_canvas');
					if (div) {
						$scope.map = plugin.google.maps.Map.getMap(div);
						$scope.map.clear();
						$scope.map.off();
						$scope.map.addEventListener(plugin.google.maps.event.MAP_READY, onMapInit);
						$scope.populateMap();
						$scope.map.refreshLayout();
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

	$scope.populateMap = function() {
		// center map on mission
		var latLng = new plugin.google.maps.LatLng($scope.mission.address.coordinates[0], $scope.mission.address.coordinates[1]);
		console.log("center on "+ $scope.mission.address.coordinates[0] + " and "+ $scope.mission.address.coordinates[1]);
		$scope.map.animateCamera({
			'target' : latLng,
			'zoom' : 14,
			'duration' : 500
		});
		// show address in info window
		var icon = 'www/images/icon.png';
		console.log(location.path);
		$scope.map.addMarker({
			'position' : latLng,
			'icon'	: icon,
			'title': $scope.mission.title,
  			'snippet': ['address line 1', 'address line 2', 'address line 3'].join("\n\r"),
		}, function(marker) {
			// marker.showInfoWindow();
		});
	};


  });
