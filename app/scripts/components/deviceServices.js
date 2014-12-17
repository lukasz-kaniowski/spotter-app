/**
 * @author michel-habib
 */

angular.module('SpotterApp')
.factory('deviceServices', function ($cordovaGeolocation, $q, CONFIG, appGlobal, configService) {
	var detectionInProgress = false;	 
	var deferrer;
    return {
    	detectCurrentPosition: function(force) {
    			// TODO use force
			    var q = $q.defer();
			    deferrer = q;			    
	         	var geolocationOptions = CONFIG.geolocationOptions;
				detectionInProgress = true;	 
	         	
	    		var geolocationSuccess = function(position) {
					detectionInProgress = false;	 
	    			console.log("Got geolocation Position - "+JSON.stringify(position));
	    			appGlobal.geoPosition = position;
	    			q.resolve(position);
	    		};
	    		var geolocationError = function(error) {
					detectionInProgress = false;	 
	    			// Cannot Get Position - not a fatal error
	    			console.log("Cannot get geolocation Position - code: "+error.code+" message: "+error.message);
	    			q.reject(error);
	    		};
         	  
		       $cordovaGeolocation.getCurrentPosition(geolocationOptions)
		       .then( geolocationSuccess, geolocationError);
		       return q.promise;    		
    	}  				
   	};
});