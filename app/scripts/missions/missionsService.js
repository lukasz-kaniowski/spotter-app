/**
 * @author michel-habib
 */
'use strict';

angular.module('SpotterApp').factory('missionsService', function (Restangular, $q, CONFIG) {

  Restangular.extendModel('missions', function (model) {
    model.book = function () {
      return model.customPUT({}, 'book');
    };
    model.cancel = function () {
      return model.customDELETE('book');
    };

    return model;
  });
  console.log("this")
  console.log(this)
  var currentMission = {}

  var imageUpload = function(prms, url){
      console.log("prms")
      console.log(prms)
      var s3URI = encodeURI("https://"+prms.bucket+".s3.amazonaws.com/");
      var ft = new FileTransfer(),
        options = new FileUploadOptions();
      options = prms;

      ft.upload(url, s3URI,
        function (e) {
          console.log("success")
          console.log(e)
        },
        function (e) {
          console.log("error")
          console.log(e)
        }, options, true);
    },
    getImageName = function(missionId, taskId){
      return Restangular.one('missions', missionId).one('tasks', taskId).one('upload').get()
    },
    prepareAnswers = function(answers_obj, mission_id){
      var arr = [];
      angular.forEach(answers_obj, function(v,k){
        if(v.url)
          getImageName(mission_id, k).then(function(res){
            var defer = $q.defer();
            imageUpload(res, v.url).then(defer.resolve, defer.reject)
            return defer.promise;
          })
        arr.push({
          data:{
            answer: v.answer
          },
          id: k
        })
      })
      return arr;
    }


  return {
    getMissions: function (args) {
      return Restangular.all('missions').getList(args);
    },
    getCurrentMission: function(mission_id){
      if(currentMission._id == mission_id && Object.keys(currentMission).length > 0)
        return currentMission;
      else
        return this.getMission(mission_id)
    },
    getMission: function (missionId) {
      var defer = $q.defer();
      Restangular.one('missions', missionId).get().then(function(res){
        currentMission = res    // cache current mission for tasks screen
        defer.resolve(res);
      });
      return defer.promise;
    },
    sendAnswer: function(answers, mission_id){
      prepareAnswers(answers, mission_id)
    },
    getUserMissions: function () {
      return Restangular.all('missions/me').getList();
    }

  };
});
