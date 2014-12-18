/**
 * @author michel-habib
 */

angular.module('SpotterApp')
.factory('appServices', function ($q, $ionicPlatform, $rootScope, $window, appGlobal, $cordovaStatusbar, $cordovaKeyboard) {
	var checkIfPluginsInstalled = function () {
		var inactivePlugins = "";
		if (!window.cordova) {			
			console.log("Error: Cordova is not loaded!");
			// Do not check the rest, since some plugins depend on window.cordova
			return false;
		}		 
		if (!window.StatusBar) {
			inactivePlugins += "$cordovaStatusbar,";
		}
		if (!window.cordova.plugins.Keyboard) {
			inactivePlugins += "$cordovaKeyboard,";
		}
		if (!window.device) {
			inactivePlugins += "$cordovaDevice,";
		}
		if (!navigator.geolocation) {
			inactivePlugins += "$cordovaGeolocation,";
		}
		if (!navigator.splashscreen) {
			inactivePlugins += "$cordovaSplashscreen,";
		}		
		if (!window.console) {
			inactivePlugins += "$cordovaConsole,";
		}
		if (!plugin.google.maps) {
			inactivePlugins += "$cordovaGoogleMaps,";
		}

		/*									
		if (inactivePlugins) {
			console.log("Error: missing plugins: "+inactivePlugins);
			return false;	
		}
		*/		
		else return true;
	};
	
	// Set Network Status and setup Events, TODO check if we can move this to ngCordova
	var setNetworkStatusEvents	=  function() {
		// Initial Online Status
		// TODO check when network connected but no internet - happens @ Office - hint, try to download a file or something
		// http://stackoverflow.com/questions/20540150/cordova-checking-wifi-connection-to-internet
		var isOnline = $cordovaNetwork.isOnline();
		// $cordovaNetwork.setupListeners();
		if (isOnline) {
			appGlobal.online = true;
	        console.log('App is online');
		} else {
			appGlobal.online = false;
	        console.log('App is offline');
		}
		
		ionic.on("offline",function() {
			console.log('App is offline');
	        appGlobal.online = false;
		});
		ionic.on("online",function() {
	        console.log('App is online');
	        appGlobal.online = true;
		});
	};
	
    return {
    	currentVersion:	0,
    	errorMsg: "", 
    	initApp: function() {
    		var zis = this;
    		function errorCallback(reason) {
    			console.log("Error: initApp Error - " + reason);
    		};
    		function setAppReady() {
    	        appGlobal.getReady(true);
    	        return appGlobal.ready;
    		};
    		$ionicPlatform.ready(function() {			    	    			
				    console.log('Ionic Platform ready!');
					// deviceServices.getLocation(false);
				    if (!checkIfPluginsInstalled()) {
					    // Running on Chrome
				    	appGlobal.onDevice = false;
				    	appGlobal.online = true;
				    	setAppReady()
				    	.catch(errorCallback);
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
			        	setAppReady()
			        	.catch(errorCallback);
				    }		        	    		    
			  });    	
    	},
    };
});