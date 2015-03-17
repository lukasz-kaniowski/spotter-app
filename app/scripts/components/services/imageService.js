/**
 * @author michel-habib
 */
'use strict';

angular.module('SpotterApp')
  .factory('imageService', function () {
    var get_picture = function (source, callback) {
      navigator.camera.getPicture(
        function (imageURI) {
          callback(imageURI);
        },
        function (fail) {
          // fail or cancel
          callback(false);
          console.log(fail);
        },
        {
          quality: 50,
          sourceType: source,
          destinationType: navigator.camera.DestinationType.FILE_URI
        });
    };
    return {
      album : function (callback) {
        get_picture(Camera.PictureSourceType.PHOTOLIBRARY, callback);
      },
      camera : function (callback) {
        get_picture(Camera.PictureSourceType.CAMERA, callback);
      }
    };
  });
