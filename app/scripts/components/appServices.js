'use strict';
/**
 * @author michel-habib
 */

angular.module('SpotterApp').factory('appServices', function($q, $ionicPlatform, $rootScope, $window, appGlobal, deviceServices, $cordovaStatusbar, $cordovaKeyboard) {
	
	return {
		currentVersion : 0,
		errorMsg : '',
		initApp : function() {
			// var zis = this;
			function errorCallback(reason) {
				console.log('Error: initApp Error - ' + reason);
			}
			function setAppReady() {
				appGlobal.getReady(true);
				return appGlobal.ready;
			}
			$ionicPlatform.ready(function() {
				console.log('Ionic Platform ready!');
				// deviceServices.getLocation(false);
				if (!deviceServices.checkIfPluginsInstalled()) {
					// Running on Chrome
					appGlobal.onDevice = false;
					appGlobal.online = true;
					setAppReady().catch(errorCallback);
				}
				// Running on Device
				else {
					// Running on Device
					appGlobal.onDevice = true;
					// get device info
					var deviceInfo = ionic.Platform.device();
					console.log('*** Device Detected: ' + JSON.stringify(deviceInfo));
					// show status bar
					$cordovaStatusbar.show();
					// hide keyboard accessory bar
					$cordovaKeyboard.hideAccessoryBar();
					// show app in full screen
					ionic.Platform.fullScreen(true, true);
					// TODO get online status and set events
					// setNetworkStatusEvents();
					setAppReady().catch(errorCallback);
				}
			});
		},
	};
});