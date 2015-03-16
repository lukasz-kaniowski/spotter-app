'use strict';

angular.module('SpotterApp').factory('missionsDecorator', function() {
  var decorateListMissions = function (missions) {
      missions.forEach(function (mission) {
        var dueDate = new Date(mission.dueDate);
        var curDate = new Date();
        mission.daysLeft = parseInt((dueDate - curDate) / (24 * 3600 * 1000));

      });
      return missions;
    },
    decorateMyMissions = function (missions) {
      var _missions = {};
      _missions.booked = [];
      _missions.review = [];
      _missions.closed = [];
      angular.forEach(missions, function (v) {
        if (v.dueDate) {
          var date = new Date(v.dueDate);
          v.daysLeft = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        }
        _missions[v.state].push(v);
      });
      return _missions;
    };

  return {
    decorate : function(action, missions) {
      switch (action) {
        case 'listMissions':
          return decorateListMissions(missions);
          break;
        case 'myMissionsList':
          return decorateMyMissions(missions);
          break;
      }
    }
  };
});
