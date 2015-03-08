'use strict';

angular.module('SpotterApp.missions')
  .directive('singleMissionMap', function (appGlobal) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div id="mission_map_canvas"></div>',
      scope: {
        mission: '='
      },
      link: function (scope, element, attrs) {
        console.log('singleMissionMap, mission: ',  scope.mission);

        createMap();

        scope.populateMap = function () {
          // center map on mission
          var latLng = new plugin.google.maps.LatLng(scope.mission.address.coordinates[0], scope.mission.address.coordinates[1]);
          console.log("center on " + scope.mission.address.coordinates[0] + " and " + scope.mission.address.coordinates[1]);
          scope.map.animateCamera({
            'target': latLng,
            'zoom': 14,
            'duration': 500
          });
          // show address in info window
          var icon = 'www/images/icon.png';
          console.log(location.path);
          scope.map.addMarker({
            'position': latLng,
            'icon': icon,
            'title': scope.mission.title,
            'snippet': ['address line 1', 'address line 2', 'address line 3'].join("\n\r")
          }, function (marker) {
            // marker.showInfoWindow();
          });
        };

        function createMap() {

          function onMapInit(map) {
            console.log('Mission Map Initialized');
            // map.on(plugin.google.maps.event.MAP_CLICK, onMapClick);
          }

          if (appGlobal.onDevice) {
            plugin.google.maps.Map.isAvailable(function (isAvailable, message) {
              if (isAvailable) {
                var div = document.getElementById('mission_map_canvas');
                if (div) {
                  scope.map = plugin.google.maps.Map.getMap(div);
                  scope.map.clear();
                  scope.map.off();
                  scope.map.addEventListener(plugin.google.maps.event.MAP_READY, onMapInit);
                  scope.populateMap();
                  scope.map.refreshLayout();
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

      }
    };
  });
