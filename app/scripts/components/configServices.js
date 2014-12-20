'use strict';

/**
 * @author michel-habib
 */

angular.module('SpotterApp').factory('configService', function() {
	return {
		defaultGeolocation : {
			coords : {
				latitude : 31.234517,
				longitude : 29.949524
			},
			timestamp : 0
		},
		deviceOnly : false, // force app to run on device only
		geoTimeStep : 1000 * 60 * 5, // 5 minutes, the time to cache geo location
		defaultLanguage : 'en'
	};
});
