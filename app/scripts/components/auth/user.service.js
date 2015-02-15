'use strict';

angular.module('SpotterApp')
  .factory('User', function ($resource, CONFIG) {
    return $resource(CONFIG.apiEndpoint + '/api/users/:id/:controller', {
        id: '@_id'
      },
      {
        changePassword: {
          method: 'PUT',
          params: {
            controller: 'password'
          }
        },
        get: {
          method: 'GET',
          params: {
            id: 'me'
          }
        }
      });
  });
