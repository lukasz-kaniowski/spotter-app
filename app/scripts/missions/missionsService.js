/**
 * @author michel-habib
 */
'use strict';

angular.module('SpotterApp').factory('missionsService', function(genericService) {

	return {
		getMissions : function(args) {
			return genericService.ajaxCallArray('missions', args);
		}
	};
});
