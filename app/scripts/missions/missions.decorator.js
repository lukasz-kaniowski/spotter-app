'use strict';

angular.module('SpotterApp').factory('missionsDecorator', function() {
	var decorateListMissions = function(data) {
		for (var i in data) {
			var dueDate = new Date(data[i].dueDate);
			var curDate = new Date();			
			data[i].daysLeft = parseInt((dueDate-curDate)/(24*3600*1000));
		}
		return data;
	};
	return {
		decorate : function(action, data) {
			switch (action) {
			case 'listMissions':
				return decorateListMissions(data);
				break;
			}
		}
	};
});