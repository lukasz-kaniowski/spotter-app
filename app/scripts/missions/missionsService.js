/**
 * @author michel-habib
 */
'use strict';

angular.module('SpotterApp').factory('missionsService', function (genericService, Restangular) {

  return {
    getMissions: function (args) {
      return genericService.ajaxCallArray('missions', args);
    },
    getMission: function (id) {
      return Restangular.one('missions', id).get();
    }
  };
});
