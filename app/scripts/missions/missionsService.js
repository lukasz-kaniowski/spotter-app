/**
 * @author michel-habib
 */
'use strict';

angular.module('SpotterApp').factory('missionsService', function (Restangular, $http, CONFIG) {

  Restangular.extendModel('missions', function (model) {
    model.book = function () {
      return model.customPUT({}, 'book');
    };
    model.cancel = function () {
      return model.customDELETE('book');
    };

    return model;
  });

  return {
    getMissions: function (args) {
      return Restangular.all('missions').getList(args);
    },
    getMission: function (missionId) {
      return Restangular.one('missions', missionId).get();
    },
    getUserMissions: function () {
      return Restangular.all('missions/me').getList();
    }
  };
});
