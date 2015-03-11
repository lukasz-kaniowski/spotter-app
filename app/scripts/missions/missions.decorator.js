'use strict';

angular.module('SpotterApp').factory('missionsDecorator', function() {
	var decorateListMissions = function(missions) {
    missions.forEach(function (mission) {
      var dueDate = new Date(mission.dueDate);
      var curDate = new Date();
      mission.daysLeft = parseInt((dueDate-curDate)/(24*3600*1000));

    });
    return missions;
	};

	return {
		decorate : function(action, missions) {
      console.log('mission missions', missions);
			switch (action) {
			case 'listMissions':
				return decorateListMissions(missions);
				break;
			}
		}
	};
});
