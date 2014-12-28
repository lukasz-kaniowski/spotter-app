'use strict';
/**
 * @author michel-habib
 */

/*global plugin */

angular.module('SpotterApp').factory('deviceServices', function($cordovaGeolocation, $q, CONFIG, appGlobal) {
	var detectionInProgress = false;
	var deferrer;
	return {
		checkIfPluginsInstalled : function() {
			var inactivePlugins = '';
			if (!window.cordova) {
				console.log('Error: Cordova is not loaded!');
				// Do not check the rest, since some plugins depend on window.cordova
				return false;
			}
			if (!window.StatusBar) {
				inactivePlugins += '$cordovaStatusbar,';
			}
			if (!window.cordova.plugins.Keyboard) {
				inactivePlugins += '$cordovaKeyboard,';
			}
			if (!window.device) {
				inactivePlugins += '$cordovaDevice,';
			}
			if (!navigator.geolocation) {
				inactivePlugins += '$cordovaGeolocation,';
			}
			if (!navigator.splashscreen) {
				inactivePlugins += '$cordovaSplashscreen,';
			}
			if (!window.console) {
				inactivePlugins += '$cordovaConsole,';
			}
			if (!plugin.google.maps) {
				inactivePlugins += '$cordovaGoogleMaps,';
			}

			if (inactivePlugins) {
				console.log('Error: missing plugins: ' + inactivePlugins);
				return false;
			} else {
				return true;
			}
		},
		detectCurrentPosition : function(force) {
			var q = $q.defer();
			deferrer = q;
			var geolocationOptions = CONFIG.geolocationOptions;
			detectionInProgress = true;
			// if we are not forced to re-detect location
			if (!force) {
				// check if position was acquired recently
				if (appGlobal.geoPositionTime) {
					// is the difference bigger than max cache size?
					var diff = Date.now() - appGlobal.geoPositionTime;
					if (diff<CONFIG.geoTimeStep) {
						q.resolve(appGlobal.geoPosition);
						return q.promise;
					}
				}
			}

			var geolocationSuccess = function(position) {
				detectionInProgress = false;
				console.log('Got geolocation Position - ' + JSON.stringify(position));
				appGlobal.geoPosition = position;
				q.resolve(position);
			};
			var geolocationError = function(error) {
				detectionInProgress = false;
				// Cannot Get Position - not a fatal error
				console.log('Cannot get geolocation Position - code: ' + error.code + ' message: ' + error.message);
				appGlobal.geoPosition = CONFIG.defaultGeolocation;
				q.resolve(appGlobal.geoPosition);
				// q.reject(error);
			};

			$cordovaGeolocation.getCurrentPosition(geolocationOptions).then(geolocationSuccess, geolocationError);
			return q.promise;
		}
	};
});