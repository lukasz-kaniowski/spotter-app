/**
 * @author michel-habib
 */
'use strict';

angular.module('SpotterApp').factory('missionsService', function (genericService, Restangular, $log) {

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
      return genericService.ajaxCallArray('missions', args);
    },
    getMission: function (id) {
      return Restangular.one('missions', id).get();
    }
  };
});
