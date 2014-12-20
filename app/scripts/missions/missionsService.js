/**
 * @author michel-habib
 */

angular.module('SpotterApp').factory('missionsService', function (genericService, $http) {

  return {
    getMissions: function (args) {
      return genericService.ajaxCall_array('missions', args);
    }
  };
});
