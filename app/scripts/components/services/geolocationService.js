/**
 * @author michel-habib
 */
'use strict';

angular.module('SpotterApp')
  .factory('geolocationService', function ($q, CONFIG) {
    var getDistance = function (lon1, lat1, lon2, lat2) {
      var R = 6371; // Radius of the earth in km
      var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
      var dLon = (lon2-lon1).toRad();
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in km
      return d * 100;
    }

    /** Converts numeric degrees to radians */
    if (typeof(Number.prototype.toRad) === "undefined") {
      Number.prototype.toRad = function() {
        return this * Math.PI / 180;
      }
    }
    return {
      checkDistance : function (lng, lat) {
        var defer = $q.defer();
        navigator.geolocation.getCurrentPosition(function(pos){
          defer.resolve(getDistance(pos.coords.longitude, pos.coords.latitude, lng, lat));
        }, defer.reject, CONFIG.geolocationOptions);
        return defer.promise;
      }
    };
  });
