/**
 * @author michel-habib
 */

angular.module('SpotterApp').factory('missionsService', function (genericService, $http) {	 
	 			
    return {
		listMissions : function(args){
			return genericService.ajaxCall_array('missions', args);
		},
   }; // END OF User Service return value
});