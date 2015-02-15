'use strict';
/**
 * @author michel-habib
 */

/*global ionic */

angular.module('SpotterApp').factory('appServices', function($q, $ionicPlatform, $rootScope, $window, appGlobal, deviceServices, $cordovaStatusbar) {

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
					// hide keyboard accessory bar TODO uncomment - causes crash in iOS
					// $cordovaKeyboard.hideAccessoryBar();
					// show app in full screen
					ionic.Platform.fullScreen(false, true);
					// show status bar
					$cordovaStatusbar.style(0);
//					$cordovaStatusbar.overlaysWebView(false);
//					$cordovaStatusbar.show();
					// TODO get online status and set events
					// setNetworkStatusEvents();
					setAppReady().catch(errorCallback);
				}
			});
		}
	};
});
