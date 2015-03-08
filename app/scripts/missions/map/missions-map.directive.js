'use strict';

// TODO add button to move to the closest mission on the map
// TODO add fallback for js maps
// TODO check Geolocation is working in all conditions on ios and android
// TODO map should work on different device sizes
// test on android and ios [DONE]
// fix any jshint issues [DONE]
// create sass formatting of html marker [DONE] - need more details about the style of the app
// reuse missions results and location results in both list and map [Done]
// use restangular instead of native $resource [DONE]
// Move Map Controller to a Maps Directive [DONE]
// adjust layer location of the popover when it is off the frame? [DONE]
// use angular instead of jquery to create html div [DONE]
//  test with many markers [DONE]

/*global plugin */

angular.module('SpotterApp.missions.list', [])
  .config(function () {
    // TODO any configuration needed for the map?
    // TODO configuration for fallback js map?
  })
  .directive('missionsMap', function () {
    return {
      restrict: 'A',
      replace: true,
      controller: 'MissionsMapCtrl',
      templateUrl: 'scripts/missions/map/missions-map.html',
      scope: {
        missions: '='
      }
    };
  }).controller('MissionsMapCtrl', function ($scope, appGlobal, helperService, $interval, $state) {
    console.log('MissionsMapCtrl');
    $scope.show = false;
    $scope.frameCss = {
      left: 0,
      top: 0
    };
    $scope.frameLocation = [0, 0];


    function run() {
      appGlobal.missionsTab = 2;
      showMissions($scope.missions)
    }

    function showMissions(missions) {
      // TODO remove temp data
      $scope.missions = missions;
      // Show map
      $scope.loadMap();
    }

    function createMap() {

      function onMapInit(map) {
        console.log('Map Initialized');
        map.on(plugin.google.maps.event.MAP_CLICK, onMapClick);
      }

      if (appGlobal.onDevice) {
        plugin.google.maps.Map.isAvailable(function (isAvailable, message) {
          message = message;
          if (isAvailable) {
            var div = document.getElementById('map_canvas');
            if (div) {
              $scope.map = plugin.google.maps.Map.getMap(div);
              $scope.map.clear();
              $scope.map.off();
              $scope.map.addEventListener(plugin.google.maps.event.MAP_READY, onMapInit);
              populateMap();
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

    function onMapClick() {
      console.log('map click trigger');
      $scope.hidePopover();
    }

    function refreshFramePosition() {
      if ($scope.show) {
        $scope.map.fromLatLngToPoint($scope.markerPosition, function (point) {
          if ($scope.frameLocation[0] !== point[0] || $scope.frameLocation[1] !== point[1]) {
            $scope.frameLocation[0] = point[0];
            $scope.frameLocation[1] = point[1];
            var left, top;
            left = point[0] - 159;
            top = point[1] - 172;
            $scope.frameCss = {
              'left': left + 'px',
              'top': top + 'px'
            };
            // Update the children position.
            $scope.map.refreshLayout();
          }
        });
      }
    }


    $scope.gotoMission = function (id) {
      $interval.cancel($scope.timer);
      $scope.timer = undefined;
      console.log("click goto mission " + id + " current marker " + appGlobal.currentMarker);
      $state.transitionTo('app.mission', {
        'missionId': appGlobal.currentMarker
      });
    };

    $scope.hidePopover = function () {
      console.log('hide popover');
      appGlobal.currentMarker = -1;
      $scope.show = false;
      $interval.cancel($scope.timer);
      $scope.timer = undefined;
      // TODO should we clear any map events?
      // map.off();
    };

    $scope.showPopover = function (id) {

      if ($scope.timer) {
        $interval.cancel($scope.timer);
      }
      $scope.show = false;
      console.log('show popover');
      appGlobal.currentMarker = id;
      $scope.mission = $scope.missions[appGlobal.currentMarker];
      $scope.map.getCameraPosition(function (camera) {
        // $scope.$apply(function() {
        $scope.map.animateCamera({
          'target': $scope.markerPosition,
          'zoom': camera.zoom,
          'duration': 500
        }, function () {
          $scope.show = true;
          $scope.timer = $interval(function () {
            refreshFramePosition();
          }, 100);
        });
        // });
      });
    };

    function populateMap(map) {
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

      console.log('populating map');

      if (!appGlobal.missionsMap) {
        // centering map on closest mission, or on current gps location if no missions nearby.
        if ($scope.missions.length > 0) {
          latLng = new plugin.google.maps.LatLng($scope.missions[0].address.coordinates[0], $scope.missions[0].address.coordinates[1]);
        } else {
          latLng = new plugin.google.maps.LatLng(appGlobal.geoPosition.coords.latitude, appGlobal.geoPosition.coords.longitude);
        }

        $scope.map.animateCamera({
          'target': latLng,
          'zoom': 12,
          'duration': 500
        });
      }
      createMarkers();
      appGlobal.missionsMap = true;
    }

    function createMarkers() {
      var latLng;

      function onMarkerClick(marker) {
        // console.log('marker click trigger');
        // $scope.$apply(function() {
        var id = marker.get('missionId');
        $scope.markerPosition = marker.get('position');
        if (appGlobal.currentMarker >= 0) {
          if (appGlobal.currentMarker === id) {
            // console.log('hitting same marker ' + id);
            $scope.hidePopover();
          } else {
            // console.log('hitting another marker ' + id);
            $scope.showPopover(id);
          }
        } else {
          // console.log('hitting new marker ' + id);
          $scope.showPopover(id);
        }
        // });
      }

      for (var m = 0; m < $scope.missions.length; m++) {
        latLng = new plugin.google.maps.LatLng($scope.missions[m].address.coordinates[0], $scope.missions[m].address.coordinates[1]);
        var iconMarker = helperService.createMarkerIcon($scope.missions[m].price, 'PLN');
        $scope.map.addMarker({
          'position': latLng,
          'missionId': m,
          'icon': iconMarker
        }, function (marker) {
          marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, onMarkerClick);
          if (marker.get('missionId') === appGlobal.currentMarker) {
            $scope.markerPosition = marker.get('position');
            $scope.showPopover(appGlobal.currentMarker);
          }
        });
      }
    }


    $scope.$on('$destroy', function () {
      if ($scope.timer) {
        $interval.cancel($scope.timer);
      }
    });
    // Do this to reload map when switching tabs - fixes an issue between ionic and google-maps
    $scope.loadMap = function () {
      setTimeout(function () {
        $scope.refreshMap_();
      }, 1);
      //Need to execute it this way because the DOM may not be ready yet
    };

    $scope.refreshMap_ = function () {
      var div = document.getElementById('map_canvas');
      if ($scope.map) {
        helperService.reattachMap($scope.map, div);
      } else {
        createMap();
      }
    };

    if (appGlobal.onDevice) {
      run();
    }

  });
