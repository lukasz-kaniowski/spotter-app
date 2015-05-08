'use strict';

angular.module('SpotterApp')
  .factory('imageService', function ($cordovaCamera, $q) {
    var get_picture = function (source) {
      var options = {
        quality: 50,
        sourceType: source,
        destinationType: Camera.DestinationType.FILE_URI
      };

      return $cordovaCamera.getPicture(options);
    };

    return {
      album: function () {
        return get_picture(Camera.PictureSourceType.PHOTOLIBRARY);
      },
      camera: function () {
        return get_picture(Camera.PictureSourceType.CAMERA);
      }
    };
  });
