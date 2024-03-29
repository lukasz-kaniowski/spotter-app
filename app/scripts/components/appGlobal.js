'use strict';
/**
 * @author michel-habib
 */

angular.module('SpotterApp').factory('appGlobal', function($q, CONFIG) {
	var deferrer = $q.defer();
	return {
		// Application is ready to start
		ready : deferrer.promise,
		// application is online
		online : false,
		// application is running from device, not desktop/laptop
		onDevice : false,
		// desktopVersion
		desktopVersion : 1,
		// App Current Language
		language : CONFIG.defaultLanguage,
		geoPosition : CONFIG.defaultGeolocation,
		// Mission State
		missionsMap:false,
		currentMarker: -1,
		missionsTab: 1,
		geoPositionTime: null,
		geoLocation : null,
		forceGeoLocation : false, // user has forced the selection of an Area
		pMissions: null,
		getReady : function(val) {
			if (val)
				{deferrer.resolve(true);}
			else
				{deferrer.reject(false);}
		},
		setPosition : function(lat, lng, location, force) {
			this.geoPosition = {
				coords : {
					latitude : lat,
					longitude : lng
				},
				timestamp : 0 // TODO should this be zero or current time? or carry over the latest position timestamp? or separate the gps timestamp in a separate variable
			};
			this.geoLocation = location;
			this.forceGeoLocation = force;
		}
	};
});
