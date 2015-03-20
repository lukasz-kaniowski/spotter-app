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
  var currentMission = {}

  var imageUpload = function(prms, url){
      var defer = $q.defer();
      var s3URI = encodeURI("https://"+prms.bucket+".s3.amazonaws.com/");
      var location = "https://"+prms.bucket+".s3.amazonaws.com/" + prms.fileName;
      var ft = new FileTransfer(),
        options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = prms.fileName;
      options.mimeType = "image/jpeg";
      options.chunkedMode = false;
      options.params = {
        "key": prms.fileName,
        "AWSAccessKeyId": prms.awsKey,
        "acl": prms.acl,
        "policy": prms.policy,
        "signature": prms.signature,
        "Content-Type": "image/jpeg"
      };
      ft.upload(url, s3URI, function(){
          defer.resolve(location);
        },
        defer.reject, options, true);
      return defer.promise;
    },
    getImageName = function(missionId, taskId){
      return Restangular.one('missions', missionId).one('tasks', taskId).one('upload').get()
    },
    asyncArr = function(mission_id, v, k){
      var defer = $q.defer();
      if(v.url)
        getImageName(mission_id, k).then(function(res){
          imageUpload(res, v.url).then(function(img_url){
            defer.resolve({
              data:{
                answer: img_url
              },
              id: k
            })
          }, function(err){
            console.log("err")
            console.log(err)
          })
        })
      else
        defer.resolve({
          data:{
            answer: v.answer
          },
          id: k
        })
      return defer.promise;
    },
    prepareAnswers = function(answers_obj, mission_id){
      var arr = [];
      var defer = $q.defer();
      angular.forEach(answers_obj, function(v,k){
        arr.push(asyncArr(mission_id, v,k))
      })
      $q.all(arr).then(function(result){
        defer.resolve(result);
      })
      return defer.promise;
    }


  return {
    getMissions: function (args) {
      return Restangular.all('missions').getList(args);
    },
    getCurrentMission: function(mission_id, force){
      if(!force && currentMission._id == mission_id && Object.keys(currentMission).length > 0)
        return currentMission;
      else
        return this.getMission(mission_id)
    },
    updateCurrentMission: function(state){
      currentMission.state = state;
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
      var defer = $q.defer();
      prepareAnswers(answers, mission_id).then(function(result){
        Restangular.one('missions', mission_id).one('tasks').patch(result).then(defer.resolve, defer.reject)
      })
      return defer.promise;
    },
    getUserMissions: function () {
      return Restangular.all('missions/me').getList();
    }

  };
});
