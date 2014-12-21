'use strict';

angular.module('SpotterApp').factory('missionsDecorator', function() {
	var decorateListMissions = function() {
	/*
		
		for (var i in data) {
			// Distance
			// Time Diff
			// data[i].timeDiff =
		}
		return data;
	*/
	};
	return {
		decorate : function(action, data) {
			switch (action) {
			case 'listMissions':
				decorateListMissions(data);
				break;
			}
		}
	};
});