/**
 * @author michel-habib
 */
'use strict';

angular.module('SpotterApp').factory('missionsService', function (Restangular, $http, CONFIG) {

  Restangular.extendModel('missions', function (model) {
    model.accept = function () {
      return model.customPUT({}, 'accept');
    };
    model.reject = function () {
      return model.customDELETE('accept');
    };

    return model;
  });

  return {
    getMissions: function (args) {
      return Restangular.all('missions').getList(args);
    },
    getMission: function (id) {
      return Restangular.one('missions', id).get();
    }
  };
});
